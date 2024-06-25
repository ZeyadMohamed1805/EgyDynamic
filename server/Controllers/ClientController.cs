using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Abstracts.Interfaces;
using server.DTOs.Client;
using server.Extensions;
using server.Mappers;
using server.Models;
using server.Utils.Client;

namespace server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/client")]
    public class ClientController : Controller
    {
        private readonly IClientRepository _clientRepository;
        private readonly UserManager<Admin> _userManager;
        public ClientController(IClientRepository clientRepository, UserManager<Admin> userManager)
        {
            _clientRepository = clientRepository;
            _userManager = userManager;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAll([FromQuery] ClientQuery query)
        {
            var clients = await _clientRepository.GetAll(query);
            var clientsDto = clients.Select(client => client.ToGetClientsDTOFromClient()).ToList();
            return Ok(clientsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var client = await _clientRepository.GetById(id);

            if (client == null)
                return NotFound();

            return Ok(client);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PostClientDTO clientDTO)
        {
            var username = User.GetUsername();
            var admin = await _userManager.FindByNameAsync(username);

            if (admin == null)
                return Unauthorized();

            var client = clientDTO.ToClientFromPostClientDTO(admin);
            await _clientRepository.Post(client);
            return Ok();
        }
    }
}