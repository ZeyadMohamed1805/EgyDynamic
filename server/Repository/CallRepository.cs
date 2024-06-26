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

        public async Task<PaginatedResponse<GetCallsDTO>> GetByClient(int id, PaginatedQuery query)
        {
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            var totalCount = await _dbContext.Calls.Where(call => call.ClientId == id).CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)query.PageSize);
            var calls = await _dbContext.Calls
                .Where(call => call.ClientId == id)
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

        public async Task<Call?> GetById(int id)
        {
            var call = await _dbContext.Calls.FindAsync(id);
            return call;
        }

        public async Task Post(Call call)
        {
            await _dbContext.Calls.AddAsync(call);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Put(Call call, PutCallsDTO callDTO, Admin admin)
        {
            call.UpdatedOn = DateTime.Now;
            call.UpdatedBy = admin;
            call.Description = callDTO.Description;
            call.Duration = callDTO.Duration;
            call.MadeOn = callDTO.MadeOn;
            call.IsCompleted = callDTO.IsCompleted;
            call.Type = callDTO.Type;

            await _dbContext.SaveChangesAsync();
        }
        public async Task Delete(Call call)
        {
            _dbContext.Calls.Remove(call);
            await _dbContext.SaveChangesAsync();
        }
    }
}