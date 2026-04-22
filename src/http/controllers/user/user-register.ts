import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositorie.js";
import { RegisterUseCase } from "@/use-cases/register.js";
import type { Request, Response } from "express";
import z from "zod";

export class UserController {
  private registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = this.registerBodySchema.parse(req.body);

      const usersRepository = new PrismaUsersRepository();
      const registerUseCase = new RegisterUseCase(usersRepository);

      const user = await registerUseCase.execute({ name, email, password });

      return res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(409).json({ error: error.message });
      }

      return res.status(409).json({ error: "Unknown error" });
    }
  }
}
