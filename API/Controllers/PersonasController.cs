using Application.Personas;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class PersonasController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Persona>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Persona>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
        //public class PersonasController : ControllerBase
        //{
        //    //private readonly IMediator _mediator;
        //    private readonly DataContext _context;

        //    public PersonasController(DataContext context)
        //    {
        //        _context = context;
        //    }

        //    //public PersonasController(IMediator mediator)
        //    //{
        //    //    _mediator = mediator;
        //    //}

        //    //[HttpGet]
        //    //public async Task<ActionResult<List<Persona>>> List()
        //    //{
        //    //    return await _mediator.Send(new List.Query());
        //    //}

        //    //GET api/personas
        //   [HttpGet]
        //    public async Task<ActionResult<IEnumerable<Persona>>> Get()
        //    {
        //        var personas = await _context.Personas.ToListAsync();
        //        return Ok(personas);
        //    }

        //    // GET api/personas/5
        //    [HttpGet("{id}")]
        //    public async Task<ActionResult<Persona>> Get(int id)
        //    {
        //        var persona = await _context.Personas.FindAsync(id);
        //        return Ok(persona);
        //    }

        //    // POST api/personas
        //    [HttpPost]
        //    public void Post([FromBody] string value)
        //    {
        //    }

        //    // PUT api/personas/5
        //    [HttpPut("{id}")]
        //    public void Put(int id, [FromBody] string value)
        //    {
        //    }

        //    // DELETE api/personas/5
        //    [HttpDelete("{id}")]
        //    public void Delete(int id)
        //    {
        //    }
    }
}
