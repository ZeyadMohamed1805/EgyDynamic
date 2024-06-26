using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Abstracts.Interfaces;
using server.DTOs.Calls;
using server.Extensions;
using server.Mappers;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByClient([FromRoute] int id, [FromQuery] PaginatedQuery query)
        {
            var calls = await _callRepository.GetByClient(id, query);
            return Ok(calls);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PostCallsDTO callDTO)
        {
            var username = User.GetUsername();
            var admin = await _userManager.FindByNameAsync(username);

            if (admin == null)
                return Unauthorized();

            var call = callDTO.ToCallFromPostCallsDTO(admin);
            await _callRepository.Post(call);
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] PutCallsDTO callDTO)
        {
            var call = await _callRepository.GetById(id);

            if (call == null)
                return NotFound();

            var username = User.GetUsername();
            var admin = await _userManager.FindByNameAsync(username);

            if (admin == null)
                return Unauthorized();

            await _callRepository.Put(call, callDTO, admin);

            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var call = await _callRepository.GetById(id);

            if (call == null)
                return NotFound();

            await _callRepository.Delete(call);

            return NoContent();
        }
    }
}