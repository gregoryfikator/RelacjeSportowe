using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using RelacjeSportowe.DataAccess.Configurations;
using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Interfaces;
using RelacjeSportowe.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace RelacjeSportowe.DataAccess.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<RoleHistory> RolesHistory { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserHistory> UsersHistory { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserModelConfiguration());
            modelBuilder.ApplyConfiguration(new UserModelHistoryConfiguration());

            modelBuilder.ApplyConfiguration(new RoleModelConfiguration());
            modelBuilder.ApplyConfiguration(new RoleModelHistoryConfiguration());
        }

        public override int SaveChanges()
        {
            var auditableChanges = GetAuditableChanges();

            if (auditableChanges.Any())
            {
                SaveAuditInformation(auditableChanges);
            }

            return base.SaveChanges();
        }

        public async Task<int> SaveChangesAsync(UserDto currentUser)
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
            UserDto currentUser = null)
        {
            var username = currentUser != null ? currentUser.Username : Thread.CurrentPrincipal.Identity.Name;
            var userId = currentUser != null ? currentUser.Id : Users.First(user => user.Username == username).Id; 

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
                    entity.ModifiationDate = DateTime.UtcNow;
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
