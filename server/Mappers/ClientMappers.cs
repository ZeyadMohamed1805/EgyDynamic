using server.DTOs.Client;
using server.Models;

namespace server.Mappers
{
    public static class ClientMappers
    {
        public static GetClientsDTO ToGetClientsDTOFromClient(this Client client)
        {
            return new GetClientsDTO
            {
                Id = client.Id,
                Name = client.Name,
                Description = client.Description,
                Address = client.Address,
                CreatedOn = client.CreatedOn,
                CreatedBy = client.CreatedBy.UserName!,
                UpdatedOn = client.UpdatedOn,
                UpdatedBy = client.UpdatedBy?.UserName
            };
        }
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