import { Options, Params } from "cli-progress";
import kleur from "kleur";
import figures from "./figures";

const FLOAT_DECIMALS = 2;
const THRESHOLD_MB = 1e6;

function formatByteCount(n: number, places: number = FLOAT_DECIMALS): string {
    const divFactor = n <= THRESHOLD_MB ? 1e3 : 1e6;
    const suffix = n <= THRESHOLD_MB ? 'kB' : 'MB';

    const amount = (n / divFactor).toFixed(places);
    return `${amount} ${suffix}`

}

export default {
    download: (options: Options, params: Params, payload: any): string => {
        const isComplete = params.value >= params.total;

        const prefix = isComplete ? kleur.green(figures.tick) : kleur.dim(figures.ellipsis);

        const value = formatByteCount(params.value);
        const total = formatByteCount(params.total);

        if (isComplete) {
            // Text for completed downloaded
            return `${prefix} ${kleur.bold(payload.label)}   ` + kleur.green(`Downloaded ${total}`);
        } else {
            return `${prefix} ${payload.label}   ${value} / ${total}`;
        }
    }
}
