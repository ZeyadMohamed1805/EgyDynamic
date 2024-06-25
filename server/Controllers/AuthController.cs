using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Abstracts.Interfaces;
using server.DTOs.Auth;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<Admin> _userManager;
        private readonly SignInManager<Admin> _signInManager;
        public AuthController(ITokenService tokenService, UserManager<Admin> userManager, SignInManager<Admin> signInManager)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var admin = await _userManager.Users.FirstOrDefaultAsync(user => user.Email == loginDTO.Email);

            if (admin == null)
                return Unauthorized("Invalid Email!");

            var result = await _signInManager.CheckPasswordSignInAsync(admin, loginDTO.Password!, false);

            if (!result.Succeeded)
                return Unauthorized("Incorrect Email/Password");

            return Ok(
                new AdminDTO
                {
                    Email = admin.Email!,
                    Token = _tokenService.CreateToken(admin)
                }
            );
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