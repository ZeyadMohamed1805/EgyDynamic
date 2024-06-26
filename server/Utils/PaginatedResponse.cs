namespace server.Utils
{
    public class PaginatedResponse<T>
    {
        public List<T> Data { get; set; } = [];
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
    }
}