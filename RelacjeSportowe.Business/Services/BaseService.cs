using AutoMapper;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Data;
using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.Business.Services
{
    public abstract class BaseService : IBaseService
    {
        protected AppDbContext Context => baseUtilitiesProvider.Context;

        protected User CurrentUser => baseUtilitiesProvider.CurrentUser;

        protected IMapper Mapper => baseUtilitiesProvider.Mapper;

        private readonly IBaseUtilitiesProvider baseUtilitiesProvider;

        public BaseService(IBaseUtilitiesProvider baseUtilitiesProvider)
        {
            this.baseUtilitiesProvider = baseUtilitiesProvider;
        }
    }
}
