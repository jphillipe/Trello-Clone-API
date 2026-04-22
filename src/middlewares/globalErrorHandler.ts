import type { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";
import { env } from "../env.js";

export function globalErrorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error.",
      issues: z.treeifyError(error),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error("🔥 Erro capturado:", error);
  }

  void req;
  void next;

  return res.status(500).json({ message: "Internal server error." });
}
