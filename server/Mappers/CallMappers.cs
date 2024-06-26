using server.DTOs.Calls;
using server.Models;

namespace server.Mappers
{
    public static class CallMappers
    {
        public static GetCallsDTO ToGetCallsDTOFromCall(this Call call)
        {
            return new GetCallsDTO
            {
                Id = call.Id,
                Duration = call.Duration,
                Description = call.Description,
                IsCompleted = call.IsCompleted,
                MadeOn = call.MadeOn,
                Type = call.Type,
                Client = call.Client?.Name,
                CreatedOn = call.CreatedOn,
                CreatedBy = call.CreatedBy.UserName!,
                UpdatedOn = call.UpdatedOn,
                UpdatedBy = call.UpdatedBy?.UserName
            };
        }
    }
}