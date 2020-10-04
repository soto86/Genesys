import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import "./App.tsx";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { IPersona } from "../models/Persona";
import NavBar from "../../features/nav/NavBar";
import PersonaDashboard from "../../features/personas/dashboard/PersonaDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [personas, setPersonas] = useState<IPersona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<IPersona | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectedPersona = (id: string) => {
    setSelectedPersona(personas.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedPersona(null);
    setEditMode(true);
  };

  const handleCreatePersona = (persona: IPersona) => {
    setSubmitting(true);
    agent.Personas.create(persona)
      .then(() => {
        setPersonas([...personas, persona]);
        setSelectedPersona(persona);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditPersona = (persona: IPersona) => {
    setSubmitting(true);
    agent.Personas.update(persona)
      .then(() => {
        setPersonas([...personas.filter((a) => a.id !== persona.id), persona]);
        setSelectedPersona(persona);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleDeletePersona = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Personas.delete(id)
      .then(() => {
        setPersonas([...personas.filter((a) => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Personas.list()
      .then((response) => {
        let personas: IPersona[] = [];
        response.forEach((persona) => {
          persona.fechaNacimiento = persona.fechaNacimiento.split("T")[0];
          personas.push(persona);
        });
        setPersonas(response);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading) return <LoadingComponent content="Cargando..." />;

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
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
