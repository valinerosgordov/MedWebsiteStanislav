namespace RegistrationApp.Contracts.Profile;

public sealed record RatingDto(
    Guid Id,
    int Score,
    string? Comment,
    DateTime CreatedAt);
