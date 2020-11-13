using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransmissionController : ControllerBase
    {
        private readonly ITransmissionService transmissionService;
        private readonly ITransmissionEventTypeService transmissionEventTypeService;

        public TransmissionController(ITransmissionService transmissionService,
            ITransmissionEventTypeService transmissionEventTypeService)
        {
            this.transmissionService = transmissionService;
            this.transmissionEventTypeService = transmissionEventTypeService;
        }

        [Authorize(Policy = "User")]
        [HttpPost("[action]")]
        public async Task<TransmissionDto> AddTransmission([FromBody] AddTransmissionRequest request)
        {
            return await this.transmissionService.AddTransmissionAsync(request);
        }

        [Authorize(Policy = "Moderator")]
        [HttpPost("[action]")]
        public async Task<TransmissionEventType> AddTransmissionEventType([FromBody]AddTransmissionEventTypeRequest request)
        {
            return await this.transmissionEventTypeService.AddTransmissionEventTypeAsync(request);
        }

        [Authorize(Policy = "Administrator")]
        [HttpPost("[action]")]
        public async Task DeleteTransmission([FromBody] DeleteTransmissionRequest request)
        {
            await this.transmissionService.DeleteTransmissionAsync(request);
        }

        [Authorize(Policy = "User")]
        [HttpPost("[action]")]
        public async Task EndTransmission([FromBody] EndTransmissionRequest request)
        {
            await this.transmissionService.EndTransmissionAsync(request);
        }

        [HttpGet("[action]")]
        public IEnumerable<TransmissionDto> GetAllTransmissions()
        {
            return this.transmissionService.GetAllTransmissions();
        }

        [HttpGet("[action]")]
        public IEnumerable<TransmissionDto> GetMyTransmissions()
        {
            return this.transmissionService.GetMyTransmissions();
        }

        [HttpGet("[action]")]
        public IEnumerable<TransmissionDto> GetNewestTransmissions()
        {
            return this.transmissionService.GetNewestTransmissions();
        }

        [HttpGet("[action]")]
        public IEnumerable<TransmissionDto> GetTopTransmissions()
        {
            return this.transmissionService.GetTopTransmissions();
        }

        [HttpGet("[action]")]
        public async Task<TransmissionDetailsDto> GetTransmission(int id)
        {
            return await this.transmissionService.GetTransmissionAsync(id);
        }

        [HttpGet("[action]")]
        public IEnumerable<TransmissionEventType> GetTransmissionEventTypes()
        {
            return this.transmissionEventTypeService.GetTransmissionEventTypes();
        }

        [Authorize(Policy = "User")]
        [HttpPost("[action]")]
        public async Task<TransmissionDto> UpdateTransmission([FromBody] UpdateTransmissionRequest request)
        {
            return await this.transmissionService.UpdateTransmissionAsync(request);
        }

        [Authorize(Policy = "Moderator")]
        [HttpPost("[action]")]
        public async Task<TransmissionEventType> UpdateTransmissionEventType([FromBody] UpdateTransmissionEventTypeRequest request)
        {
            return await this.transmissionEventTypeService.UpdateTransmissionEventTypeAsync(request);
        }

        [Authorize(Policy = "User")]
        [HttpPost("[action]")]
        public async Task VoteTransmission(VoteTransmissionRequest request)
        {
            await this.transmissionService.VoteTransmission(request);
        }
    }
}
