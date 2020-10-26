using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Models;
using System.Collections.Generic;

namespace RelacjeSportowe.Business.Services
{
    public class RoleService : BaseBusinessService<Role>, IRoleService
    {
        public RoleService(IBaseUtilitiesProvider baseUtilitiesProvider)
            : base(baseUtilitiesProvider)
        {

        }

        public IEnumerable<RoleDto> GetAllRoles()
        {
            return Mapper.Map<IEnumerable<Role>, IEnumerable<RoleDto>>(Context.Roles);
        }
    }
}
