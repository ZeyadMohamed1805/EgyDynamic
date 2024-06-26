using server.DTOs.Calls;
using server.Models;
using server.Utils;

namespace server.Abstracts.Interfaces
{
    public interface ICallRepository
    {
        public Task<PaginatedResponse<GetCallsDTO>> GetByClient(int id, PaginatedQuery query);
        public Task<Call?> GetById(int id);
        public Task Post(Call call);
        public Task Put(Call call, PutCallsDTO clientDTO, Admin admin);
        public Task Delete(Call call);
    }
}