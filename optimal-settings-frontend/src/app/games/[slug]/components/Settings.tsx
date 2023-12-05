import TabSwitcher from "@/components/TabSwitcher";
import Collapse from "@/components/Collapse";
import SettingsTable from "./SettingsTable";
import Reports from "./Reports";
import { Report, SettingsType } from "../types/report";
import { Game } from "../../types/game";

type Settings = {
  game: Game;
  reports: Report[];
};

export default function Settings({ game, reports }: Settings) {
  const generateTabContent = (type: SettingsType) => {
    let settings =
      game.settings[type.toLowerCase() as keyof typeof game.settings];
    if (settings === undefined || typeof settings === "string") {
      settings = [];
    }
    return (
      <div className="flex flex-col md:flex-row gap-1">
        <div className="flex flex-col basis-1/2 gap-4">
          <SettingsTable settings={settings} />
          {game.settingsSources[
            type.toLowerCase() as keyof typeof game.settingsSources
          ] && (
            <Collapse label="Sources" icon="arrow">
              <p className="break-all">
                {
                  game.settingsSources[
                    type.toLowerCase() as keyof typeof game.settingsSources
                  ]
                }
              </p>
            </Collapse>
          )}
          {game.settings.additionalInformations && (
            <Collapse label="Additional Informations" icon="arrow">
              <p className="break-all">
                {game.settings.additionalInformations}
              </p>
            </Collapse>
          )}
        </div>
        <div className="divider divider-neutral md:divider-horizontal" />
        <div className="basis-1/2">
          <Reports
            reports={reports}
            gameId={game.id}
            gameSlug={game.slug}
            settingsType={type}
          />
        </div>
      </div>
    );
  };

  const tabs = Object.values(SettingsType.Values)
    .filter((type: SettingsType) =>
      game.settings.hasOwnProperty(type.toLowerCase()),
    )
    .map((type: SettingsType) => ({
      label: type,
      content: generateTabContent(type),
    }));

  return (
    <div className="flex flex-col gap-4">
      <TabSwitcher type="boxed" tabs={tabs} />
    </div>
  );
}
