import { FORM_ERROR } from "final-form";
import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header } from "semantic-ui-react";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import TextInput from "../../app/common/form/TextInput";
import { IUserFormValues } from "../../app/models/user";
import { RootStoreContext } from "../../app/store/rootStore";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
  username: isRequired("nombre de usuario"),
  displayname: isRequired("nombre a mostrar"),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Registrarse en Genesys"
            color="teal"
            textAlign="center"
          />
          <Field
            name="username"
            component={TextInput}
            placeholder="Nombre de usuario"
          />
          <Field
            name="displayname"
            component={TextInput}
            placeholder="Nombre a mostrar"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              //text={JSON.stringify(submitError.data.errors)}
            />
          )}
          {/* <br /> */}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Registrarse"
            fluid
          />
          {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
        </Form>
      )}
    />
  );
};

export default RegisterForm;
