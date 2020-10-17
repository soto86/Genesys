import {
  action,
  computed,
  // makeObservable,
  observable,
  configure,
  runInAction,
} from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IPersona } from "../models/Persona";

configure({ enforceActions: "always" });

class PersonaStore {
  @observable personaRegistry = new Map();
  @observable persona: IPersona | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get personasByLastName() {
    return Array.from(this.personaRegistry.values())
      .slice()
      .sort((a, b) => {
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
  }

  // constructor() {
  //   makeObservable(this);
  // }

  @action loadPersonas = async () => {
    this.loadingInitial = true;
    try {
      const personas = await agent.Personas.list();
      runInAction("loading personas", () => {
        personas.forEach((persona) => {
          persona.fechaNacimiento = persona.fechaNacimiento.split("T")[0];
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
    } else {
      this.loadingInitial = true;
      try {
        persona = await agent.Personas.details(id);
        runInAction("getting persona", () => {
          this.persona = persona;
          this.loadingInitial = false;
        });
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
    } catch (error) {
      runInAction("create persona error", () => {
        this.submitting = false;
      });
      console.log(error);
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
    } catch (error) {
      runInAction("edit persona error", () => {
        this.submitting = false;
      });
      console.log(error);
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

export default createContext(new PersonaStore());
