import { Request, Response } from "express";
import { queryDatabase } from "../db";

const INTERNAL_SERVER_ERROR_MESSAGE = "Internal Server ERROR! Contact the admin.";
const USER_NOT_FOUND_ERROR_MESSAGE = "User not found!";

type UserResponse = {
  id: number;
  name: string;
  ra: string;
  email: string;
  user_type_id: number;
  image: string;
  created_at: Date;
  last_access: Date;
};

type User = {
  id: number;
  name: string;
  password: string;
  ra: string;
  email: string;
  user_type_id: number;
  image: string;
  created_at: Date;
  last_access: Date;
};


export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await queryDatabase("SELECT * FROM users u WHERE u.id = ?", [
      id,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ error: USER_NOT_FOUND_ERROR_MESSAGE });
    }

    const foundUser = user[0] as User;

    res.status(200).json(createResponse(foundUser));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

function createResponse(user: User) : UserResponse {
  const response: UserResponse = {
    id: user.id,
    name: user.name,
    ra: user.ra,
    email: user.email,
    user_type_id: user.user_type_id,
    image: user.image,
    created_at: user.created_at,
    last_access: user.last_access,
  };

  return response;
}