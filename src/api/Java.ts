import { exec } from "child_process";

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
    javaVersionMajor
}
