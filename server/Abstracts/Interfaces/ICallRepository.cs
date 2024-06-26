using server.DTOs.Calls;
using server.Models;
using server.Utils;

namespace server.Abstracts.Interfaces
{
    public interface ICallRepository
    {
        public Task<PaginatedResponse<GetCallsDTO>> GetAll(PaginatedQuery query);
        public Task<List<Call>> GetByClient(int id);
        public Task Post(Call call);
        public Task Put(Call call, PutCallsDTO clientDTO, Admin admin);
        public Task Delete(Call call);
    }
}