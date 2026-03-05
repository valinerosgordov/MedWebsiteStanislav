namespace RegistrationApp.Core.Entities;

public class Rating
{
    public Guid Id { get; set; }

    public Guid UserProfileId { get; set; }
    public UserProfile UserProfile { get; set; } = null!;

    public string? ReviewerUserId { get; set; }

    public int Score { get; set; } // 1-10

    public string? Comment { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
