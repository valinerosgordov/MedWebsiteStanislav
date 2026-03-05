namespace RegistrationApp.Core.Entities;

public class EducationEntry
{
    public Guid Id { get; set; }

    public Guid UserProfileId { get; set; }
    public UserProfile UserProfile { get; set; } = null!;

    public string InstitutionName { get; set; } = null!;
    public string? Specialty { get; set; }
    public int? GraduationYear { get; set; }
    public string? DiplomaUrl { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
