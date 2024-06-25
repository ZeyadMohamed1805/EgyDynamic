using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Abstracts.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(Admin admin);
    }
}