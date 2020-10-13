using AutoMapper;
using RelacjeSportowe.Business.Dtos;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.DataAccess.Data;

namespace RelacjeSportowe.Business.Providers
{
    public class BaseUtilitiesProvider : IBaseUtilitiesProvider
    {
        private readonly IUserProvider userProvider;

        public BaseUtilitiesProvider(AppDbContext context,
            IUserProvider userProvider,
            IMapper mapper)
        {
            Context = context;
            this.userProvider = userProvider;
            Mapper = mapper;
        }

        public AppDbContext Context { get; }

        public UserDto CurrentUser { get { return userProvider.CurrentUser; } }

        public IMapper Mapper { get; }
    }
}
