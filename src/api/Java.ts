import got from "got";
import { exec } from "child_process";
import { Installer, OpenJDK } from "../types/OpenJDK";

const URL_OPENJDK = "https://api.adoptium.net/v3/assets/latest/"
const javaURL = (version: number) => `${URL_OPENJDK}/${version}/hotspot`;

/**
 * Fetches a download URL for a JRE (if available)
 * for the host system. If a JRE was not found,
 * the equivalent JDK is returned.
 * @param version The required major version of the JRE
 */
async function fetchDownloadUrl(version: number): Promise<Installer | undefined> {

    let json = {
        os: process.platform,
        architecture: process.arch,
        version: version
    };

    let url = javaURL(version);
    let data: OpenJDK[] = await got(url, { searchParams: json }).json();

    let jre =
        data.find(v => v.binary.image_type == "jre") ||
        data.find(v => v.binary.image_type == "jdk"); // Fallback if JRE only is not found

    if (!jre) return;

    return jre.binary.package;
}

/**
 * Finds the verion of java as
 * returned by 'java -version'
 *
 * NOTE: I'm not sure if this is a perfectly cross-platform solution
 *
 * @returns The string version of java
 */
async function javaVersion(): Promise<string> {
    return new Promise((resolve, reject) => {
        exec("java -version", (err, _, stderr) => {
            if (err) reject(err.message);

            const res = stderr.match(/(["'])(?:(?=(\\?))\2.)*?\1/g);
            if (!res) {
                reject("no version found");
                return;
            }

            resolve(res[0].replace(/["']/g, ""));
        });
    });
}

/**
 * Gets the major version of java
 * installed on the system
 *
 * @returns The major version of java
 */
async function javaVersionMajor(): Promise<number> {
    return new Promise(async (resolve, reject) => {
        const res = javaVersion();
        res.catch(e => reject(e));

        const version = await res;

        const n = version.replace(/["']/g, "").split(".").map(parseInt);

        if (n[0] === 1) resolve(n[1]);
        else resolve(n[0]);
    });
}

export default {
    javaVersionMajor,
    fetchDownloadUrl
}
