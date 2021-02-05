import {
  action,
  computed,
  // makeObservable,
  observable,
  runInAction,
} from "mobx";
import { SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../api/agent";
import { IPersona } from "../models/Persona";
import { RootStore } from "./rootStore";

export default class PersonaStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable personaRegistry = new Map();
  @observable persona: IPersona | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get personasByLastName() {
    return this.groupPersonasByLastName(
      Array.from(this.personaRegistry.values())
    );
  }

  groupPersonasByLastName = (personas: IPersona[]) => {
    const sortedPersonas = personas.slice().sort((a, b) => {
      if (a.apellido > b.apellido) {
        return 1;
      } else if (a.apellido < b.apellido) {
        return -1;
      }
      if (a.nombre > b.nombre) {
        return 1;
      } else if (a.nombre < b.nombre) {
        return -1;
      } else {
        return 0;
      }
    });
    return Object.entries(
      sortedPersonas.reduce((personas, persona) => {
        const firstLetter = persona.apellido.charAt(0);
        personas[firstLetter] = personas[firstLetter]
          ? [...personas[firstLetter], persona]
          : [persona];
        return personas;
      }, {} as { [key: string]: IPersona[] })
    );
  };

  // constructor() {
  //   makeObservable(this);
  // }

  @action loadPersonas = async () => {
    this.loadingInitial = true;
    try {
      const personas = await agent.Personas.list();
      runInAction("loading personas", () => {
        personas.forEach((persona) => {
          persona.fechaNacimiento = new Date(persona.fechaNacimiento!);
          this.personaRegistry.set(persona.id, persona);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load personas error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadPersona = async (id: string) => {
    let persona = this.getPersona(id);
    if (persona) {
      this.persona = persona;
      return persona;
    } else {
      this.loadingInitial = true;
      try {
        persona = await agent.Personas.details(id);
        runInAction("getting persona", () => {
          persona.fechaNacimiento = new Date(persona.fechaNacimiento);
          this.persona = persona;
          this.personaRegistry.set(persona.id, persona);
          this.loadingInitial = false;
        });
        return persona;
      } catch (error) {
        runInAction("get persona error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearPersona = () => {
    this.persona = null;
  };

  getPersona = (id: string) => {
    return this.personaRegistry.get(id);
  };

  @action createPersona = async (persona: IPersona) => {
    this.submitting = true;
    try {
      await agent.Personas.create(persona);
      runInAction("creating personas", () => {
        this.personaRegistry.set(persona.id, persona);
        this.submitting = false;
      });
      history.push(`/personas/${persona.id}`);
    } catch (error) {
      runInAction("create persona error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };
  @action editPersona = async (persona: IPersona) => {
    this.submitting = true;
    try {
      await agent.Personas.update(persona);
      runInAction("editing persona", () => {
        this.personaRegistry.set(persona.id, persona);
        this.persona = persona;
        this.submitting = false;
      });
      history.push(`/personas/${persona.id}`);
    } catch (error) {
      runInAction("edit persona error", () => {
        this.submitting = false;
      });
      console.log(error.response);
    }
  };

  @action deletePersona = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Personas.delete(id);
      runInAction("deleting persona", () => {
        this.personaRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete persona error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
}
