/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { bufferToHexStr, hashString, hexStrToBuffer, verifyHash } from "./cryptoUtils";

describe("hash util tests", () => {
    it("converts buffer to hex string properly", () => {
        const buffer = new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF,]);
        expect(bufferToHexStr(buffer)).toEqual("deadbeef")
    })

    it("converts hex string to buffer properly", () => {
        const hexStr = "baadc0de";
        expect(hexStrToBuffer(hexStr)).toEqual(new Uint8Array([0xBA, 0xAD, 0xC0, 0xDE]));
    });

    it("hashes passwords", async () => {
        // SHA 256 hash of "password"
        expect(await hashString("password"))
            .toEqual("5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8")
    });

    it("verifies correctly", async () => {
        // SHA 256 hash of "password"
        expect(await verifyHash(
            "password",
            "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
        )).toBeTruthy()
    })
})
