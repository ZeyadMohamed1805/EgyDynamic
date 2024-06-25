using Microsoft.EntityFrameworkCore;
using server.Abstracts.Interfaces;
using server.Data;
using server.Models;
using server.Utils.Client;

namespace server.Repository
{
    public class ClientRepository : IClientRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public ClientRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Client>> GetAll(ClientQuery query)
        {
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            var clients = await _dbContext.Clients.Skip(skipNumber).Take(query.PageSize).ToListAsync();
            return clients;
        }

        public async Task<Client?> GetById(int id)
        {
            var client = await _dbContext.Clients.FindAsync(id);
            return client;
        }

        public async Task Post(Client client)
        {
            await _dbContext.Clients.AddAsync(client);
            await _dbContext.SaveChangesAsync();
        }
    }
}