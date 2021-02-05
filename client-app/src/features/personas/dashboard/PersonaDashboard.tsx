import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PersonaList from "./PersonaList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/store/rootStore";

const PersonaDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadPersonas, loadingInitial } = rootStore.personaStore;

  useEffect(() => {
    loadPersonas();
  }, [loadPersonas]);

  if (loadingInitial) return <LoadingComponent content="Cargando..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <PersonaList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Persona filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PersonaDashboard);
