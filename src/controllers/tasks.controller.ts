import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { taskSchema, taskIdSchema } from "../utils/validation";
import { ZodError } from "zod";


 export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};
 
export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = taskSchema.parse(req.body);
    const newTask = await prisma.task.create({ data: validatedData });
    res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      next(error);
    }
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = taskIdSchema.parse(req.params);
    const validatedData = taskSchema.partial().parse(req.body);
     
    

    if (validatedData.title !== undefined && validatedData.title.trim() === "") {
      res.status(400).json({ error: "Title is required" });
    }

    const task = await prisma.task.findFirst({where: { id: Number(id) }});
    if (!task){
      res.status(404).json({ error: 'Task not found.' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: validatedData,
    });

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = taskIdSchema.parse(req.params);
    
    await prisma.task.delete({ where: { id: Number(id) } });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
