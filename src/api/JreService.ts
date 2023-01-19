import got from "got";
import { Adoptium } from "../types";
import { URL_ADOPTIUM } from "../util/constants";

/**
 * Fetches a download URL of a JRE/JDK (if available)
 * for the host system, using Adoptium as the service.
 * @param version The required major version of the JRE
 */
async function adoptium(majorVersion: number): Promise<string | undefined> {

    const params = {
        os: process.platform,
        architecture: process.arch,
        version: majorVersion
    };

    const data: Adoptium[] = await got(URL_ADOPTIUM, {
        searchParams: params
    }).json();

    const jre =
        data.find(v => v.binary.image_type == "jre") ||
        data.find(v => v.binary.image_type = "jdk");

    if (!jre) return;

    return jre.binary.package.link;
}

export default {
    fetchDownloadUrl: adoptium
}
