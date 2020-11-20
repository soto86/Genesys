import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { IPersona } from "../../../app/models/Persona";
import PersonaStore from "../../../app/store/personaStore";
import { format } from "date-fns";

const PersonaListItem: React.FC<{ persona: IPersona }> = ({ persona }) => {
  const personaStore = useContext(PersonaStore);
  const { deletePersona, submitting, target } = personaStore;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="mini" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header
                as="a"
                style={{ fontSize: "20px", marginTop: "8px" }}
              >
                {persona.apellido}, {persona.nombre}
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Item>
          <Item.Content>
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
                {format(persona.fechaNacimiento, "dd-MM-yyyy")}
              </div>
            </Item.Description>
            <Item.Extra>
              <Label basic content="Monotributo" />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/personas/${persona.id}`}
          floated="right"
          content="Ver"
          color="blue"
        />
        <Button
          name={persona.id}
          loading={target === persona.id && submitting}
          onClick={(e) => deletePersona(e, persona.id)}
          floated="right"
          content="Borrar"
          color="red"
        />
      </Segment>
    </Segment.Group>
  );
};

export default PersonaListItem;
