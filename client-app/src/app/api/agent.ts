import axios, { AxiosResponse } from "axios";
import { IPersona } from "../models/Persona";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  delete: (url: string) =>
    axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Personas = {
  list: (): Promise<IPersona[]> => requests.get("/personas"),
  details: (id: string) => requests.get(`/personas/${id}`),
  create: (persona: IPersona) => requests.post("/personas", persona),
  update: (persona: IPersona) =>
    requests.put(`/personas/${persona.id}`, persona),
  delete: (id: string) => requests.delete(`/personas/${id}`),
};

export default {
  Personas,
};
