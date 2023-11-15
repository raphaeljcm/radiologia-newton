import { Request, Response } from "express";
import { queryDatabase } from "../db";
import { User } from "./User";
import * as messages from "./messages";

type UserResponse = Omit<User, "password">;

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await queryDatabase("SELECT * FROM users u WHERE u.id = ?", [id]);

    if (user.length === 0) {
      return res.status(404).json({ error: messages.USER_NOT_FOUND_ERROR_MESSAGE });
    }

    const response = createUserResponse(user[0] as User);
    
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: messages.INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

function createUserResponse(user: User) {
  return {
    id: user.id,
    name: user.name,
    ra: user.ra,
    email: user.email,
    user_type_id: user.user_type_id,
    image: user.image,
    created_at: user.created_at,
    last_access: user.last_access,
  } as UserResponse;
}