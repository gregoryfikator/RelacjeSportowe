using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Dtos;
using System.Collections.Generic;

namespace RelacjeSportowe.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize("Administrator")]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService roleService;

        public RolesController(IRoleService roleService)
        {
            this.roleService = roleService;
        }

        [HttpGet]
        public IEnumerable<RoleDto> GetAll()
        {
            return this.roleService.GetAllRoles();
        }
    }
}
