using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Models;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Services
{
    public class RoleService : BaseService<Role>
    {
        public RoleService(IBaseUtilitiesProvider baseUtilitiesProvider)
            : base(baseUtilitiesProvider)
        {

        }

        public Task<RoleDto> GetAll()
        {
            return null;
        }
    }
}
