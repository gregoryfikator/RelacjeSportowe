using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.DataAccess.Configurations
{
    public class TransmissionEventTypeModelConfiguration : IEntityTypeConfiguration<TransmissionEventType>
    {
        public void Configure(EntityTypeBuilder<TransmissionEventType> builder)
        {
            builder.ToTable("TransmissionEventTypes");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Value).IsRequired();
        }
    }
}
