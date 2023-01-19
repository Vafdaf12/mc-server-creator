import got from "got";

import { URL_MANIFEST } from "../util/constants";

import {
    MCVersionSummary,
    ReleaseType,
    MCVersion,
    MCVersionManifest
} from "../types";

class VersionManifest {
    private versions: MCVersionSummary[] = [];
    public latestRelease: string = "";
    public latestSnapshot: string = "";

    get all() {
        return this.versions.map(v => v.id);
    }

    get releaseTypes() {
        return Object.values(ReleaseType);
    }

    byId(id: string): MCVersionSummary | undefined {
        return this.versions.find(v => v.id === id);
    }

    byRelease(release: ReleaseType): string[] {
        return this.versions.filter(v => v.type === release).map(v => v.id);
    }

    async fetchAll() {
        const json: MCVersionManifest = await got.get(URL_MANIFEST).json();

        this.latestRelease = json.latest.release;
        this.latestSnapshot = json.latest.snapshot;
        this.versions = json.versions;
    }

    async fetchInfo(id: string): Promise<MCVersion | undefined> {
        const v = this.byId(id);
        if (!v) return;

        const data: MCVersion = await got(v.url).json();

        return data;
    }
}

export default new VersionManifest();
