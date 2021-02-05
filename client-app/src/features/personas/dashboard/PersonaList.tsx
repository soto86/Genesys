import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Item, Label } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/store/rootStore";
import PersonaListItem from "./PersonaListItem";

const PersonaList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { personasByLastName } = rootStore.personaStore;
  return (
    <Fragment>
      {personasByLastName.map(([group, personas]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Item.Group divided>
            {personas.map((persona) => (
              <PersonaListItem key={persona.id} persona={persona} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(PersonaList);
