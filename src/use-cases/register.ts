import type { IUsersRepository } from "@/repositories/IUsersRepositorie.js";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({ name, email, password }: CreateUserRequest) {
    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });
    return user;
  }
}
