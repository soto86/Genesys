import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Ups! No pudimos encontar lo que buscas.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/personas" primary>
          Volver a la pagina de Personas
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
