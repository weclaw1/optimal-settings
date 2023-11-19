import ReportForm from "./ReportForm";
import ReportCardList from "./ReportCardList";
import { Report } from "../types/report";

type ReportsProps = {
  reports: Report[];
  gameId: string;
  gameSlug: string;
  settingsType: "low" | "medium" | "high";
};

export default function Reports({
  reports,
  gameId,
  gameSlug,
  settingsType,
}: ReportsProps) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="text-2xl font-bold">
        Reports for {settingsType} settings
      </h2>
      <ReportCardList reports={reports} />
      <h2 className="text-2xl font-bold">
        Submit a new report for this game on {settingsType} settings
      </h2>
      <ReportForm
        gameId={gameId}
        gameSlug={gameSlug}
        settingsType={settingsType}
      />
    </div>
  );
}
