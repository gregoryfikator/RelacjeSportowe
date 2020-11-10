using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using RelacjeSportowe.DataAccess.Configurations;
using RelacjeSportowe.DataAccess.Extensions;
using RelacjeSportowe.DataAccess.Interfaces;
using RelacjeSportowe.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RelacjeSportowe.DataAccess.Data
{
    public class AppDbContext : DbContext
    {
        //Migration command:
        //Add-Migration MigrationName -OutputDir "Data/Migrations"
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Transmission> Transmissions { get; set; }
        public virtual DbSet<TransmissionEvent> TransmissionEvents { get; set; }
        public virtual DbSet<TransmissionEventType> TransmissionEventTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserModelConfiguration());

            modelBuilder.ApplyConfiguration(new RoleModelConfiguration());

            modelBuilder.ApplyConfiguration(new TransmissionModelConfiguration());

            modelBuilder.ApplyConfiguration(new TransmissionEventModelConfiguration());

            modelBuilder.ApplyConfiguration(new TransmissionEventTypeModelConfiguration());

            modelBuilder.SeedRolesTable();
        }

        public async Task<int> SaveChangesAsync(User currentUser)
        {
            var auditableChanges = GetAuditableChanges();

            if (auditableChanges.Any())
            {
                SaveAuditInformation(auditableChanges, currentUser);
            }

            return await base.SaveChangesAsync();
        }

        private IEnumerable<EntityEntry<IAuditable>> GetAuditableChanges()
        {
            return ChangeTracker
                .Entries<IAuditable>()
                .Where(x => x.State != EntityState.Unchanged);
        }

        private void SaveAuditInformation(IEnumerable<EntityEntry<IAuditable>> auditableChanges,
            User currentUser)
        {
            var userId = currentUser.Id; 

            foreach (var auditableChange in auditableChanges)
            {
                var entity = auditableChange.Entity;

                if (CheckIfShouldBeUnchanged(auditableChange))
                {
                    auditableChange.State = EntityState.Unchanged;
                }
                else
                {
                    entity.ModifiedById = userId;
                    entity.ModificationDate = DateTime.UtcNow;
                }
            }
        }

        private bool CheckIfPropertiesWereModified(IEnumerable<PropertyEntry> properties)
        {
            foreach (var property in properties)
            {
                if (property.Metadata.Name == "ModifiedById" || property.Metadata.Name == "ModifiedDate")
                {
                    continue;
                }

                if (property.IsModified == true)
                {
                    return true;
                }
            }

            return false;
        }

        private bool CheckIfShouldBeUnchanged(EntityEntry<IAuditable> auditableChange)
        {
            return auditableChange.State == EntityState.Modified &&
                CheckIfPropertiesWereModified(auditableChange.Properties) == false;
        }
    }
}
