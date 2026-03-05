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
}
