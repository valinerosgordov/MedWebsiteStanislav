using Microsoft.AspNetCore.Mvc;
using RegistrationApp.Contracts.Auth;
using RegistrationApp.Core.Interfaces;

namespace RegistrationApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request, CancellationToken ct)
    {
        var result = await authService.RegisterAsync(request, ct);

        if (!result.IsSuccess)
            return BadRequest(new { error = result.Error!.Description });

        return Ok(result.Value);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request, CancellationToken ct)
    {
        var result = await authService.LoginAsync(request, ct);

        if (!result.IsSuccess)
            return Unauthorized(new { error = result.Error!.Description });

        return Ok(result.Value);
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest request, CancellationToken ct)
    {
        await authService.ForgotPasswordAsync(request, ct);
        return Ok(new { message = "If the email exists, a reset link has been sent." });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordRequest request, CancellationToken ct)
    {
        var result = await authService.ResetPasswordAsync(request, ct);

        if (!result.IsSuccess)
            return BadRequest(new { error = result.Error!.Description });

        return Ok(new { message = "Password has been reset successfully." });
    }
}
