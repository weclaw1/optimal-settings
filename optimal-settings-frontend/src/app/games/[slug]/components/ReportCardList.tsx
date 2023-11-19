import ReportCard from "./ReportCard";
import { Report } from "../types/report";

type ReportCardListProps = {
  reports: Report[];
};

export default function ReportCardList({ reports }: ReportCardListProps) {
  return (
    <div className="flex flex-col gap-4 mx-auto">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
