import { SettingsType } from "./report";

export type ReportFormState = {
  gameId: number;
  gameSlug: string;
  errors: {
    formErrors?: string[];
    fieldErrors?: {
      [key: string]: string[];
    };
  };
};
