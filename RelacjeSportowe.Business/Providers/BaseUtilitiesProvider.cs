using AutoMapper;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.DataAccess.Data;
using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.Business.Providers
{
    public class BaseUtilitiesProvider : IBaseUtilitiesProvider
    {
        private readonly IUserProvider userProvider;

        public AppDbContext Context { get; }

        public User CurrentUser => userProvider.CurrentUser;

        public IMapper Mapper { get; }

        public BaseUtilitiesProvider(AppDbContext context,
            IUserProvider userProvider,
            IMapper mapper)
        {
            Context = context;
            this.userProvider = userProvider;
            Mapper = mapper;
        }
    }
}
