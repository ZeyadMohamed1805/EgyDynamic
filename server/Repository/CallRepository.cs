using Microsoft.EntityFrameworkCore;
using server.Abstracts.Interfaces;
using server.Data;
using server.DTOs.Calls;
using server.Mappers;
using server.Models;
using server.Utils;

namespace server.Repository
{
    public class CallRepository : ICallRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public CallRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<PaginatedResponse<GetCallsDTO>> GetAll(PaginatedQuery query)
        {
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            var totalCount = await _dbContext.Calls.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)query.PageSize);
            var calls = await _dbContext.Calls
                .Skip(skipNumber)
                .Take(query.PageSize)
                .Include(call => call.CreatedBy)
                .Include(call => call.UpdatedBy)
                .Select(client => client.ToGetCallsDTOFromCall())
                .ToListAsync();

            return new PaginatedResponse<GetCallsDTO>
            {
                Data = calls,
                TotalCount = totalCount,
                TotalPages = totalPages
            };
        }

        public async Task<List<Call>> GetByClient(int id)
        {
            throw new NotImplementedException();
        }

        public async Task Post(Call call)
        {
            throw new NotImplementedException();
        }

        public async Task Put(Call call, PutCallsDTO clientDTO, Admin admin)
        {
            throw new NotImplementedException();
        }
        public async Task Delete(Call call)
        {
            throw new NotImplementedException();
        }
    }
}