
export interface MCVersionManifest {
  latest: LatestVersion;
  versions: MCVersionSummary[];
}

export interface LatestVersion {
  release: string;
  snapshot: string;
}

export interface MCVersionSummary {
  id: string;
  type: ReleaseType;
  url: string;
  time: string;
  releaseTime: string;
}

export enum ReleaseType {
  Snapshot = "snapshot",
  Release = "release",
  OldBeta = "old_beta",
  OldAlpha = "old_alpha",
}
