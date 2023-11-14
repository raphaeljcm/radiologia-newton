import { Request, Response } from "express";
import { queryDatabase } from "../db";

const INTERNAL_SERVER_ERROR_MESSAGE = "Internal Server ERROR! Contact the admin.";
const USER_NOT_FOUND_ERROR_MESSAGE = "User not found!";

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await queryDatabase("SELECT * FROM users u WHERE u.id = ?", [
      id,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ error: USER_NOT_FOUND_ERROR_MESSAGE });
    }

    res.status(200).json(createResponse(user));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

function createResponse(user: any) {
  const response = {
    id: user[0].id,
    name: user[0].name,
    ra: user[0].ra,
    email: user[0].email,
    user_type_id: user[0].user_type_id,
    image: user[0].image,
    created_at: user[0].created_at,
    last_access: user[0].last_access,
  };

  return response;
}
