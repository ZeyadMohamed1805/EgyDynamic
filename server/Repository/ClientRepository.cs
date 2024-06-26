using Microsoft.EntityFrameworkCore;
using server.Abstracts.Interfaces;
using server.Data;
using server.DTOs.Client;
using server.Mappers;
using server.Models;
using server.Utils;

namespace server.Repository
{
    public class ClientRepository : IClientRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public ClientRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PaginatedResponse<GetClientsDTO>> GetAll(PaginatedQuery query)
        {
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            var totalCount = await _dbContext.Clients.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)query.PageSize);
            var clients = await _dbContext.Clients
                .Skip(skipNumber)
                .Take(query.PageSize)
                .Include(client => client.CreatedBy)
                .Include(client => client.UpdatedBy)
                .Select(client => client.ToGetClientsDTOFromClient())
                .ToListAsync();

            return new PaginatedResponse<GetClientsDTO>
            {
                Data = clients,
                TotalCount = totalCount,
                TotalPages = totalPages
            };
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

        public async Task Put(Client client, PutClientDTO clientDTO, Admin admin)
        {
            client.UpdatedOn = DateTime.Now;
            client.UpdatedBy = admin;
            client.Name = clientDTO.Name;
            client.Address = clientDTO.Address;
            client.Description = clientDTO.Description;

            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(Client client)
        {
            _dbContext.Clients.Remove(client);
            await _dbContext.SaveChangesAsync();
        }
    }
}