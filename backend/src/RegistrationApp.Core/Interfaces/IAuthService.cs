using RegistrationApp.Core.Common;
using RegistrationApp.Contracts.Auth;

namespace RegistrationApp.Core.Interfaces;

public interface IAuthService
{
    Task<Result<AuthResponse>> RegisterAsync(RegisterRequest request, CancellationToken ct = default);
    Task<Result<AuthResponse>> LoginAsync(LoginRequest request, CancellationToken ct = default);
}
