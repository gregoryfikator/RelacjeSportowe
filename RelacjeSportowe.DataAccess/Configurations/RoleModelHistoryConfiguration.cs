using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.DataAccess.Configurations
{
    class RoleModelHistoryConfiguration : IEntityTypeConfiguration<RoleHistory>
    {
        public void Configure(EntityTypeBuilder<RoleHistory> builder)
        {
            builder.ToTable("RolesHistory");

            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.ModifiedBy)
                .WithOne()
                .HasForeignKey<RoleHistory>(x => x.ModifiedById);
        }
    }
}
