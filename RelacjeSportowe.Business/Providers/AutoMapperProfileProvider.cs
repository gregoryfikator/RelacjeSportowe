using AutoMapper;
using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Enums;
using RelacjeSportowe.DataAccess.Models;
using System;
using System.Collections.Generic;

namespace RelacjeSportowe.Business.Providers
{
    public class AutoMapperProfileProvider : Profile
    {
        public AutoMapperProfileProvider()
        {
            CreateMap<RegisterUserRequest, User>()
                .ForMember(x => x.LastLoginDate, o => o.MapFrom(a => DateTime.UtcNow))
                .ForMember(x => x.RegistrationDate, o => o.MapFrom(a => DateTime.UtcNow))
                .ForMember(x => x.IsActive, o => o.MapFrom(a => true))
                .ForMember(x => x.RoleId, o => o.MapFrom(a => (int)AuthorizationRole.User));
            CreateMap<LoginUserRequest, User>()
                .ForMember(x => x.LastLoginDate, o => o.MapFrom(a => DateTime.UtcNow));

            CreateMap<User, UserDto>();
            CreateMap<User, UserWithRoleDto>()
                .ForMember(x => x.Role, o => o.MapFrom(a => a.Role.Value));

            CreateMap<Role, RoleDto>();

            CreateMap<AddTransmissionEventTypeRequest, TransmissionEventType>();
            CreateMap<UpdateTransmissionEventTypeRequest, TransmissionEventType>();

            CreateMap<AddTransmissionRequest, Transmission>()
                .ForMember(x => x.StartDate, o => o.MapFrom(a => DateTime.UtcNow));
            CreateMap<UpdateTransmissionRequest, Transmission>();

            CreateMap<Transmission, TransmissionDto>()
                .ForMember(x => x.Username, o => o.MapFrom(a => a.User.Username));
            CreateMap<Transmission, TransmissionDetailsDto>()
                .ForMember(x => x.TransmissionEvents, o => o.MapFrom(a => a.TransmissionEvents))
                .ForMember(x => x.Username, o => o.MapFrom(a => a.User.Username));

            CreateMap<AddTransmissionEventRequest, TransmissionEvent>();
            CreateMap<UpdateTransmissionEventRequest, TransmissionEvent>();

            CreateMap<TransmissionEvent, TransmissionEventDto>()
                .ForMember(x => x.TransmissionEventType, o => o.MapFrom(a => a.TransmissionEventType.Value));
        }
    }
}
