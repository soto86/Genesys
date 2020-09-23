using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly DataContext _context;

        public PersonasController(DataContext context)
        {
            _context = context;
        }
        // GET api/personas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Persona>>> Get()
        {
            var personas = await  _context.Personas.ToListAsync();
            return Ok(personas);
        }

        // GET api/personas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Persona>> Get(int id)
        {
            var persona = await _context.Personas.FindAsync(id);
            return Ok(persona);
        }

        // POST api/personas
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/personas/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/personas/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
