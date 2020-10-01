import React from "react";
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
  deletePersona: (id: string) => void;
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
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <PersonasList
          personas={personas}
          selectPersona={selectPersona}
          deletePersona={deletePersona}
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
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default PersonaDashboard;
