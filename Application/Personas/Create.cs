using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Personas
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Nombre { get; set; }
            public string Apellido { get; set; }
            public string Dni { get; set; }
            public string Telefono { get; set; }
            public string Celular { get; set; }
            public string Email { get; set; }
            public string Cuil { get; set; }
            public DateTime FechaNacimiento { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var persona = new Persona
                {
                    Id = request.Id,
                    Apellido = request.Apellido,
                    Nombre = request.Nombre,
                    Celular = request.Celular,
                    Cuil = request.Cuil,
                    Dni = request.Dni,
                    Email = request.Email,
                    FechaNacimiento = request.FechaNacimiento,
                    Telefono = request.Telefono,
                };
                _context.Personas.Add(persona);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}
