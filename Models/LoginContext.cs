using Microsoft.EntityFrameworkCore;

namespace TEST_2.Models;

public class LoginContext : DbContext
{
    public LoginContext (DbContextOptions<LoginContext> options)
        : base(options)
    {
    }

    public DbSet<LoginModel> LoginModel  { get; set; } = null!;
}