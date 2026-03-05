using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RegistrationApp.Contracts.Profile;
using RegistrationApp.Core.Interfaces;

namespace RegistrationApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegistryController(IProfileService profileService) : ControllerBase
{
    [HttpGet("specialists")]
    public async Task<IActionResult> SearchSpecialists([FromQuery] string? query, CancellationToken ct)
    {
        var result = await profileService.SearchSpecialistsAsync(query, ct);

        if (!result.IsSuccess)
            return BadRequest(new { error = result.Error!.Description });

        return Ok(result.Value);
    }

    [HttpGet("specialists/{userId}")]
    public async Task<IActionResult> GetSpecialist(string userId, CancellationToken ct)
    {
        var result = await profileService.GetUserProfileByIdAsync(userId, ct);

        if (!result.IsSuccess)
            return NotFound(new { error = result.Error!.Description });

        return Ok(result.Value);
    }

    [HttpPost("specialists/{userId}/rating")]
    [Authorize]
    public async Task<IActionResult> AddRating(string userId, AddRatingRequest request, CancellationToken ct)
    {
        var reviewerUserId = User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new UnauthorizedAccessException();

        var result = await profileService.AddRatingAsync(userId, reviewerUserId, request, ct);

        if (!result.IsSuccess)
            return BadRequest(new { error = result.Error!.Description });

        return Ok(result.Value);
    }
}
