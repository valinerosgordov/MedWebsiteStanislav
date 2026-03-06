using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RegistrationApp.Contracts.Auth;
using RegistrationApp.Core.Common;
using RegistrationApp.Core.Entities;
using RegistrationApp.Core.Interfaces;
using RegistrationApp.Infrastructure.Data;

namespace RegistrationApp.Infrastructure.Services;

public class AuthService(
    UserManager<ApplicationUser> userManager,
    IConfiguration configuration,
    AppDbContext dbContext,
    IEmailService emailService) : IAuthService
{
    private static readonly Error InvalidCredentials = new("Auth.InvalidCredentials", "Invalid email or password.");
    private static readonly Error EmailTaken = new("Auth.EmailTaken", "Email is already registered.");
    private static readonly Error UserNotFound = new("Auth.UserNotFound", "User not found.");
    private static readonly Error ResetFailed = new("Auth.ResetFailed", "Failed to reset password.");

    public async Task<Result<AuthResponse>> RegisterAsync(RegisterRequest request, CancellationToken ct = default)
    {
        var existingUser = await userManager.FindByEmailAsync(request.Email);
        if (existingUser is not null)
            return EmailTaken;

        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            CreatedAt = DateTime.UtcNow
        };

        var result = await userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            var errors = string.Join("; ", result.Errors.Select(e => e.Description));
            return new Error("Auth.CreationFailed", errors);
        }

        await userManager.AddToRoleAsync(user, "User");

        // Assign random unique MemberNumber
        var existingNumbers = await dbContext.UserProfiles
            .Select(p => p.MemberNumber)
            .ToListAsync(ct)
            .ConfigureAwait(false);

        var rng = Random.Shared;
        int memberNumber;
        do
        {
            memberNumber = rng.Next(10000, 100000);
        } while (existingNumbers.Contains(memberNumber));

        var profile = new UserProfile
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            MemberNumber = memberNumber
        };
        dbContext.UserProfiles.Add(profile);
        await dbContext.SaveChangesAsync(ct).ConfigureAwait(false);

        return GenerateToken(user, "User");
    }

    public async Task<Result<AuthResponse>> LoginAsync(LoginRequest request, CancellationToken ct = default)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
            return InvalidCredentials;

        var passwordValid = await userManager.CheckPasswordAsync(user, request.Password);
        if (!passwordValid)
            return InvalidCredentials;

        var roles = await userManager.GetRolesAsync(user);
        var role = roles.FirstOrDefault() ?? "User";

        return GenerateToken(user, role);
    }

    public async Task<Result<string>> ForgotPasswordAsync(ForgotPasswordRequest request, CancellationToken ct = default)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
            return "OK"; // Don't reveal if user exists

        var token = await userManager.GeneratePasswordResetTokenAsync(user);

        await emailService.SendPasswordResetEmailAsync(request.Email, token, ct).ConfigureAwait(false);

        return "OK";
    }

    public async Task<Result<string>> ResetPasswordAsync(ResetPasswordRequest request, CancellationToken ct = default)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
            return UserNotFound;

        var result = await userManager.ResetPasswordAsync(user, request.Token, request.NewPassword);
        if (!result.Succeeded)
        {
            var errors = string.Join("; ", result.Errors.Select(e => e.Description));
            return new Error("Auth.ResetFailed", errors);
        }

        return "OK";
    }

    private AuthResponse GenerateToken(ApplicationUser user, string role)
    {
        var jwtSection = configuration.GetSection("Jwt");
        var secret = jwtSection["Secret"]!;
        var issuer = jwtSection["Issuer"]!;
        var audience = jwtSection["Audience"]!;
        var expirationHours = int.Parse(jwtSection["ExpirationInHours"] ?? "24");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email!),
            new Claim(ClaimTypes.Role, role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var expiresAt = DateTime.UtcNow.AddHours(expirationHours);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials);

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        return new AuthResponse(tokenString, user.Email!, role, expiresAt);
    }
}
