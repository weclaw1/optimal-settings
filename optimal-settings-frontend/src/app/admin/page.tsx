import { cookies } from "next/headers";
import ReportTable from "./components/ReportTable";
import { Report } from "@/app/games/[slug]/types/report";
import camelcaseKeys from "camelcase-keys";

async function getReports(): Promise<Report[]> {
  const res = await fetch(`${process.env.BACKEND_URL}/reports`, {
    headers: {
      Authorization: `Bearer ${cookies().get("token")}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const reports = await res.json();
  const parsedReports = Report.array().parse(
    camelcaseKeys(reports, { deep: true }),
  );

  return parsedReports;
}

export default async function AdminPanel() {
  const reports = await getReports();
  return <ReportTable reports={reports} />;
}
