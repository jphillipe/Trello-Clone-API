import { prisma } from "@/lib/prisma.js";
import { Prisma } from "@prisma/client";
import type { IUsersRepository } from "../IUsersRepositorie.js";

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}
