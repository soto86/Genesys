import React, { Fragment } from "react";
import "./App.tsx";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import NavBar from "../../features/nav/NavBar";
import PersonaDashboard from "../../features/personas/dashboard/PersonaDashboard";
import { observer } from "mobx-react-lite";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import PersonaForm from "../../features/personas/form/PersonaForm";
import PersonaDetails from "../../features/personas/details/PersonaDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/personas" component={PersonaDashboard} />
              <Route path="/personas/:id" component={PersonaDetails} />
              <Route
                key={location.key}
                path={["/createPersona", "/manage/:id"]}
                component={PersonaForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
