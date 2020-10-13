using AutoMapper;
using RelacjeSportowe.Business.Dtos;
using RelacjeSportowe.Business.Dtos.Requests;
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
                .ForMember(x => x.RegistrationDate, o => o.MapFrom(a => DateTime.UtcNow));
            CreateMap<LoginUserRequest, User>()
                .ForMember(x => x.LastLoginDate, o => o.MapFrom(a => DateTime.UtcNow));
            CreateMap<User, UserDto>();
        }
    }
}
