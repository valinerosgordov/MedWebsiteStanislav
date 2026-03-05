using System.ComponentModel.DataAnnotations;

namespace RegistrationApp.Contracts.Profile;

public sealed record AddEducationRequest(
    [Required, MaxLength(300)] string InstitutionName,
    [MaxLength(300)] string? Specialty,
    int? GraduationYear);
