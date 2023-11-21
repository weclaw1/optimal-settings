export type OperatingSystem = "windows" | "macos" | "linux";

export type Report = {
  id: string;
  username?: string;
  operatingSystem: OperatingSystem;
  operatingSystemVersion: string;
  kernelVersion?: string;
  processor: string;
  graphicsCard: string;
  randomAccessMemory: string;
  averageFramesPerSecond: number;
  resolution: string;
  comments?: string;
};
