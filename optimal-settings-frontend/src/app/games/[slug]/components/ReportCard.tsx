import Card from "@/components/Card";
import { Report } from "../types/report";

type ReportCard = {
  report: Report;
};

export default function ReportCard({ report }: ReportCard) {
  return (
    <Card cardType="compact" bordered>
      <div className="flex flex-col w-full xl:flex-row">
        <div className="break-all basis-1/2 bg-base-300 rounded-box">
          <div className="flex flex-col gap-4 p-4">
            <span>
              <span className="text-accent">Username: </span>
              {report.username || "Anonymous"}
            </span>
            <span>
              <span className="text-accent">Average FPS: </span>
              {report.averageFramesPerSecond}
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
        <div className="break-all basis-1/2 bg-base-300 rounded-box">
          <div className="flex flex-col gap-4 p-4">
            <span>
              <span className="text-accent">Operating system: </span>
              {report.operatingSystem}
            </span>
            <span>
              <span className="text-accent">OS version: </span>
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
              {report.resolutionWidth}x{report.resolutionHeight}
            </span>
            <span>
              <span className="text-accent">CPU: </span>
              {report.processor}
            </span>
            <span>
              <span className="text-accent">GPU: </span>
              {report.graphicsCard}
            </span>
            <span>
              <span className="text-accent">RAM: </span>
              {report.randomAccessMemory}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
