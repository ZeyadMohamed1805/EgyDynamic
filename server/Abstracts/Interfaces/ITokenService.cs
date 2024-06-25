using server.Models;

namespace server.Abstracts.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(Admin admin);
    }
}