import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  private getUserId = (request: Request): string => {
    const { user_id } = request.headers;
    return Array.isArray(user_id) ? user_id[0] : user_id;
  };

  handle(request: Request, response: Response): Response {
    try {
      const user_id = this.getUserId(request);
      const allUsers = this.listAllUsersUseCase.execute({
        user_id,
      });
      return response.json(allUsers);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ListAllUsersController };
