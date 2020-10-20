import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

const HomePage = () => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Icon
            className="dollar sign"
            size="large"
            // style={{ marginRight: "10" }}
          />
          Genesys
        </Header>
        <Header as="h2" inverted content="Welcome to Genesys" />
        <Button as={Link} to="/personas" size="huge" inverted>
          Comencemos!
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
