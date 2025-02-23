"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const validation_1 = require("../utils/validation");
const getTasks = async (req, res, next) => {
    try {
        const tasks = await prisma_1.default.task.findMany({ orderBy: { createdAt: "desc" } });
        res.json(tasks);
    }
    catch (error) {
        next(error);
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res, next) => {
    try {
        const validatedData = validation_1.taskSchema.parse(req.body);
        const newTask = await prisma_1.default.task.create({ data: validatedData });
        res.status(201).json(newTask);
    }
    catch (error) {
        next(error);
    }
};
exports.createTask = createTask;
const updateTask = async (req, res, next) => {
    try {
        const { id } = validation_1.taskIdSchema.parse(req.params);
        const validatedData = validation_1.taskSchema.partial().parse(req.body);
        const updatedTask = await prisma_1.default.task.update({
            where: { id: Number(id) },
            data: validatedData,
        });
        res.json(updatedTask);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res, next) => {
    try {
        const { id } = validation_1.taskIdSchema.parse(req.params);
        await prisma_1.default.task.delete({ where: { id: Number(id) } });
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTask = deleteTask;
