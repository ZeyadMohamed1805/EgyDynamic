using Microsoft.AspNetCore.Mvc;
using server.Abstracts.Interfaces;
using server.Data;

namespace server.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public AuthRepository(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public Task<IActionResult> Login()
        {
            throw new NotImplementedException();
        }
    }
}