import { configure } from "mobx";
import { createContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import PersonaStore from "./personaStore";
import UserStore from "./userStore";

configure({ enforceActions: "always" });

export class RootStore {
  personaStore: PersonaStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;

  constructor() {
    this.personaStore = new PersonaStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
