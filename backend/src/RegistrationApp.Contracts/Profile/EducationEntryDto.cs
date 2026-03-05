namespace RegistrationApp.Contracts.Profile;

public sealed record EducationEntryDto(
    Guid Id,
    string InstitutionName,
    string? Specialty,
    int? GraduationYear,
    string? DiplomaUrl,
    DateTime CreatedAt);
