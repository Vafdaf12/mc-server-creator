import { Choice } from "prompts";
import { EventEmitter } from "events";

export const choiceFromValue = (value: string): Choice => ({
    value,
    title: value
});

/**
 * An async way to wait for an event to be emitted
 * @param e The object that emits the event
 * @param ev The event to be emitted
 * @returns A promise of the payload of the event
 */
export async function waitForEvent<T = void>(emitter: EventEmitter, event: string): Promise<T> {
    return new Promise(resolve => emitter.once(event, resolve));
}
