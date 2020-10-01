import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { IPersona } from "../../../app/models/Persona";

interface IProps {
  persona: IPersona;
  setEditMode: (editMode: boolean) => void;
  setSelectedPersona: (persona: IPersona | null) => void;
}

const PersonaDetails: React.FC<IProps> = ({
  persona,
  setEditMode,
  setSelectedPersona,
}) => {
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          {persona.apellido}, {persona.nombre}
        </Card.Header>
        <Card.Meta>
          <span>{persona.celular}</span>
        </Card.Meta>
        <Card.Description>{persona.dni}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Editar"
          />
          <Button
            onClick={() => setSelectedPersona(null)}
            basic
            color="grey"
            content="Cancelar"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default PersonaDetails;
