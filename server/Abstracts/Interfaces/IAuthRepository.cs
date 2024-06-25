using Microsoft.AspNetCore.Mvc;

namespace server.Abstracts.Interfaces
{
    public interface IAuthRepository
    {
        public Task<IActionResult> Login();
    }
}