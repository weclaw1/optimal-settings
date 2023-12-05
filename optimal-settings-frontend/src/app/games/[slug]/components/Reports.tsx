import ReportForm from "./ReportForm";
import ReportCardList from "./ReportCardList";
import { Report, SettingsType } from "../types/report";

type Reports = {
  reports: Report[];
  gameId: number;
  gameSlug: string;
  settingsType: SettingsType;
};

export default function Reports({
  reports,
  gameId,
  gameSlug,
  settingsType,
}: Reports) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="text-2xl font-bold">
        Reports for {settingsType.toLowerCase()} settings
      </h2>
      <ReportCardList
        reports={reports.filter(
          (report) => report.settingsType === settingsType,
        )}
      />
      <h2 className="text-2xl font-bold">
        Submit a new report for this game on {settingsType.toLowerCase()}{" "}
        settings
      </h2>
      <ReportForm
        gameId={gameId}
        gameSlug={gameSlug}
        settingsType={settingsType}
      />
    </div>
  );
}
