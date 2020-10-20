import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { IPersona } from "../../../app/models/Persona";
import { v4 as uuid } from "uuid";
import PersonaStore from "../../../app/store/personaStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const PersonaForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const personaStore = useContext(PersonaStore);
  const {
    createPersona,
    editPersona,
    submitting,
    persona: initialFormState,
    loadPersona,
    clearPersona,
  } = personaStore;

  const [persona, setPersona] = useState<IPersona>({
    id: "",
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    celular: "",
    email: "",
    cuil: "",
    fechaNacimiento: "",
  });

  useEffect(() => {
    if (match.params.id && persona.id.length === 0) {
      loadPersona(match.params.id).then(
        () => initialFormState && setPersona(initialFormState)
      );
    }
    return () => {
      clearPersona();
    };
  }, [
    loadPersona,
    clearPersona,
    match.params.id,
    initialFormState,
    persona.id.length,
  ]);

  const handleSubmit = () => {
    if (persona.id.length === 0) {
      let newPersona = {
        ...persona,
        id: uuid(),
      };
      createPersona(newPersona).then(() =>
        history.push(`/personas/${newPersona.id}`)
      );
    } else {
      editPersona(persona).then(() => history.push(`/personas/${persona.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setPersona({ ...persona, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={8}>
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
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Guardar"
            />
            <Button
              onClick={() => history.push("/personas")}
              floated="right"
              type="button"
              content="Cancelar"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PersonaForm);
