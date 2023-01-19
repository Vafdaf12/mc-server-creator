import { Options, Params } from "cli-progress";
import kleur from "kleur";
import figures from "./figures";

const FLOAT_DECIMALS = 2;

export default {
    download: (options: Options, params: Params, payload: any): string => {
        const isComplete = params.value >= params.total;

        const prefix = isComplete ? kleur.green(figures.tick) : kleur.dim(figures.ellipsis);

        const value = (params.value / 1_000_000).toFixed(FLOAT_DECIMALS);
        const total = (params.total / 1_000_000).toFixed(FLOAT_DECIMALS);

        if (isComplete) {
            // Text for completed downloaded
            return `${prefix} ${kleur.bold(payload.label)}   ` + kleur.green(`Downloaded ${total} MB`);
        } else {
            return `${prefix} ${payload.label}   ${value} / ${total} MB`;
        }
    }
}
