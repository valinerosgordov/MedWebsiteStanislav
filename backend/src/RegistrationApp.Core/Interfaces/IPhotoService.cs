using Microsoft.AspNetCore.Http;
using RegistrationApp.Core.Common;

namespace RegistrationApp.Core.Interfaces;

public interface IPhotoService
{
    Task<Result<string>> UploadPhotoAsync(string userId, IFormFile file, CancellationToken ct = default);
}
