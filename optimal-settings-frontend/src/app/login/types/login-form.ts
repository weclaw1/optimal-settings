export type LoginFormState = {
  token?: string;
  errors: {
    formErrors?: string[];
    fieldErrors?: {
      [key: string]: string[];
    };
  };
};
