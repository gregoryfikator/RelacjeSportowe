using RelacjeSportowe.DataAccess.Dtos;
using System.Collections.Generic;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface IRoleService
    {
        IEnumerable<RoleDto> GetAllRoles();
    }
}
