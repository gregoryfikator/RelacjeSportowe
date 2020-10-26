using Microsoft.EntityFrameworkCore;
using RelacjeSportowe.Business.Extensions;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.DataAccess.Data;
using RelacjeSportowe.DataAccess.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace RelacjeSportowe.Business.Providers
{
    public class UserProvider : IUserProvider
    {
        private readonly AppDbContext context;

        public User CurrentUser { get; private set; }

        public UserProvider(AppDbContext context)
        {
            this.context = context;
        }

        public void SetCurrentUser(JwtSecurityToken jwtToken)
        {
            var userId = jwtToken.GetUserId();
            CurrentUser = context.Users
                .Include(x => x.Role)
                .First(x => x.Id == userId);
        }
    }
}
