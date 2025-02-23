import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import logger from "../config/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({ errors: err.errors });
    return;
  }

  console.error("Internal Server Error:", err);
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ message: "Something went wrong, please try again later." });
};
