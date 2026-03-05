namespace RegistrationApp.Core.Entities;

public class UserProfile
{
    public Guid Id { get; set; }
    public int MemberNumber { get; set; }

    public string UserId { get; set; } = null!;
    public ApplicationUser User { get; set; } = null!;

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? MiddleName { get; set; }
    public string? Phone { get; set; }
    public DateOnly? DateOfBirth { get; set; }
    public string? PhotoUrl { get; set; }
    public string? Address { get; set; }
    public string? Education { get; set; }
    public string? Workplace { get; set; }
    public string? Bio { get; set; }

    public List<EducationEntry> EducationEntries { get; set; } = [];
    public List<Rating> Ratings { get; set; } = [];

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
