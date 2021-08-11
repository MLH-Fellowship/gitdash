using System.Threading.Tasks;
using API.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using API.Errors;
using AutoMapper;

namespace API.Controllers
{
    public class FavouriteController : BaseApiController
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;
        public FavouriteController(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.mapper = mapper;
            this.unitofWork = unitofWork;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FavouriteToReturnDto>> GetFavouriteByUserId(string id)
        {
            var favouriteSpec = new FavouriteSpecification(id);
            var favourite = await unitofWork.Repository<Favourite>().GetEntityWithSpec(favouriteSpec);

            if (favourite == null)
                return BadRequest(new ApiResponse(400, "Does not have any favourites!"));

            return Ok(mapper.Map<Favourite, FavouriteToReturnDto>(favourite));
        }

        [HttpDelete]
        public async Task<ActionResult<FavouriteToReturnDto>> DeleteFavourite(FavouriteDto favouriteDto)
        {
            var favouriteSpec = new FavouriteSpecification(favouriteDto.UserId);
            var favourite = await unitofWork.Repository<Favourite>().GetEntityWithSpec(favouriteSpec);
            var repoToDelete = favourite.Repositories.First(x => x.RepoId == favouriteDto.RepoId);

            if (repoToDelete != null)
            {
                unitofWork.Repository<Repository>().Delete(repoToDelete);
                await unitofWork.Complete();

                return Ok(mapper.Map<Favourite, FavouriteToReturnDto>(favourite));
            }

            return BadRequest(new ApiResponse(400, "Does not exist!"));
        }


        [HttpPost]
        public async Task<ActionResult<FavouriteToReturnDto>> CreateFavourite(FavouriteDto favouriteToCreateDto)
        {
            var favouriteSpec = new FavouriteSpecification(favouriteToCreateDto.UserId);
            var favourite = await unitofWork.Repository<Favourite>().GetEntityWithSpec(favouriteSpec);

            if (favourite == null)
            {
                var favouriteToAdd = new Favourite
                {
                    Id = Guid.NewGuid(),
                    UserId = favouriteToCreateDto.UserId,
                    Repositories = new List<Repository>()
                };

                unitofWork.Repository<Favourite>().Add(favouriteToAdd);
                await unitofWork.Complete();

                var repoToAdd = new Repository
                {
                    Id = Guid.NewGuid(),
                    RepoId = favouriteToCreateDto.RepoId,
                    FavouriteId = favouriteToAdd.Id
                };

                unitofWork.Repository<Repository>().Add(repoToAdd);
                await unitofWork.Complete();

                return Ok(favouriteToAdd);
            }

            if (favourite.Repositories.Any(x => x.RepoId == favouriteToCreateDto.RepoId))
            {
                return BadRequest(new ApiResponse(400, "Already a favourite!"));
            }

            var newRepoToAdd = new Repository
            {
                Id = Guid.NewGuid(),
                RepoId = favouriteToCreateDto.RepoId,
                FavouriteId = favourite.Id
            };

            unitofWork.Repository<Repository>().Add(newRepoToAdd);
            await unitofWork.Complete();

            return Ok(mapper.Map<Favourite, FavouriteToReturnDto>(favourite));
        }
    }
}