using System;

namespace Core.Entities
{
    public class Repository : BaseEntity
    {
        public string RepoId { get; set; }
        public Favourite Favourite { get; set; }
        public Guid FavouriteId { get; set; }
    }
}