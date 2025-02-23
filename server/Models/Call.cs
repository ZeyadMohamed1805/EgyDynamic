using System.ComponentModel.DataAnnotations.Schema;
using server.Abstracts.Enums;

namespace server.Models
{
    public class Call
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Duration { get; set; }
        public DateTime MadeOn { get; set; }
        public bool IsCompleted { get; set; }
        public ECallType Type { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }

        [ForeignKey("CreatedBy")]
        public string CreatedById { get; set; } = string.Empty;
        public Admin CreatedBy { get; set; } = new Admin();

        [ForeignKey("UpdatedBy")]
        public string? UpdatedById { get; set; }
        public Admin? UpdatedBy { get; set; }

        [ForeignKey("Client")]
        public int? ClientId { get; set; }
        public Client? Client { get; set; }
    }
}