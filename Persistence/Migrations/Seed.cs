using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Persistence.Migrations
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Santiago",
                        UserName = "soto",
                        Email = "soto@test.com",
                    },
                    new AppUser
                    {
                        DisplayName = "Elina",
                        UserName = "eli",
                        Email = "eli@test.com",
                    },
                    new AppUser
                    {
                        DisplayName = "Ezequiel",
                        UserName = "eque",
                        Email = "eque@test.com",
                    },
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Personas.Any()) return;
            var persona = new List<Persona>
            {
                new Persona
                {
                    Nombre = "Santiago",
                    Apellido = "Soto",
                    Celular = "3815659981",
                    Cuil = "20321440933",
                    Telefono = "03814238530",
                    Dni = "32144093",
                    Email = "santiagorsoto@gmail.com",
                    FechaNacimiento = DateTime.Parse("09-06-1986"),
                },
                new Persona
                {
                    Nombre = "Patricio",
                    Apellido = "Soto",
                    Celular = "3856584215",
                    Cuil = "20339662313",
                    Telefono = "03814555666",
                    Dni = "33966231",
                    Email = "patricio@test.com",
                    FechaNacimiento = DateTime.Parse("23-07-1988"),
                },
                new Persona
                {
                    Nombre = "Lucia",
                    Apellido = "Soto",
                    Celular = "385658855",
                    Cuil = "20339662303",
                    Telefono = "03814888999",
                    Dni = "33966230",
                    Email = "lucia@test.com",
                    FechaNacimiento = DateTime.Parse("23-07-1988"),
                },
                new Persona
                {
                    Nombre = "Elina",
                    Apellido = "Lopez Canseco",
                    Celular = "3814649602",
                    Cuil = "203413217683",
                    Telefono = "03814246820",
                    Dni = "34132768",
                    Email = "Elina@test.com",
                    FechaNacimiento = DateTime.Parse("15-08-1989"),
                },
            };
            context.Personas.AddRange(persona);
            context.SaveChanges();
        }
    }
}
