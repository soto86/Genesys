import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PersonasList from "./PersonasList";
import PersonaStore from "../../../app/store/personaStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const PersonaDashboard: React.FC = () => {
  const personaStore = useContext(PersonaStore);

  useEffect(() => {
    personaStore.loadPersonas();
  }, [personaStore]);

  if (personaStore.loadingInitial)
    return <LoadingComponent content="Cargando..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <PersonasList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Persona filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PersonaDashboard);
