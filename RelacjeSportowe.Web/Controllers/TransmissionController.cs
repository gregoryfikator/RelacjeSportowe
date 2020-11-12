using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Models;
//using RelacjeSportowe.TransmissionHub.Interfaces;

namespace RelacjeSportowe.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransmissionController : ControllerBase
    {
        private readonly ITransmissionService transmissionService;
        //private readonly ITransmissionHubService transmissionHubService;
        private readonly ITransmissionEventTypeService transmissionEventTypeService;

        public TransmissionController(ITransmissionService transmissionService,
           //ITransmissionHubService transmissionHubService,
            ITransmissionEventTypeService transmissionEventTypeService)
        {
            this.transmissionService = transmissionService;
            //this.transmissionHubService = transmissionHubService;
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

        [Authorize(Policy = "Moderator")]
        [HttpPost("[action]")]
        public async Task<TransmissionEventType> EditTransmissionEventType([FromBody] UpdateTransmissionEventTypeRequest request)
        {
            return await this.transmissionEventTypeService.EditTransmissionEventTypeAsync(request);
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

        //[HttpGet("[action]")]
        //public int GetViewersCount(string groupName)
        //{
        //    return this.transmissionHubService.GetViewersCount(groupName);
        //}

        //[HttpGet("[action]")]
        //public IEnumerable<int> GetViewersCounts(IEnumerable<string> groupNames)
        //{
        //    return this.transmissionHubService.GetViewersCounts(groupNames);
        //}
    }
}
