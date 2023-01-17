import { Choice } from "prompts";

export const choiceFromValue = (value: string): Choice => ({
    value,
    title: value
});
