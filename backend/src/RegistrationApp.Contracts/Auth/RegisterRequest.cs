using System.ComponentModel.DataAnnotations;

namespace RegistrationApp.Contracts.Auth;

public sealed record RegisterRequest(
    [Required, EmailAddress] string Email,
    [Required, MinLength(6)] string Password,
    [Required, MinLength(6)] string ConfirmPassword);
