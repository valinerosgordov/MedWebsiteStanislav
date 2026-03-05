using Microsoft.AspNetCore.Http;
using RegistrationApp.Core.Common;
using RegistrationApp.Contracts.Profile;

namespace RegistrationApp.Core.Interfaces;

public interface IProfileService
{
    Task<Result<UserProfileDto>> GetProfileAsync(string userId, CancellationToken ct = default);
    Task<Result<UserProfileDto>> UpdateProfileAsync(string userId, UpdateProfileRequest request, CancellationToken ct = default);
    Task<Result<List<UserListItemDto>>> GetAllUsersAsync(CancellationToken ct = default);
    Task<Result<UserProfileDto>> GetUserProfileByIdAsync(string userId, CancellationToken ct = default);
    Task<Result<EducationEntryDto>> AddEducationAsync(string userId, AddEducationRequest request, CancellationToken ct = default);
    Task<Result<bool>> DeleteEducationAsync(string userId, Guid educationId, CancellationToken ct = default);
    Task<Result<string>> UploadDiplomaAsync(string userId, Guid educationId, IFormFile file, CancellationToken ct = default);
    Task<Result<List<UserProfileDto>>> SearchSpecialistsAsync(string? query, CancellationToken ct = default);
    Task<Result<RatingDto>> AddRatingAsync(string specialistUserId, string reviewerUserId, AddRatingRequest request, CancellationToken ct = default);
}
