export type ReportFormState = {
  gameId: string;
  gameSlug: string;
  settingsType: "low" | "medium" | "high";
  errors: {
    formErrors?: string[];
    fieldErrors?: {
      [key: string]: string[];
    };
  };
};
