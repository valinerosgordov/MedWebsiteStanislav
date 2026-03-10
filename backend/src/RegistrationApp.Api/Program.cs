using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RegistrationApp.Core.Entities;
using RegistrationApp.Core.Interfaces;
using RegistrationApp.Infrastructure.Data;
using RegistrationApp.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// EF Core + SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// ASP.NET Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

// JWT Authentication
var jwtSection = builder.Configuration.GetSection("Jwt");
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSection["Issuer"],
        ValidAudience = jwtSection["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSection["Secret"]!))
    };
});

// DI Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IPhotoService, PhotoService>();
builder.Services.AddScoped<IEmailService, SmtpEmailService>();

// CORS
var corsOrigins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>()
    ?? ["http://localhost:5173"];
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins(corsOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

// Seed roles and admin
await SeedDataAsync(app.Services);

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options => options.SwaggerEndpoint("/openapi/v1.json", "RegistrationApp API"));
}

app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.MapControllers();

app.Run();

static async Task SeedDataAsync(IServiceProvider services)
{
    using var scope = services.CreateScope();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();

    await dbContext.Database.MigrateAsync();

    string[] roles = ["User", "Admin"];
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
            await roleManager.CreateAsync(new IdentityRole(role));
    }

    var adminEmail = configuration["AdminSeed:Email"] ?? "admin@admin.com";
    var adminPassword = configuration["AdminSeed:Password"] ?? "Admin123!";

    if (await userManager.FindByEmailAsync(adminEmail) is null)
    {
        var admin = new ApplicationUser
        {
            UserName = adminEmail,
            Email = adminEmail,
            EmailConfirmed = true,
            CreatedAt = DateTime.UtcNow
        };

        var result = await userManager.CreateAsync(admin, adminPassword);
        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(admin, "Admin");

            dbContext.UserProfiles.Add(new UserProfile
            {
                Id = Guid.NewGuid(),
                UserId = admin.Id,
                FirstName = "Admin",
                LastName = "Admin"
            });
            await dbContext.SaveChangesAsync();
        }
    }

    // One-time cleanup: remove demo specialist accounts
    await RemoveDemoSpecialistsAsync(userManager, dbContext);
}

static async Task RemoveDemoSpecialistsAsync(UserManager<ApplicationUser> userManager, AppDbContext dbContext)
{
    string[] demoEmails = ["ivanova@demo.ru", "petrov@demo.ru", "sokolova@demo.ru", "kuznetsov@demo.ru", "volkova@demo.ru"];

    foreach (var email in demoEmails)
    {
        var user = await userManager.FindByEmailAsync(email);
        if (user is null) continue;

        // Remove profile + education entries (cascade)
        var profile = await dbContext.UserProfiles.FirstOrDefaultAsync(p => p.UserId == user.Id);
        if (profile is not null)
        {
            var educations = await dbContext.EducationEntries
                .Where(e => e.UserProfileId == profile.Id)
                .ToListAsync();
            dbContext.EducationEntries.RemoveRange(educations);
            dbContext.UserProfiles.Remove(profile);
        }

        await userManager.DeleteAsync(user);
    }

    await dbContext.SaveChangesAsync();
}
