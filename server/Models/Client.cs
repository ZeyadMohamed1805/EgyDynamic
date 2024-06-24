namespace server.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Admin CreatedBy { get; set; } = new Admin();
        public DateTime CreatedOn { get; set; }
        public Admin? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public List<Call> Calls { get; set; } = [];
    }
}