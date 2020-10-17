import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import PersonaStore from "../../../app/store/personaStore";

const PersonasList: React.FC = () => {
  const personaStore = useContext(PersonaStore);
  const {
    personasByLastName,
    deletePersona,
    submitting,
    target,
  } = personaStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {personasByLastName.map((persona) => (
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
                <Label basic content="Category" />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(PersonasList);
