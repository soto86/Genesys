import React from "react";
import { Button, Container, Icon, Menu } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item>
          <Icon
            className="dollar sign"
            size="large"
            style={{ marginRight: "10" }}
          />
          Genesys
        </Menu.Item>
        <Menu.Item name="Personas" />
        <Menu.Item>
          <Button onClick={openCreateForm} positive content="Agregar Persona" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
