﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.DataAccess.Configurations
{
    public class UserModelConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.Role)
                .WithMany(x => x.Users)
                .IsRequired();

            builder.HasMany(x => x.Transmissions)
                .WithOne(t => t.User)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            builder.HasIndex(x => new { x.Email, x.Username })
                .IsUnique();

            builder.Ignore(x => x.AuthorizationRole);

            builder.Property(x => x.Email).IsRequired();
            builder.Property(x => x.Username).IsRequired();
            builder.Property(x => x.RefreshToken).IsRequired();
            builder.Property(x => x.HashedPassword).IsRequired();
        }
    }
}
