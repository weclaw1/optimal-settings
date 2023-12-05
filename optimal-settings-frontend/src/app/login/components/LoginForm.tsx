"use client";

import Form from "@/components/Form";
import FormInput from "@/components/FormInput";
import FormSubmitButton from "@/components/FormSubmitButton";
import { useFormState } from "react-dom";
import { login } from "../actions";

export default function LoginForm() {
  const [state, formAction] = useFormState(login, {
    errors: {},
  });

  return (
    <Form centered formAction={formAction} errors={state.errors.formErrors}>
      <FormInput
        label="Username"
        name="username"
        type="text"
        placeholder="John Doe"
        errors={state.errors.fieldErrors?.username}
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        placeholder="********"
        errors={state.errors.fieldErrors?.password}
      />
      <FormSubmitButton title="Login" />
    </Form>
  );
}
