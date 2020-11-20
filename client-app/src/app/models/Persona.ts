export interface IPersona {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  celular: string;
  email: string;
  cuil: string;
  fechaNacimiento: Date;
}
export interface IPersonaFormValues extends Partial<IPersona> {
  time?: Date;
}
export class personaFormValue implements IPersonaFormValues {
  id?: string = undefined;
  nombre: string = "";
  apellido: string = "";
  dni: string = "";
  telefono: string = "";
  celular: string = "";
  email: string = "";
  cuil: string = "";
  fechaNacimiento?: Date = undefined;
  time?: Date = undefined;

  constructor(init?: IPersonaFormValues) {
    if (init && init.fechaNacimiento) {
      init.time = init.fechaNacimiento;
    }
    Object.assign(this, init);
  }
}
