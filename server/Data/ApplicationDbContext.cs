using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ApplicationDbContext : IdentityDbContext<Admin>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        { }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Call> Calls { get; set; }
    }
}