using server.Models;
using server.Utils.Client;

namespace server.Abstracts.Interfaces
{
    public interface IClientRepository
    {
        public Task<List<Client>> GetAll(ClientQuery query);
        public Task<Client?> GetById(int id);
        public Task Post(Client client);
    }
}