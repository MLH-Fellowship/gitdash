using System.Collections.Generic;

namespace API.Dtos
{
    public class FavouriteToReturnDto
    {
        public string UserId { get; set; }
        public List<RepositoryToReturnDto> Repositories { get; set; }
    }
}