// Set up two way mapping of bytes to hex representation
// Used later in lookups for creating hex strings from byte arrays
const BYTE_TO_STR: Map<number, string> = new Map();
const STR_TO_BYTE: Map<string, number> = new Map();

function generateByteMaps() {
    for (let n = 0; n <= 0xff; n++) {
        const str = n.toString(16).padStart(2, "0")
        BYTE_TO_STR.set(n, str);
        STR_TO_BYTE.set(str, n);
    }
}

generateByteMaps();

/**
 * Converts plaintext into a hex hash string
 * @param input Input string
 * @returns The hashed string as hex string
 */
export async function hashString(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hash = await window.crypto.subtle.digest("SHA-256", data);
    return bufferToHexStr(hash);
}

/**
 * Compares a hash and a plaintext.
 * @param input Input string
 * @param hash Hashed string
 * @returns If the input matches the hash
 */
export async function verifyHash(input: string, hash: string): Promise<boolean> {
    const hashedInput = await hashString(input);

    return hashedInput === hash;
}

export function bufferToHexStr(arrayBuffer: ArrayBuffer): string {
    const buffer = new Uint8Array(arrayBuffer);
    const hex = new Array<string>(buffer.length);

    for (let i = 0; i < buffer.length; i++) {
        hex[i] = BYTE_TO_STR.get(buffer[i])!;
    }

    return hex.join("");
}

export function hexStrToBuffer(input: string): ArrayBuffer {
    if (input.length % 2 !== 0) {
        throw new Error("Invalid hex string!");
    }

    const buffer = new Uint8Array(input.length / 2);
    for (let i = 0; i < input.length; i += 2) {
        const octetStr = input[i] + input[i + 1];
        buffer[i / 2] = STR_TO_BYTE.get(octetStr)!;
    }

    return buffer;
}
