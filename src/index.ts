import VersionManifest from "./api/VersionManifest";

import prompts, { Choice } from "prompts";
import { SingleBar } from "cli-progress";

import { ReleaseType } from "./types";
import { choiceFromValue } from "./utils";
import format from "./util/format";

import fs from "fs";
import got from "got";
import { pipeline } from "stream/promises";

const TEMPLATES: Choice[] = ["vanilla", "fabric"].map(choiceFromValue);

/**
 * Displays a progress message while downloading a file from
 * the given URL
 * @param url The URL to download from
 * @param path The file to download to
 * @param downloadLabel The label given to the progress bar while downloading
 */
async function downloadFile(url: string, path: fs.PathLike, downloadLabel: string) {
    const urlStream = got.stream.get(url);
    const fileStream = fs.createWriteStream(path);

    const bar = new SingleBar({
        hideCursor: null,
        stopOnComplete: true,
        gracefulExit: true,
        format: format.download
    });
    bar.start(0, urlStream.downloadProgress.total || 0, {
        label: downloadLabel
    });


    urlStream.on("downloadProgress", ({ transferred, total }) => {
        bar.setTotal(total);
        bar.update(transferred);
    });

    await pipeline(urlStream, fileStream);
}

async function main() {
    VersionManifest.fetchAll();

    const response = await prompts([
        {
            type: "text",
            name: "title",
            message: "Server Name",
            initial: "Minecraft Server"
        },
        {
            type: "select",
            name: "type",
            message: "Release Type",
            choices: VersionManifest.releaseTypes.map(choiceFromValue)
        },
        {
            type: "autocomplete",
            name: "id",
            message: "Minecraft Version",
            choices: (prev: ReleaseType) => VersionManifest.byRelease(prev).map(choiceFromValue)
        },
        {
            type: "select",
            name: "template",
            message: "Select a mod loader",
            choices: TEMPLATES
        },
        {
            type: "confirm",
            name: "agree",
            hint: "This is required to run the server",
            message: "Agree to Minecraft's EULA?",
        }
    ],
        {
            onCancel: () => {
                throw "Operation cancelled";
            }

        });

    console.log(response);
}

main()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
