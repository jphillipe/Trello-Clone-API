import type { Request, Response } from "express";
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositorie.js";
import { RegisterUseCase } from "@/use-cases/register.js";

export async function registerController(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string({ message: "O nome é obrigatório" }),
    email: z.email({ message: "E-mail inválido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  });

  try {
    const validatedData = registerBodySchema.parse(req.body);

    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const user = await registerUseCase.execute(validatedData);

    return res.status(201).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(409).json({ error: error.message });
    }

    return res.status(409).json({ error: "Unknown error" });
  }
}
