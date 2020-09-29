using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Personas
{
    public class List
    {
        public class Query : IRequest<List<Persona>>
        {

        }
        public class Handler : IRequestHandler<Query, List<Persona>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Persona>> Handle(Query request, CancellationToken cancellationToken)
            {
                var personas = await _context.Personas.ToListAsync(cancellationToken);
                return personas;
            }
        }
    }
}
