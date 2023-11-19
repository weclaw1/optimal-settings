export type OperatingSystem = "windows" | "macos" | "linux";

export type Report = {
  id: string;
  username?: string;
  operatingSystem: OperatingSystem;
  operatingSystemVersion: string;
  kernelVersion?: string;
  cpu: string;
  gpu: string;
  ram: string;
  fps: number;
  resolution: string;
  comments?: string;
};
