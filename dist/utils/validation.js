"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskIdSchema = exports.taskSchema = void 0;
const zod_1 = require("zod");
exports.taskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").max(129, "Title too long"),
    color: zod_1.z.string().min(3, "Color is required"),
    completed: zod_1.z.boolean().optional(),
});
exports.taskIdSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, "Invalid ID"),
});
