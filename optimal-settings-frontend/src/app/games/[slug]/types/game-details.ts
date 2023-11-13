export type GameDetails = {
  id: string;
  name: string;
  slug: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  settings: {
    high?: {
      [key: string]: string;
    };
    medium?: {
      [key: string]: string;
    };
    low?: {
      [key: string]: string;
    };
    additionalInformations?: string;
  };
  settingsSources: {
    low?: string;
    medium?: string;
    high?: string;
  };
};
