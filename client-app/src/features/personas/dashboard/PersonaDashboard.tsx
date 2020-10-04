import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IPersona } from "../../../app/models/Persona";
import PersonaDetails from "../details/PersonaDetails";
import PersonaForm from "../form/PersonaForm";
import PersonasList from "./PersonasList";

interface IProps {
  personas: IPersona[];
  selectPersona: (id: string) => void;
  selectedPersona: IPersona | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedPersona: (persona: IPersona | null) => void;
  createPersona: (persona: IPersona) => void;
  editPersona: (persona: IPersona) => void;
  deletePersona: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const PersonaDashboard: React.FC<IProps> = ({
  personas,
  selectPersona,
  selectedPersona,
  editMode,
  setEditMode,
  setSelectedPersona,
  createPersona,
  editPersona,
  deletePersona,
  submitting,
  target,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <PersonasList
          personas={personas}
          selectPersona={selectPersona}
          deletePersona={deletePersona}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedPersona && !editMode && (
          <PersonaDetails
            persona={selectedPersona}
            setEditMode={setEditMode}
            setSelectedPersona={setSelectedPersona}
          />
        )}
        {editMode && (
          <PersonaForm
            key={(selectPersona && selectedPersona?.id) || 0}
            setEditMode={setEditMode}
            persona={selectedPersona!}
            createPersona={createPersona}
            editPersona={editPersona}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default PersonaDashboard;
