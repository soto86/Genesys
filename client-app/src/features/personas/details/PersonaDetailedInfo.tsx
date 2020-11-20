import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IPersona } from "../../../app/models/Persona";
import { format } from "date-fns";

const PersonaDetailedInfo: React.FC<{ persona: IPersona }> = ({ persona }) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{"Monotributo"}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>
              {format(persona.fechaNacimiento, "dd-MM-yyyy")}
              {/* at{" "} {format(persona.fechaNacimiento, "HH:mm:ss OOOO ")} */}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {persona.email}, {persona.celular}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default PersonaDetailedInfo;
