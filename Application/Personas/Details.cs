using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Personas
{
    public class Details
    {
        public class Query : IRequest<Persona>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Persona>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Persona> Handle(Query request, CancellationToken cancellationToken)
            {
                var persona = await _context.Personas.FindAsync(request.Id);
                return persona;
            }
        }
    }
}
