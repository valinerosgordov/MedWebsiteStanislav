namespace RegistrationApp.Contracts.Profile;

public sealed record UserProfileDto(
    string UserId,
    int MemberNumber,
    string Email,
    string? FirstName,
    string? LastName,
    string? MiddleName,
    string? Phone,
    DateOnly? DateOfBirth,
    string? PhotoUrl,
    string? Address,
    string? Education,
    string? Workplace,
    string? Bio,
    List<EducationEntryDto> EducationEntries,
    double AverageRating,
    int RatingsCount,
    List<RatingDto> Ratings);
