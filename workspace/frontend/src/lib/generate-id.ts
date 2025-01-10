import { IDType } from "../models/Todo";

const START_CHAR_CODE = 'a'.charCodeAt(0);
const ALPHABET_LENGTH = 26;

/**
 * Generates a pseudorandom ID.
 * @param length How many characters the ID should consist of
 * @returns the ID
 */
export function generateId(length: number): IDType {
    let codes: number[] = [];

    for (let i = 0; i < length; i++) {
        codes.push(START_CHAR_CODE + Math.floor(Math.random() * ALPHABET_LENGTH))
    }

    return String.fromCharCode(...codes);
}
