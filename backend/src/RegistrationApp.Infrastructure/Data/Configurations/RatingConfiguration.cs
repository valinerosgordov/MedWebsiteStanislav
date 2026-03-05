using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegistrationApp.Core.Entities;

namespace RegistrationApp.Infrastructure.Data.Configurations;

public class RatingConfiguration : IEntityTypeConfiguration<Rating>
{
    public void Configure(EntityTypeBuilder<Rating> builder)
    {
        builder.HasKey(r => r.Id);

        builder.HasOne(r => r.UserProfile)
            .WithMany(p => p.Ratings)
            .HasForeignKey(r => r.UserProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(r => r.Score).IsRequired();
        builder.Property(r => r.Comment).HasMaxLength(1000);
        builder.Property(r => r.ReviewerUserId).HasMaxLength(450);
    }
}
