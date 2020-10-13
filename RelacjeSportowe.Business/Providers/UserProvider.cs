using AutoMapper;
using RelacjeSportowe.Business.Dtos;
using RelacjeSportowe.Business.Extensions;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.DataAccess.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;

namespace RelacjeSportowe.Business.Providers
{
    public class UserProvider : IUserProvider
    {
        private readonly AppDbContext context;
        private readonly IMapper mapper;

        public UserDto CurrentUser { get; private set; }

        public UserProvider(AppDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public void SetCurrentUser(JwtSecurityToken jwtToken)
        {
            var userId = jwtToken.GetUserId();
            var user = context.Users.First(x => x.Id == userId);

            CurrentUser = mapper.Map<UserDto>(user);
        }

        public bool ValidateRefreshToken(JwtSecurityToken jwtToken)
        {
            var refreshToken = jwtToken.GetRefreshToken();
            var userId = jwtToken.GetUserId();
            var user = context.Users.First(x => x.Id == userId);

            return refreshToken == Encoding.Default.GetString(user.RefreshToken);
        }
    }
}
