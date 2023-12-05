import ReportCard from "./ReportCard";
import { Report } from "../types/report";

type ReportCardList = {
  reports: Report[];
};

export default function ReportCardList({ reports }: ReportCardList) {
  if (reports.length === 0) {
    return (
      <p className="text-xl text-info">
        There are no reports for these settings yet. You can create one below!
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-4 w-full">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
