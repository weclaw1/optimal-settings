import TabSwitcher from "@/components/TabSwitcher";
import Collapse from "@/components/Collapse";
import SettingsTable from "./SettingsTable";
import Reports from "./Reports";
import { GameDetails } from "../types/game-details";
import reportList from "../data/reports.json";
import { Report } from "../types/report";

type SettingsProps = {
  gameDetails: GameDetails;
};

export default function Settings({ gameDetails }: SettingsProps) {
  const settingsTypes: Array<"low" | "medium" | "high"> = [
    "low",
    "medium",
    "high",
  ];

  const generateTabContent = (type: "low" | "medium" | "high") => (
    <div className="flex flex-col md:flex-row gap-1">
      <div className="flex flex-col basis-1/2 gap-4">
        <SettingsTable
          settings={Object.entries(gameDetails.settings[type] || {})}
        />
        {gameDetails.settingsSources[type] && (
          <Collapse label="Sources" icon="arrow">
            <p className="break-all">{gameDetails.settingsSources[type]}</p>
          </Collapse>
        )}
        {gameDetails.settings.additionalInformations && (
          <Collapse label="Additional Informations" icon="arrow">
            <p className="break-all">
              {gameDetails.settings.additionalInformations}
            </p>
          </Collapse>
        )}
      </div>
      <div className="divider divider-neutral md:divider-horizontal" />
      <div className="basis-1/2">
        <Reports
          reports={reportList as Report[]}
          gameId={gameDetails.id}
          gameSlug={gameDetails.slug}
          settingsType={type}
        />
      </div>
    </div>
  );

  const tabs = settingsTypes
    .filter((type) => gameDetails.settings.hasOwnProperty(type))
    .map((type) => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      content: generateTabContent(type),
    }));

  return (
    <div className="flex flex-col gap-4">
      <TabSwitcher type="boxed" tabs={tabs} />
    </div>
  );
}
