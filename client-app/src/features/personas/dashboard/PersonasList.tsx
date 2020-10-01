import React from "react";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { IPersona } from "../../../app/models/Persona";

interface IProps {
  personas: IPersona[];
  selectPersona: (id: string) => void;
  deletePersona: (id: string) => void;
}

const PersonasList: React.FC<IProps> = ({
  personas,
  selectPersona,
  deletePersona,
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {personas.map((persona) => (
          <Item key={persona.id}>
            <Item.Content>
              <Item.Header as="a" style={{ marginBottom: "10" }}>
                <Icon name="user" />
                {persona.apellido}, {persona.nombre}
              </Item.Header>
              <Item.Description>
                <div style={{ marginTop: "1em" }}>
                  <Icon name="mobile" />
                  {persona.celular}
                </div>
                <div>
                  <Icon name="phone" />
                  {persona.telefono}
                </div>
                <div>
                  <Icon name="mail" />
                  {persona.email}
                </div>
                <div>
                  <Icon name="id card" />
                  {persona.cuil}
                </div>
                <div>
                  <Icon name="id card" />
                  {persona.dni}
                </div>
                <div>
                  <Icon name="calendar alternate" />
                  {persona.fechaNacimiento}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectPersona(persona.id)}
                  floated="right"
                  content="Ver"
                  color="blue"
                />
                <Button
                  onClick={() => deletePersona(persona.id)}
                  floated="right"
                  content="Borrar"
                  color="red"
                />
                <Label basic content="Category" />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default PersonasList;
