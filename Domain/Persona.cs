using System;

namespace Domain
{
    public class Persona
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public long Dni { get; set; }
        public string Telefono { get; set; }
        public string Celular { get; set; }
        public string Email { get; set; }
        public long Cuil { get; set; }
        public DateTime FechaNacimiento { get; set; }
    }
}
