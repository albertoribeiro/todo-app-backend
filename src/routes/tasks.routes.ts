import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/tasks.controller";

const router = Router();

 
/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     description: Returns a list of all tasks.
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/tasks", getTasks);

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task with a title and an optional color.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task.
 *               color:
 *                 type: string
 *                 description: The color associated with the task.
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Task created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/tasks", createTask);

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     description: Updates an existing task. If the title field is provided, it must not be empty.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the task to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task.
 *               color:
 *                 type: string
 *                 description: The color associated with the task.
 *               completed:
 *                 type: boolean
 *                 description: The completion status of the task.
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/tasks/:id", updateTask);

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task based on the provided ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the task to delete.
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully.
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/tasks/:id", deleteTask);

export default router;
