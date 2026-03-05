using Microsoft.AspNetCore.Identity;

namespace RegistrationApp.Core.Entities;

public class ApplicationUser : IdentityUser
{
    public UserProfile? Profile { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
