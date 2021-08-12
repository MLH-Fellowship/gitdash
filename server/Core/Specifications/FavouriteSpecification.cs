using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class FavouriteSpecification : BaseSpecifcation<Favourite>
    {
        public FavouriteSpecification()
        {
            AddInclude(x => x.Repositories);
        }

        public FavouriteSpecification(string userId) : base(x => x.UserId == userId)
        {
            AddInclude(x => x.Repositories);
        }
    }
}