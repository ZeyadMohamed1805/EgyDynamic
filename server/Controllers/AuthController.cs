using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Auth;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<Admin> _userManager;
        public AuthController(UserManager<Admin> userManager)
        {
            this._userManager = userManager;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var admin = new Admin
                {
                    Email = registerDTO.Email,
                    UserName = registerDTO.UserName,
                };
                var createAdmin = await _userManager.CreateAsync(admin, registerDTO.Password!);
                if (createAdmin.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(admin, "Admin");
                    if (roleResult.Succeeded)
                    {
                        return Ok("Admin Created");
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createAdmin.Errors);
                }
            }
            catch (Exception error)
            {
                return StatusCode(500, error);
            }
        }
    }
}