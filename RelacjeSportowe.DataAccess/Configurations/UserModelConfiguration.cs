using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RelacjeSportowe.DataAccess.Enums;
using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.DataAccess.Configurations
{
    public class UserModelConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            var identityProviderConverter = new EnumToStringConverter<IdentityProvider>();

            builder.ToTable("Users");

            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.Role)
                .WithOne()
                .HasForeignKey<User>(x => x.RoleId);

            builder.HasIndex(x => new { x.Email, x.Username })
                .IsUnique();

            builder.Property(x => x.IdentityProvider)
                .HasConversion(identityProviderConverter);

            builder.HasOne(x => x.ModifiedBy)
                .WithOne()
                .HasForeignKey<User>(x => x.ModifiedById);
        }
    }
}
