using MediatR;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;

namespace Application.Personas
{
    public class Edit
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
            public DateTime? FechaNacimiento { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Nombre).NotEmpty();
                RuleFor(x => x.Apellido).NotEmpty();
                RuleFor(x => x.Telefono).NotEmpty();
                RuleFor(x => x.Celular).NotEmpty();
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Cuil).NotEmpty();
                RuleFor(x => x.FechaNacimiento).NotEmpty();
            }
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
                var persona = await _context.Personas.FindAsync(request.Id);
                if (persona == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Persona = "Not found" });

                persona.Apellido = request.Apellido ?? persona.Apellido;
                persona.Nombre = request.Nombre ?? persona.Nombre;
                persona.Telefono = request.Telefono ?? persona.Telefono;
                persona.Celular = request.Celular ?? persona.Celular;
                persona.Email = request.Email ?? persona.Email;
                persona.Dni = request.Dni ?? persona.Dni;
                persona.Cuil = request.Cuil ?? persona.Cuil;
                persona.FechaNacimiento = request.FechaNacimiento ?? persona.FechaNacimiento;



                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
