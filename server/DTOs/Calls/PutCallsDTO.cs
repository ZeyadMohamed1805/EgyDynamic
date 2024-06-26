using server.Abstracts.Enums;

namespace server.DTOs.Calls
{
    public class PutCallsDTO
    {
        public string Description { get; set; } = string.Empty;
        public int Duration { get; set; }
        public DateTime MadeOn { get; set; }
        public bool IsCompleted { get; set; }
        public ECallType Type { get; set; }
    }
}