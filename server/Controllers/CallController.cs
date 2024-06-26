using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Abstracts.Interfaces;
using server.Models;
using server.Utils;

namespace server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/call")]

    public class CallController : Controller
    {
        private readonly ICallRepository _callRepository;
        private readonly UserManager<Admin> _userManager;
        public CallController(ICallRepository callRepository, UserManager<Admin> userManager)
        {
            _callRepository = callRepository;
            _userManager = userManager;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAll([FromQuery] PaginatedQuery query)
        {
            var calls = await _callRepository.GetAll(query);
            return Ok(calls);
        }
    }
}