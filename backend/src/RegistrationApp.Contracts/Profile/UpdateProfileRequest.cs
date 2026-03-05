using System.ComponentModel.DataAnnotations;

namespace RegistrationApp.Contracts.Profile;

public sealed record UpdateProfileRequest(
    [MaxLength(100)] string? FirstName,
    [MaxLength(100)] string? LastName,
    [MaxLength(100)] string? MiddleName,
    [Phone] string? Phone,
    DateOnly? DateOfBirth,
    [MaxLength(500)] string? Address,
    [MaxLength(300)] string? Education,
    [MaxLength(300)] string? Workplace,
    [MaxLength(1000)] string? Bio);
