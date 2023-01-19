import { Options, Params } from "cli-progress";
import kleur from "kleur";
import figures from "./figures";

const FLOAT_DECIMALS = 2;
const THRESHOLD_MB = 1e6;

export default {
    download: (options: Options, params: Params, payload: any): string => {
        const isComplete = params.value >= params.total;

        const prefix = isComplete ? kleur.green(figures.tick) : kleur.dim(figures.ellipsis);

        const suffix = params.total <= THRESHOLD_MB ? 'kB' : 'MB';

        const divFactor = params.total <= THRESHOLD_MB ? 1e3 : 1e6;

        const value = (params.value / divFactor).toFixed(FLOAT_DECIMALS);
        const total = (params.total / divFactor).toFixed(FLOAT_DECIMALS);

        if (isComplete) {
            // Text for completed downloaded
            return `${prefix} ${kleur.bold(payload.label)}   ` + kleur.green(`Downloaded ${total} ${suffix}`);
        } else {
            return `${prefix} ${payload.label}   ${value} / ${total} ${suffix}`;
        }
    }
}
