using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RegistrationApp.Contracts.Profile;
using RegistrationApp.Core.Interfaces;

namespace RegistrationApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProfileController(IProfileService profileService, IPhotoService photoService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetProfile(CancellationToken ct)
    {
        var userId = GetUserId();
        var result = await profileService.GetProfileAsync(userId, ct);

        if (!result.IsSuccess)
            return NotFound(new { error = result.Error!.Description });

        return Ok(result.Value);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProfile(UpdateProfileRequest request, CancellationToken ct)
    {
        var userId = GetUserId();
        var result = await profileService.UpdateProfileAsync(userId, request, ct);

        if (!result.IsSuccess)
            return BadRequest(new { error = result.Error!.Description });

        return Ok(result.Value);
    }

    [HttpPost("photo")]
    public async Task<IActionResult> UploadPhoto(IFormFile file, CancellationToken ct)
    {
        var userId = GetUserId();
        var result = await photoService.UploadPhotoAsync(userId, file, ct);

        if (!result.IsSuccess)
            return BadRequest(new { error = result.Error!.Description });

        return Ok(new { photoUrl = result.Value });
    }

    [HttpPost("education")]
    public async Task<IActionResult> AddEducation(AddEducationRequest request, CancellationToken ct)
    {
        var userId = GetUserId();
        var result = await profileService.AddEducationAsync(userId, request, ct);

        if (!result.IsSuccess)
            return BadRequest(new { error = result.Error!.Description });

        return Ok(result.Value);
    }

    [HttpDelete("education/{educationId:guid}")]
    public async Task<IActionResult> DeleteEducation(Guid educationId, CancellationToken ct)
    {
        var userId = GetUserId();
        var result = await profileService.DeleteEducationAsync(userId, educationId, ct);

        if (!result.IsSuccess)
            return NotFound(new { error = result.Error!.Description });

        return Ok();
    }

    [HttpPost("education/{educationId:guid}/diploma")]
    public async Task<IActionResult> UploadDiploma(Guid educationId, IFormFile file, CancellationToken ct)
    {
        var userId = GetUserId();
        var result = await profileService.UploadDiplomaAsync(userId, educationId, file, ct);

        if (!result.IsSuccess)
            return BadRequest(new { error = result.Error!.Description });

        return Ok(new { diplomaUrl = result.Value });
    }

    private string GetUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? throw new UnauthorizedAccessException();
}
