import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { personaFormValue } from "../../../app/models/Persona";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import {
  combineValidators,
  composeValidators,
  createValidator,
  isNumeric,
  isRequired,
} from "revalidate";
import { RootStoreContext } from "../../../app/store/rootStore";
//import SelectInput from "../../../app/common/form/SelectInput";
//import { category } from "../../../app/common/form/options/categoryOptions";

const isValidEmail = createValidator(
  (message) => (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  "Invalid email address"
);

const validate = combineValidators({
  nombre: isRequired({ message: "El nombre es obligatorio" }),
  apellido: isRequired("apellido"),
  dni: composeValidators(
    isRequired({ message: "El dni es obligatorio" }),
    isNumeric("dni")
  )(),
  telefono: composeValidators(isRequired("telefono"), isNumeric("telefono"))(),
  email: composeValidators(isRequired("email"), isValidEmail())(),
  cuil: composeValidators(isRequired("cuil"), isNumeric("cuil"))(),
  celular: composeValidators(isRequired("celular"), isNumeric("celular"))(),
  fechaNacimiento: isRequired("Fecha de nacimiento"),
  time: isRequired("Hora de nacimiento"),
});

interface DetailParams {
  id: string;
}

const PersonaForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createPersona,
    editPersona,
    submitting,
    loadPersona,
  } = rootStore.personaStore;

  const [persona, setPersona] = useState(new personaFormValue());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadPersona(match.params.id)
        .then((persona) => setPersona(new personaFormValue(persona)))
        .finally(() => setLoading(false));
    }
  }, [loadPersona, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.fechaNacimiento, values.time);
    const { fechaNacimiento, time, ...persona } = values;
    persona.fechaNacimiento = dateAndTime;
    if (!persona.id) {
      let newPersona = {
        ...persona,
        id: uuid(),
      };
      createPersona(newPersona);
    } else {
      editPersona(persona);
    }
  };

  return (
    <Grid>
      <Grid.Column width={8}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={persona}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="nombre"
                  placeholder="Nombre"
                  value={persona.nombre}
                  component={TextInput}
                />
                <Field
                  name="apellido"
                  placeholder="Apellido"
                  rows={3}
                  value={persona.apellido}
                  component={TextAreaInput}
                />
                <Field
                  component={TextInput}
                  name="dni"
                  placeholder="Dni"
                  value={persona.dni}
                />
                <Field
                  name="telefono"
                  placeholder="Telefono"
                  value={persona.telefono}
                  component={TextInput}
                  // component={SelectInput}
                  // options={category}
                />
                <Field
                  name="celular"
                  placeholder="Celular"
                  value={persona.celular}
                  component={TextInput}
                />
                <Field
                  name="email"
                  placeholder="Email"
                  value={persona.email}
                  component={TextInput}
                />
                <Field
                  name="cuil"
                  placeholder="Cuil"
                  value={persona.cuil}
                  component={TextInput}
                />
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="fechaNacimiento"
                    date={true}
                    placeholder="Fecha de nacimiento"
                    value={persona.fechaNacimiento}
                    //type="date"
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Hora de nacimiento"
                    value={persona.time}
                    //type="date"
                  />
                </Form.Group>
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Guardar"
                />
                <Button
                  onClick={
                    persona.id
                      ? () => history.push(`/personas/${persona.id}`)
                      : () => history.push("/personas")
                  }
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancelar"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PersonaForm);
