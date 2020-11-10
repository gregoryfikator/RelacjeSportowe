using AutoMapper;
using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Enums;
using RelacjeSportowe.DataAccess.Models;
using System;

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

            CreateMap<AddTransmissionEventTypeRequest, TransmissionEventType>();
            CreateMap<EditTransmissionEventTypeRequest, TransmissionEventType>();
        }
    }
}
