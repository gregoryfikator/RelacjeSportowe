using AutoMapper;
using RelacjeSportowe.Business.Dtos;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Data;
using RelacjeSportowe.DataAccess.Interfaces;

namespace RelacjeSportowe.Business.Services
{
    public class BaseService<T> : IBaseService<T> where T : class, IEntity
    {
        protected AppDbContext Context => baseUtilitiesProvider.Context;
        protected UserDto CurrentUser => baseUtilitiesProvider.CurrentUser;
        protected IMapper Mapper => baseUtilitiesProvider.Mapper;

        private readonly IBaseUtilitiesProvider baseUtilitiesProvider;

        public BaseService(IBaseUtilitiesProvider baseUtilitiesProvider)
        {
            this.baseUtilitiesProvider = baseUtilitiesProvider;
        }
    }
}
