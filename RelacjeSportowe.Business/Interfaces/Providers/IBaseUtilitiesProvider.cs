using AutoMapper;
using RelacjeSportowe.DataAccess.Data;
using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.Business.Interfaces.Providers
{
    public interface IBaseUtilitiesProvider
    {
        AppDbContext Context { get; }

        User CurrentUser { get; }

        IMapper Mapper { get; }
    }
}
