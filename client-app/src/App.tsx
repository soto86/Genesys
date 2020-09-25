import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class App extends Component {
  state = {
    personas: [],
  };
  componentDidMount() {
    axios.get("http://localhost:5000/api/personas").then((response) => {
      this.setState({
        personas: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Genesys</Header.Content>
        </Header>
        <List ordered>
          {this.state.personas.map((persona: any) => (
            <List.Item key={persona.id}>
              {persona.apellido}, {persona.nombre}
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
