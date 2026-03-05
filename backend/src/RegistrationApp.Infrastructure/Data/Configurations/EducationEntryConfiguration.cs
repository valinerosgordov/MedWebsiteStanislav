using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegistrationApp.Core.Entities;

namespace RegistrationApp.Infrastructure.Data.Configurations;

public class EducationEntryConfiguration : IEntityTypeConfiguration<EducationEntry>
{
    public void Configure(EntityTypeBuilder<EducationEntry> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasOne(e => e.UserProfile)
            .WithMany(p => p.EducationEntries)
            .HasForeignKey(e => e.UserProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(e => e.InstitutionName).HasMaxLength(300).IsRequired();
        builder.Property(e => e.Specialty).HasMaxLength(300);
        builder.Property(e => e.DiplomaUrl).HasMaxLength(500);
    }
}
