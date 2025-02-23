import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.routes";
import { errorHandler } from "./middlewares/errorHandler";
import setupSwagger from "./swagger" 

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", taskRoutes);
setupSwagger(app);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;
