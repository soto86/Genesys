import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/store/rootStore";
import PersonaDetailedChat from "./PersonaDetailedChat";
import PersonaDetailedHeader from "./PersonaDetailedHeader";
import PersonaDetailedInfo from "./PersonaDetailedInfo";
import PersonaDetailedSidebar from "./PersonaDetailedSidebar";

interface DetailParams {
  id: string;
}

const PersonaDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { persona, loadPersona, loadingInitial } = rootStore.personaStore;

  useEffect(() => {
    loadPersona(match.params.id);
  }, [loadPersona, match.params.id, history]);

  if (loadingInitial) {
    return <LoadingComponent content="Cargando persona..." />;
  }

  if (!persona) return <h2>No se encontró la persona</h2>;

  return (
    <Grid>
      <Grid.Column width={8}>
        <PersonaDetailedHeader persona={persona} />
        <PersonaDetailedInfo persona={persona} />
        <PersonaDetailedChat />
      </Grid.Column>
      <Grid.Column width={8}>
        <PersonaDetailedSidebar />
      </Grid.Column>
    </Grid>

    // <Card>
    //   <Image src="/assets/user.png" wrapped ui={false} />
    //   <Card.Content>
    //     <Card.Header>
    //       {persona?.apellido}, {persona?.nombre}
    //     </Card.Header>
    //     <Card.Meta>
    //       <span>{persona?.celular}</span>
    //     </Card.Meta>
    //     <Card.Description>{persona?.dni}</Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <Button.Group widths={2}>
    //       <Button
    //         as={Link}
    //         to={`/manage/${persona.id}`}
    //         basic
    //         color="blue"
    //         content="Editar"
    //       />
    //       <Button
    //         onClick={() => history.push("/personas")}
    //         basic
    //         color="grey"
    //         content="Cancelar"
    //       />
    //     </Button.Group>
    //   </Card.Content>
    // </Card>
  );
};

export default observer(PersonaDetails);
