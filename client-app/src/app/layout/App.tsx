import React, { useState, useEffect, Fragment } from "react";
import "./App.tsx";
import axios from "axios";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { IPersona } from "../models/Persona";
import NavBar from "../../features/nav/NavBar";
import PersonaDashboard from "../../features/personas/dashboard/PersonaDashboard";

const App = () => {
  const [personas, setPersonas] = useState<IPersona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<IPersona | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectedPersona = (id: string) => {
    setSelectedPersona(personas.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedPersona(null);
    setEditMode(true);
  };

  const handleCreatePersona = (persona: IPersona) => {
    setPersonas([...personas, persona]);
    setSelectedPersona(persona);
    setEditMode(false);
  };

  const handleEditPersona = (persona: IPersona) => {
    setPersonas([...personas.filter((a) => a.id !== persona.id), persona]);
    setSelectedPersona(persona);
    setEditMode(false);
  };
  const handleDeletePersona = (id: string) => {
    setPersonas([...personas.filter((a) => a.id !== id)]);
  };

  useEffect(() => {
    axios
      .get<IPersona[]>("http://localhost:5000/api/personas")
      .then((response) => {
        let personas: IPersona[] = [];
        response.data.forEach((persona) => {
          persona.fechaNacimiento = persona.fechaNacimiento.split("T")[0];
          personas.push(persona);
        });
        setPersonas(response.data);
      });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <PersonaDashboard
          personas={personas}
          selectPersona={handleSelectedPersona}
          selectedPersona={selectedPersona}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedPersona={setSelectedPersona}
          createPersona={handleCreatePersona}
          editPersona={handleEditPersona}
          deletePersona={handleDeletePersona}
        />
      </Container>
    </Fragment>
  );
};

export default App;
