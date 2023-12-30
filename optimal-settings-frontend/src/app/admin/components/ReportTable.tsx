"use client";

import { Report } from "@/app/games/[slug]/types/report";
import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableCell from "@/components/TableCell";
import TableRow from "@/components/TableRow";
import { deleteReport } from "../actions";

type ReportTable = {
  reports: Report[];
};

export default function ReportTable({ reports }: ReportTable) {
  return (
    <Table striped border="border" textAlignment="center">
      <TableBody>
        <TableRow>
          <TableCell type="th">ID</TableCell>
          <TableCell type="th">Username</TableCell>
          <TableCell type="th">Operating System</TableCell>
          <TableCell type="th">Operating System Version</TableCell>
          <TableCell type="th">Kernel Version</TableCell>
          <TableCell type="th">Processor</TableCell>
          <TableCell type="th">Graphics Card</TableCell>
          <TableCell type="th">Random Access Memory</TableCell>
          <TableCell type="th">Average Frames Per Second</TableCell>
          <TableCell type="th">Resolution</TableCell>
          <TableCell type="th">Comments</TableCell>
          <TableCell type="th">Created At</TableCell>
          <TableCell type="th">Captcha token</TableCell>
          <TableCell type="th">Actions</TableCell>
        </TableRow>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell type="th">{report.id}</TableCell>
            <TableCell>{report.username || "Anonymous"}</TableCell>
            <TableCell>{report.operatingSystem}</TableCell>
            <TableCell>{report.operatingSystemVersion}</TableCell>
            <TableCell>{report.kernelVersion || "N/A"}</TableCell>
            <TableCell>{report.processor}</TableCell>
            <TableCell>{report.graphicsCard}</TableCell>
            <TableCell>{report.randomAccessMemory}</TableCell>
            <TableCell>{report.averageFramesPerSecond}</TableCell>
            <TableCell>
              {report.resolutionWidth}x{report.resolutionHeight}
            </TableCell>
            <TableCell>{report.comments || "N/A"}</TableCell>
            <TableCell>
              <time suppressHydrationWarning>
                {new Date(report.createdAt).toLocaleString()}
              </time>
            </TableCell>
            <TableCell>{report.captchaToken}</TableCell>
            <TableCell>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  if (report.id !== undefined) {
                    deleteReport(report.id);
                  }
                }}
              >
                Remove
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
