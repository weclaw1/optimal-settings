import { SettingsType } from "./report";

export type ReportFormState = {
  gameId: number;
  gameSlug: string;
  settingsType: SettingsType;
  errors: {
    formErrors?: string[];
    fieldErrors?: {
      [key: string]: string[];
    };
  };
};
