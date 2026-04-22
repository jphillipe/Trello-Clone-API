import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositorie.js";
import { RegisterUseCase } from "@/use-cases/register.js";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  try {
    const validatedData = registerBodySchema.parse(req.body);

    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const user = await registerUseCase.execute(validatedData);

    return res.status(201).json(user);
  } catch (error: unknown) {
    return next(error);
  }
}
