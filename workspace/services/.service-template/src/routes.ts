import { trace } from "@opentelemetry/api";
import { Router } from "express";

const tracer = trace.getTracer('service', '0.1.0');

export const router = Router();
router.get("/", (req, res) => {
    res.status(200).json({
        status: "OK"
    });
})
