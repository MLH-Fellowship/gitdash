using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class RepositorySpecification : BaseSpecifcation<Repository>
    {
        public RepositorySpecification()
        {
        }

        public RepositorySpecification(string repoId) : base(x => x.RepoId == repoId)
        {
        }
    }
}