import { Request, Response } from 'express';
import { queryDatabase } from '../db';
import * as messages from '../constants/messages';
import {
  validateRAExists,
  validateEmailExists,
  uploadImageToImgBB,
} from './register';
import { User, Fields } from '../types';

export const updateUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email, ra, image } = req.body as Fields;

  try {
    const user = await queryDatabase('SELECT * FROM users u WHERE u.id = ?', [
      id,
    ]);

    if (user.length === 0)
      res.status(404).json({ error: messages.USER_NOT_FOUND_ERROR_MESSAGE });

    const undefinedFields = validateFields(name, ra, email, image);
    if (undefinedFields)
      return res.status(400).json({ error: undefinedFields });

    const raExists = await validateRAExists(ra);
    if (raExists)
      return res
        .status(400)
        .json({ error: messages.EXISTING_RA_ERROR_MESSAGE });

    const emailExists = await validateEmailExists(email);
    if (emailExists)
      return res
        .status(400)
        .json({ error: messages.EXISTING_EMAIL_ERROR_MESSAGE });

    const imageUrl = await uploadImageToImgBB(image);
    update(id, name, ra, email, imageUrl);

    const updatedUser = await queryDatabase(
      'SELECT * FROM users u WHERE u.id = ?',
      [id],
    );

    res.status(200).json(createUserResponse(updatedUser[0]));
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: messages.INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

function validateFields(
  name: string,
  ra: string | null,
  email: string,
  image: string | null,
) {
  const error = validateUndefinedFields(name, ra, email, image);
  if (error) return error;

  const nullErrorMessage = validateNullFields(name, email);
  if (nullErrorMessage) return nullErrorMessage;

  const fieldLengthErrorMessage = validateFieldLengths(name, ra, email);
  if (fieldLengthErrorMessage) return fieldLengthErrorMessage;

  return null;
}

function validateUndefinedFields(
  name: string,
  ra: string | null,
  email: string,
  image: string | null,
): string | null {
  const undefinedFields = [];
  if (name === undefined) undefinedFields.push('name');
  if (ra === undefined) undefinedFields.push('ra');
  if (email === undefined) undefinedFields.push('email');
  if (image === undefined) undefinedFields.push('image');

  if (undefinedFields.length > 0) {
    const errorMessage =
      undefinedFields.length === 1
        ? `Field '${undefinedFields[0]}' is undefined.`
        : `Fields [${undefinedFields.join(', ')}] are undefined.`;

    return errorMessage;
  }

  return null;
}

function validateNullFields(name: string, email: string): string | null {
  const nullFields = [];
  if (name === null) nullFields.push('name');
  if (email === null) nullFields.push('email');

  if (nullFields.length > 0) {
    const errorMessage =
      nullFields.length === 1
        ? `Field '${nullFields[0]}' is mandatory.`
        : `Fields [${nullFields.join(', ')}] are mandatories.`;

    return errorMessage;
  }

  return null;
}

function validateFieldLengths(name: string, ra: string | null, email: string) {
  if (name.length > messages.USER_NAME_MAX_LENGTH)
    return messages.BIG_NAME_ERROR_MESSAGE;

  if (ra !== null && ra.length !== messages.RA_LENGTH)
    return messages.WRONG_RA_SIZE_ERROR_MESSAGE;

  if (email.length === 0) return messages.INVALID_EMAIL_ERROR_MESSAGE;

  return null;
}

async function update(
  id: string,
  name: string,
  ra: string | null,
  email: string,
  image: string | null,
): Promise<void> {
  await queryDatabase(
    `UPDATE users u SET u.name = ?, u.ra = ?, u.email = ?, u.image = ? WHERE u.id = ?`,
    [name, ra, email, image, Number.parseInt(id)],
  );
}

function createUserResponse(user: User) {
  return {
    id: user.id,
    name: user.name,
    ra: user.ra,
    email: user.email,
    user_type_id: user.user_type_id,
    image: user.image,
  };
}
