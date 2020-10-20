import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Image, Item, Segment } from "semantic-ui-react";
import { IPersona } from "../../../app/models/Persona";

const personaImageStyle = {
  filter: "brightness(30%)",
  margin: "auto",
};

const PersonaImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const PersonaDetailedHeader: React.FC<{ persona: IPersona }> = ({
  persona,
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/user.png`}
          fluid
          size="medium"
          style={personaImageStyle}
        />
        <Segment
          basic
          //style={PersonaImageTextStyle}
        >
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  //content={persona.apellido}
                  //style={{ color: "white" }}
                >
                  {persona.apellido}, {persona.nombre}
                </Header>
                {/* <p>{persona.fechaNacimiento}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p> */}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {/* <Button color="teal">Join Activity</Button>
        <Button>Cancel attendance</Button> */}
        <Button color="orange" floated="right">
          Editar
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(PersonaDetailedHeader);
