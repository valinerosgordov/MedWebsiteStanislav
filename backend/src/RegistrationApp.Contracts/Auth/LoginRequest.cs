using System.ComponentModel.DataAnnotations;

namespace RegistrationApp.Contracts.Auth;

public sealed record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password);
