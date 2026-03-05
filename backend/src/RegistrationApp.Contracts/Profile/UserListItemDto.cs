namespace RegistrationApp.Contracts.Profile;

public sealed record UserListItemDto(
    string UserId,
    int MemberNumber,
    string Email,
    string? FirstName,
    string? LastName,
    DateTime CreatedAt);
