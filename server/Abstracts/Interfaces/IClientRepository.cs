using server.DTOs.Client;
using server.Models;
using server.Utils;
using server.Utils.Client;

namespace server.Abstracts.Interfaces
{
    public interface IClientRepository
    {
        public Task<PaginatedResponse<GetClientsDTO>> GetAll(ClientQuery query);
        public Task<Client?> GetById(int id);
        public Task Post(Client client);
        public Task Put(Client client, PutClientDTO clientDTO, Admin admin);
        public Task Delete(Client client);
    }
}