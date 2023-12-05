import { z } from "zod";
import { GameImage } from "./game-image";
import { GameSettings } from "./game-settings";
import { GameSettingsSources } from "./game-settings-sources";

export const Game = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  slug: z.string(),
  image: GameImage,
  settings: GameSettings,
  settingsSources: GameSettingsSources,
});

export type Game = z.infer<typeof Game>;
