using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
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

        public class Handler : IRequestHandler<Query, Persona>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Persona> Handle(Query request, CancellationToken cancellationToken)
            {
                var persona = await _context.Personas.FindAsync(request.Id);

                if (persona == null)
                        throw new RestException(HttpStatusCode.NotFound, new { Persona = "Not Found" });

                return persona;
            }
        }
    }
}
