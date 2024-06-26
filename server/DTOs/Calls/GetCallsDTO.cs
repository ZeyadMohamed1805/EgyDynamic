using server.Abstracts.Enums;

namespace server.DTOs.Calls
{
    public class GetCallsDTO
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Duration { get; set; }
        public DateTime MadeOn { get; set; }
        public bool IsCompleted { get; set; }
        public ECallType Type { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public string? UpdatedBy { get; set; }
        public string? Client { get; set; }
    }
}