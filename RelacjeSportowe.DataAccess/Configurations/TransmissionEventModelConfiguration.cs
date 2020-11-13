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
                .WithMany(x => x.TrasmissionEvents)
                .IsRequired();
        }
    }
}
