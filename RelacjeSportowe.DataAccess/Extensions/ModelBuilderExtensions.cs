using Microsoft.EntityFrameworkCore;
using RelacjeSportowe.DataAccess.Enums;
using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.DataAccess.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void SeedRolesTable(this ModelBuilder modelBuilder)
        {
            var roles = new Role[]
            {
                new Role { Id = (int)AuthorizationRole.User, Value = AuthorizationRole.User.ToString() },
                new Role { Id = (int)AuthorizationRole.Moderator, Value = AuthorizationRole.Moderator.ToString() },
                new Role { Id = (int)AuthorizationRole.Administrator, Value = AuthorizationRole.Administrator.ToString() }
            };

            modelBuilder.Entity<Role>().HasData(roles);
        }
    }
}
