using AutoMapper;
using RelacjeSportowe.Business.Dtos;
using RelacjeSportowe.DataAccess.Data;

namespace RelacjeSportowe.Business.Interfaces.Providers
{
    public interface IBaseUtilitiesProvider
    {
        AppDbContext Context { get; }

        UserDto CurrentUser { get; }

        IMapper Mapper { get; }
    }
}
