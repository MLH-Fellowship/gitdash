using System.Collections.Generic;

namespace Core.Entities
{
    public class Favourite : BaseEntity
    {
        public string UserId { get; set; }
        public List<Repository> Repositories { get; set; }
    }
}