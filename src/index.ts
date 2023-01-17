import VersionManifest from "./api/VersionManifest";

import prompts, { Choice } from "prompts";

import { ReleaseType } from "./types";
import { choiceFromValue } from "./utils";

const TEMPLATES: Choice[] = [
    choiceFromValue("vanilla"),
    choiceFromValue("fabric")
];

async function main() {
    await VersionManifest.fetchAll();

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
