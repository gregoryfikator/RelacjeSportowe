using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace RelacjeSportowe.DataAccess.Data
{
    public class AppDesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseSqlServer("Server=GREGOR-PC\\SQLEXPRESS;Database=RelacjeSportowe;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
