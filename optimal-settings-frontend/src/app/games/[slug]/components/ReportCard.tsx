import Card from "@/components/Card";
import { OperatingSystem, Report } from "../types/report";

type ReportProps = {
  report: Report;
};

export default function Report({ report }: ReportProps) {
  const operatingSystemVersionLabel: Record<OperatingSystem, string> = {
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
  };
  return (
    <Card cardType="compact" bordered>
      <div className="flex flex-col w-full xl:flex-row">
        <div className="break-all basis-1/2 2xl:basis-3/5 bg-base-300 rounded-box">
          <div className="flex flex-col gap-4 p-4">
            <span>
              <span className="text-accent">Username: </span>
              {report.username || "Anonymous"}
            </span>
            <span>
              <span className="text-accent">Average FPS: </span>
              {report.fps}
            </span>
            {report.comments && (
              <span>
                <span className="text-accent">Comment: </span>
                {report.comments}
              </span>
            )}
          </div>
        </div>
        <div className="divider xl:divider-horizontal" />
        <div className="break-all basis-1/2 2xl:basis-2/5 bg-base-300 rounded-box">
          <div className="flex flex-col gap-4 p-4">
            <span>
              <span className="text-accent">Operating system: </span>
              {operatingSystemVersionLabel[report.operatingSystem]}
            </span>
            <span>
              <span className="text-accent">Operating system version: </span>
              {report.operatingSystemVersion}
            </span>
            {report.kernelVersion && (
              <span>
                <span className="text-accent">Kernel version: </span>
                {report.kernelVersion}
              </span>
            )}
            <span>
              <span className="text-accent">Resolution: </span>
              {report.resolution}
            </span>
            <span>
              <span className="text-accent">CPU: </span>
              {report.cpu}
            </span>
            <span>
              <span className="text-accent">GPU: </span>
              {report.gpu}
            </span>
            <span>
              <span className="text-accent">RAM: </span>
              {report.ram}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
