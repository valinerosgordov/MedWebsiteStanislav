using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RegistrationApp.Core.Interfaces;

namespace RegistrationApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController(IProfileService profileService) : ControllerBase
{
    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers(CancellationToken ct)
    {
        var result = await profileService.GetAllUsersAsync(ct);

        if (!result.IsSuccess)
            return BadRequest(new { error = result.Error!.Description });

        return Ok(result.Value);
    }

    [HttpGet("users/{userId}")]
    public async Task<IActionResult> GetUserProfile(string userId, CancellationToken ct)
    {
        var result = await profileService.GetUserProfileByIdAsync(userId, ct);

        if (!result.IsSuccess)
            return NotFound(new { error = result.Error!.Description });

        return Ok(result.Value);
    }
}
