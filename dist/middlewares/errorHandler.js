"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const logger_1 = __importDefault(require("../config/logger"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({ errors: err.errors });
        return;
    }
    console.error("Internal Server Error:", err);
    logger_1.default.error(err.message, { stack: err.stack });
    res.status(500).json({ message: "Something went wrong, please try again later." });
};
exports.errorHandler = errorHandler;
