using server.DTOs.Client;
using server.Models;

namespace server.Mappers
{
    public static class ClientMappers
    {
        public static Client ToClientFromPostClientDTO(this PostClientDTO clientDTO, Admin admin)
        {
            return new Client
            {
                Name = clientDTO.Name,
                Address = clientDTO.Address,
                Description = clientDTO.Description,
                CreatedBy = admin,
                CreatedById = admin.Id,
                CreatedOn = DateTime.Now,
                Calls = []
            };
        }
    }
}