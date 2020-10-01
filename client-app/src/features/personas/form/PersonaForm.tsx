import React, { FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IPersona } from "../../../app/models/Persona";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  persona: IPersona;
  createPersona: (persona: IPersona) => void;
  editPersona: (persona: IPersona) => void;
}

const PersonaForm: React.FC<IProps> = ({
  setEditMode,
  persona: initialFormState,
  createPersona,
  editPersona,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        celular: "",
        email: "",
        cuil: "",
        fechaNacimiento: "",
      };
    }
  };

  const [persona, setPersona] = useState<IPersona>(initializeForm);

  const handleSubmit = () => {
    if (persona.id.length === 0) {
      let newPersona = {
        ...persona,
        id: uuid(),
      };
      createPersona(newPersona);
    } else {
      editPersona(persona);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setPersona({ ...persona, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="nombre"
          placeholder="Nombre"
          value={persona.nombre}
        />
        <Form.Input
          onChange={handleInputChange}
          name="apellido"
          placeholder="Apellido"
          value={persona.apellido}
        />
        <Form.Input
          onChange={handleInputChange}
          name="dni"
          placeholder="Dni"
          value={persona.dni}
        />
        <Form.Input
          onChange={handleInputChange}
          name="telefono"
          placeholder="Telefono"
          value={persona.telefono}
        />
        <Form.Input
          onChange={handleInputChange}
          name="celular"
          placeholder="Celular"
          value={persona.celular}
        />
        <Form.Input
          onChange={handleInputChange}
          name="email"
          placeholder="Email"
          value={persona.email}
        />
        <Form.Input
          onChange={handleInputChange}
          name="cuil"
          placeholder="Cuil"
          value={persona.cuil}
        />
        <Form.Input
          onChange={handleInputChange}
          name="fechaNacimiento"
          type="date"
          placeholder="Fecha de nacimiento"
          value={persona.fechaNacimiento}
        />
        <Button floated="right" positive type="submit" content="Guardar" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancelar"
        />
      </Form>
    </Segment>
  );
};

export default PersonaForm;
