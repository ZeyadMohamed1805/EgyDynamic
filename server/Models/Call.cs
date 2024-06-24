using server.Abstracts;

namespace server.Models
{
    public class Call
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Duration { get; set; }
        public DateTime MadeOn { get; set; }
        public bool IsCompleted { get; set; }
        public CallType Type { get; set; }
        public int CreatedById { get; set; }
        public Admin CreatedBy { get; set; } = new Admin();
        public DateTime CreatedOn { get; set; }
        public int? UpdatedById { get; set; }
        public Admin? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? ClientId { get; set; }
        public Client? Client { get; set; }
    }
}