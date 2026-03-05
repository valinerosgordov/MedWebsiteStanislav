using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegistrationApp.Core.Entities;

namespace RegistrationApp.Infrastructure.Data.Configurations;

public class UserProfileConfiguration : IEntityTypeConfiguration<UserProfile>
{
    public void Configure(EntityTypeBuilder<UserProfile> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.MemberNumber)
            .ValueGeneratedOnAdd();

        builder.HasOne(p => p.User)
            .WithOne(u => u.Profile)
            .HasForeignKey<UserProfile>(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(p => p.FirstName).HasMaxLength(100);
        builder.Property(p => p.LastName).HasMaxLength(100);
        builder.Property(p => p.MiddleName).HasMaxLength(100);
        builder.Property(p => p.Phone).HasMaxLength(20);
        builder.Property(p => p.PhotoUrl).HasMaxLength(500);
        builder.Property(p => p.Address).HasMaxLength(500);
        builder.Property(p => p.Education).HasMaxLength(300);
        builder.Property(p => p.Workplace).HasMaxLength(300);
        builder.Property(p => p.Bio).HasMaxLength(1000);

        builder.HasIndex(p => p.UserId).IsUnique();
    }
}
