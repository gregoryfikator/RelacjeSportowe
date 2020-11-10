using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Models;
using RelacjeSportowe.Transmission.Interfaces;

namespace RelacjeSportowe.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransmissionController : ControllerBase
    {
        private readonly ITransmissionHubService transmissionHubService;
        private readonly ITransmissionEventTypeService transmissionEventTypeService;

        public TransmissionController(ITransmissionHubService transmissionHubService,
            ITransmissionEventTypeService transmissionEventTypeService)
        {
            this.transmissionHubService = transmissionHubService;
            this.transmissionEventTypeService = transmissionEventTypeService;
        }

        //public async Task StartTransmission()
        //{

        //}
        [Authorize(Policy = "Administrator")]
        [HttpPost("[action]")]
        public async Task<TransmissionEventType> AddTransmissionEventType([FromBody]AddTransmissionEventTypeRequest request)
        {
            return await this.transmissionEventTypeService.AddTransmissionEventTypeAsync(request);
        }

        [Authorize(Policy = "Administrator")]
        [HttpPost("[action]")]
        public async Task<TransmissionEventType> EditTransmissionEventType([FromBody] EditTransmissionEventTypeRequest request)
        {
            return await this.transmissionEventTypeService.EditTransmissionEventTypeAsync(request);
        }

        [HttpGet("[action]")]
        public IEnumerable<TransmissionEventType> GetTransmissionEventTypes()
        {
            return this.transmissionEventTypeService.GetTransmissionEventTypes();
        }

        [HttpGet("[action]")]
        public int GetViewersCount(string groupName)
        {
            return this.transmissionHubService.GetViewersCount(groupName);
        }

        [HttpGet("[action]")]
        public IEnumerable<int> GetViewersCounts(IEnumerable<string> groupNames)
        {
            return this.transmissionHubService.GetViewersCounts(groupNames);
        }
    }
}
