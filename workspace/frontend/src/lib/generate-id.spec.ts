import { generateId } from "./generate-id";
import { describe, it, expect } from "vitest";

describe("id generator", () => {
    it("generates ids with a specified length", () => {
        expect(generateId(12)).toHaveLength(12);
    });
});