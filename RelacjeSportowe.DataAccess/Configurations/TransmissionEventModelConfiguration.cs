using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.DataAccess.Configurations
{
    public class TransmissionEventModelConfiguration : IEntityTypeConfiguration<TransmissionEvent>
    {
        public void Configure(EntityTypeBuilder<TransmissionEvent> builder)
        {
            builder.ToTable("TransmissionEvents");

            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.TransmissionEventType)
                .WithOne()
                .HasForeignKey<TransmissionEvent>(x => x.TransmissionEventTypeId)
                .IsRequired();
        }
    }
}
