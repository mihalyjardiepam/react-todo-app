const byteArray: string[] = []

function generateByteArray() {
    for (let n = 0; n <= 0xff; n++) {
        byteArray.push(
            n.toString(16).padStart(2, "0")
        );
    }
}

generateByteArray();

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
        hex[i] = byteArray[buffer[i]];
    }

    return hex.join("");
}

export function hexStrToBuffer(input: string): ArrayBuffer {
    if (input.length % 2 !== 0) {
        throw new Error("Invalid hex string!");
    }

    const buffer = new Uint8Array(input.length / 2);
    for (let i = 0; i < input.length; i += 2) {
        // could be sped up with binary search
        const octetStr = input[i] + input[i + 1];
        buffer[i / 2] = byteArray.findIndex(el => el == octetStr);
    }

    return buffer;
}
