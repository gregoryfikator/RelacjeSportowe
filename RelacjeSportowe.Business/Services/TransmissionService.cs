using Microsoft.EntityFrameworkCore;
using RelacjeSportowe.Business.Interfaces.Hubs;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Enums;
using RelacjeSportowe.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Services
{
    public class TransmissionService : BaseBusinessService<Transmission>, ITransmissionService
    {
        private readonly ITransmissionHubService transmissionHubService;

        public TransmissionService(IBaseUtilitiesProvider baseUtilitiesProvider,
            ITransmissionHubService transmissionHubService)
            : base(baseUtilitiesProvider)
        {
            this.transmissionHubService = transmissionHubService;
        }

        public async Task<TransmissionDto> AddTransmissionAsync(AddTransmissionRequest request)
        {
            // validation of request

            var transmission = Mapper.Map<AddTransmissionRequest, Transmission>(request);
            transmission.UserId = CurrentUser.Id;

            await AddAsync(transmission);

            await Context.SaveChangesAsync();

            var transmissionWithIncludes = await GetTransmissionAsync(transmission.Id);

            return transmissionWithIncludes;
        }

        public async Task<TransmissionEventDto> AddTransmissionEventAsync(AddTransmissionEventRequest request)
        {
            // validation of request

            var transmissionEvent = Mapper.Map<AddTransmissionEventRequest, TransmissionEvent>(request);

            await Context.TransmissionEvents.AddAsync(transmissionEvent);

            await Context.SaveChangesAsync();

            var transmissionEventWithIncludes = await GetTransmissionEventAsync(transmissionEvent.Id);

            return transmissionEventWithIncludes;
        }

        public async Task DeleteTransmissionAsync(DeleteTransmissionRequest request)
        {
            var transmission = await GetByIdAsync(request.Id);

            if (transmission.UserId != CurrentUser.Id && CurrentUser.AuthorizationRole != AuthorizationRole.Administrator)
            {
                // throw business logic exception
                return;
            }

            await DeleteAsync(transmission);

            await Context.SaveChangesAsync();
        }

        public async Task EndTransmissionAsync(EndTransmissionRequest request)
        {
            var transmission = await GetByIdAsync(request.Id);

            if (transmission.UserId != CurrentUser.Id && CurrentUser.AuthorizationRole == AuthorizationRole.User)
            {
                // throw business logic exception
                return;
            }

            transmission.EndDate = DateTime.UtcNow;

            await Context.SaveChangesAsync();
        }

        public IEnumerable<TransmissionDto> GetAllTransmissions()
        {
            var transmissions = GetAll(true)
                .Include(x => x.User)
                .OrderByDescending(x => x.EventDate)
                .Select(x => Mapper.Map<Transmission, TransmissionDto>(x))
                .ToList();

            foreach (var transmission in transmissions)
            {
                transmission.ViewersCount = this.transmissionHubService.GetViewersCount($"tid-{transmission.Id}");
            }

            return transmissions;
        }

        public IEnumerable<TransmissionDto> GetAllLiveTransmissions()
        {
            var transmissions = GetAll(true)
                .Include(x => x.User)
                .Where(x => x.EndDate == null)
                .OrderByDescending(x => x.EventDate)
                .Select(x => Mapper.Map<Transmission, TransmissionDto>(x))
                .ToList();

            foreach (var transmission in transmissions)
            {
                transmission.ViewersCount = this.transmissionHubService.GetViewersCount($"tid-{transmission.Id}");
            }

            return transmissions;
        }

        public IEnumerable<TransmissionDto> GetMyTransmissions()
        {
            var transmissions = GetAll(true)
                .Include(x => x.User)
                .Where(x => x.UserId == CurrentUser.Id)
                .OrderByDescending(x => x.EventDate)
                .Select(x => Mapper.Map<Transmission, TransmissionDto>(x))
                .ToList();

            foreach (var transmission in transmissions)
            {
                transmission.ViewersCount = this.transmissionHubService.GetViewersCount($"tid-{transmission.Id}");
            }

            return transmissions;
        }

        public IEnumerable<TransmissionDto> GetNewestTransmissions()
        {
            var transmissions = GetAll(true)
                .Include(x => x.User)
                .OrderByDescending(x => x.StartDate)
                .Take(10)
                .Select(x => Mapper.Map<Transmission, TransmissionDto>(x))
                .ToList();

            foreach (var transmission in transmissions)
            {
                transmission.ViewersCount = this.transmissionHubService.GetViewersCount($"tid-{transmission.Id}");
            }

            return transmissions;
        }

        public IEnumerable<TransmissionDto> GetTopTransmissions()
        {
            var transmissions = GetAll(true)
                .Include(x => x.User)
                .Where(x => x.EndDate.HasValue == false)
                .Select(x => Mapper.Map<Transmission, TransmissionDto>(x))
                .ToList();

            foreach (var transmission in transmissions)
            {
                transmission.ViewersCount = this.transmissionHubService.GetViewersCount($"tid-{transmission.Id}");
            }

            transmissions = transmissions
                .OrderByDescending(x => x.ViewersCount)
                .Take(10)
                .ToList();

            return transmissions;
        }

        public async Task<TransmissionDetailsDto> GetTransmissionAsync(int id)
        {
            var transmission = await Context.Transmissions
                .Include(x => x.TransmissionEvents)
                .ThenInclude(x => x.TransmissionEventType)
                .FirstOrDefaultAsync(x => x.Id == id);

            return Mapper.Map<Transmission, TransmissionDetailsDto>(transmission);
        }

        public async Task<TransmissionEventDto> GetTransmissionEventAsync(int id)
        {
            var transmissionEvent = await Context.TransmissionEvents
                .Include(x => x.TransmissionEventType)
                .FirstOrDefaultAsync(x => x.Id == id);

            return Mapper.Map<TransmissionEvent, TransmissionEventDto>(transmissionEvent);
        }

        public async Task<TransmissionDto> UpdateTransmissionAsync(UpdateTransmissionRequest request)
        {
            var transmission = await GetByIdAsync(request.Id);

            // validation of request

            var transmissionToUpdate = Mapper.Map<UpdateTransmissionRequest, Transmission>(request, transmission);

            transmission = await UpdateAsync(transmissionToUpdate);

            return Mapper.Map<Transmission, TransmissionDetailsDto>(transmission);
        }

        public async Task<TransmissionEventDto> UpdateTransmissionEventAsync(UpdateTransmissionEventRequest request)
        {
            var transmissionEvent = await Context.TransmissionEvents
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            // validation of request

            var transmissionEventToUpdate = Mapper.Map<UpdateTransmissionEventRequest, TransmissionEvent>(request, transmissionEvent);

            Context.TransmissionEvents.Update(transmissionEventToUpdate);

            return Mapper.Map<TransmissionEvent, TransmissionEventDto>(transmissionEventToUpdate);
        }

        public async Task VoteTransmission(VoteTransmissionRequest request)
        {
            var transmission = await Context.Transmissions
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            transmission.User.RatingPoints += request.Rating;

            await Context.SaveChangesAsync();
        }
    }
}
