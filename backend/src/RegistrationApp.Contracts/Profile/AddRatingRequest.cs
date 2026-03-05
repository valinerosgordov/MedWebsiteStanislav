using System.ComponentModel.DataAnnotations;

namespace RegistrationApp.Contracts.Profile;

public sealed record AddRatingRequest(
    [Range(1, 10)] int Score,
    [MaxLength(1000)] string? Comment);
