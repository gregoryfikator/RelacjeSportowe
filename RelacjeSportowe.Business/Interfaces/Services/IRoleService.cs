using RelacjeSportowe.DataAccess.Dtos;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface IRoleService
    {
        Task<RoleDto> GetAll();
    }
}
