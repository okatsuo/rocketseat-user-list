import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  private isAdmin = (user?: User) => user?.admin === true;

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);

    if (!this.isAdmin(user)) {
      throw new Error("Você não tem permissão para fazer isso.");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
