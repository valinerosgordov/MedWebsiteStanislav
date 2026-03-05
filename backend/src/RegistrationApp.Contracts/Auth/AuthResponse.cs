namespace RegistrationApp.Contracts.Auth;

public sealed record AuthResponse(
    string Token,
    string Email,
    string Role,
    DateTime ExpiresAt);
