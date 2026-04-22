// src/repositories/IUsersRepository.ts
import { Prisma, type User } from "@prisma/client";

export interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
}
