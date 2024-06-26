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

        public static Call ToCallFromPostCallsDTO(this PostCallsDTO callDTO, Admin admin)
        {
            return new Call
            {
                Description = callDTO.Description,
                Duration = callDTO.Duration,
                IsCompleted = callDTO.IsCompleted,
                MadeOn = callDTO.MadeOn,
                Type = callDTO.Type,
                ClientId = callDTO.ClientId,
                CreatedBy = admin,
                CreatedById = admin.Id,
                CreatedOn = DateTime.Now,
            };
        }
    }
}