using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Favourite, FavouriteToReturnDto>();
            CreateMap<Repository, RepositoryToReturnDto>();
        }
    }
}