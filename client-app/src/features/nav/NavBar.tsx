import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Icon, Menu } from "semantic-ui-react";

const NavBar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <Icon
            className="dollar sign"
            size="large"
            style={{ marginRight: "10" }}
          />
          Genesys
        </Menu.Item>
        <Menu.Item name="Personas" as={NavLink} to="/personas" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createPersona"
            positive
            content="Agregar Persona"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
