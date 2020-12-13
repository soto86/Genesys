using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Persona> Personas { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //builder.Entity<Persona>()
            //    .HasData(
            //        new Persona {Id = 1, Apellido = "Soto", Nombre = "Santiago"},
            //        new Persona {Id = 2, Apellido = "Lopez Canseco", Nombre = "Elina"},
            //        new Persona {Id = 3, Apellido = "Salgueiro", Nombre = "Ezequiel"}
            //    );
        }
 

    }
}
