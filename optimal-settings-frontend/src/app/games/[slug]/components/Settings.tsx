import TabSwitcher from "@/components/TabSwitcher";
import Collapse from "@/components/Collapse";
import SettingsTable from "./SettingsTable";
import { GameDetails } from "../types/game-details";

type SettingsProps = {
  gameDetails: GameDetails;
};

export default function Settings({ gameDetails }: SettingsProps) {
  let tabs = [];

  if (gameDetails.settings.low) {
    tabs.push({
      label: "Low",
      content: (
        <>
          <SettingsTable settings={Object.entries(gameDetails.settings.low)} />
          {gameDetails.settingsSources.low && (
            <Collapse label="Sources" icon="arrow">
              <p>{gameDetails.settingsSources.low}</p>
            </Collapse>
          )}
        </>
      ),
    });
  }
  if (gameDetails.settings.medium) {
    tabs.push({
      label: "Medium",
      content: (
        <>
          <SettingsTable
            settings={Object.entries(gameDetails.settings.medium)}
          />
          {gameDetails.settingsSources.medium && (
            <Collapse label="Sources" icon="arrow">
              <p>{gameDetails.settingsSources.medium}</p>
            </Collapse>
          )}
        </>
      ),
    });
  }
  if (gameDetails.settings.high) {
    tabs.push({
      label: "High",
      content: (
        <>
          <SettingsTable settings={Object.entries(gameDetails.settings.high)} />
          {gameDetails.settingsSources.high && (
            <Collapse label="Sources" icon="arrow">
              <p>{gameDetails.settingsSources.high}</p>
            </Collapse>
          )}
        </>
      ),
    });
  }
  return (
    <div className="m-4 flex flex-col gap-4">
      <TabSwitcher type="boxed" tabs={tabs} />
      {gameDetails.settings.additionalInformations && (
        <Collapse label="Additional Informations" icon="arrow">
          <p>{gameDetails.settings.additionalInformations}</p>
        </Collapse>
      )}
    </div>
  );
}
