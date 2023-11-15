import { Request, Response } from 'express';
import { queryDatabase } from '../db';
import { hash } from 'bcrypt';
import { uploadImage } from './uploadImgBB';
import { UserType } from './UserType';
import { Fields } from './Fields';
import * as messages from "./messages";

export async function register(req: Request, res: Response) {
  const { name, password, ra, email, image } = req.body as Fields;

  try {
    const errorMessage = validateFields(name, password, ra, email, image);
    if (errorMessage) return res.status(400).json({ error: errorMessage });

    const raExists = await validateRAExists(ra);
    if (raExists)
      return res.status(400).json({ error: messages.EXISTING_RA_ERROR_MESSAGE });

    const emailExists = await validateEmailExists(email);
    if (emailExists)
      return res.status(400).json({ error: messages.EXISTING_EMAIL_ERROR_MESSAGE });

    const passwordHash = await encryptPassword(password);
    const imageUrl = await uploadImageToImgBB(image);

    create(name, passwordHash, ra, email, imageUrl);

    res.status(201).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: messages.INTERNAL_SERVER_ERROR_MESSAGE });
  }
}

function validateFields(
  name: string,
  password: string,
  ra: string | null,
  email: string,
  image: string | null,
) {
  const error = validateUndefinedFields(name, password, ra, email, image);
  if (error) return error;

  const nullErrorMessage = validateNullFields(name, password, email);
  if (nullErrorMessage) return nullErrorMessage;

  const fieldLengthErrorMessage = validateFieldLengths(name, ra, password, email);
  if (fieldLengthErrorMessage) return fieldLengthErrorMessage;

  return null;
}

function validateUndefinedFields(
  name: string,
  password: string,
  ra: string | null,
  email: string,
  image: string | null,
): string | null {
  const undefinedFields = [];
  if (name === undefined) undefinedFields.push('name');
  if (password === undefined) undefinedFields.push('password');
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

function validateNullFields(
  name: string,
  password: string,
  email: string,
): string | null {
  const nullFields = [];
  if (name === null) nullFields.push('name');
  if (password === null) nullFields.push('password');
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

function validateFieldLengths(
  name: string,
  ra: string | null,
  password: string,
  email: string,
) {
  if (name.length > messages.USER_NAME_MAX_LENGTH) {
    return messages.BIG_NAME_ERROR_MESSAGE;
  }

  if (ra !== null && ra.length !== messages.RA_LENGTH) {
    return messages.WRONG_RA_SIZE_ERROR_MESSAGE;
  }

  if (password.length < messages.MIN_PASSWORD_LENGTH) {
    return messages.WRONG_PASSWORD_SIZE_ERROR_MESSAGE;
  }

  if (email.length === 0) {
    return messages.INVALID_EMAIL_ERROR_MESSAGE;
  }


  return null;
}

export async function validateRAExists(ra: string | null) {
  if (!ra) return false;

  const foundRA = await queryDatabase('SELECT * FROM users u WHERE u.ra = ?', [
    ra,
  ]);

  if (foundRA && foundRA.length > 0) {
    return true;
  }

  return false;
}

export async function validateEmailExists(email: string) {
  const foundEmail = await queryDatabase(
    'SELECT * FROM users u WHERE u.email = ?',
    [email],
  );

  if (foundEmail && foundEmail.length > 0) {
    return true;
  }

  return false;
}

async function create(
  name: string,
  password: string,
  ra: string | null,
  email: string,
  image: string | null,
): Promise<void> {
  await queryDatabase(
    `INSERT INTO users (name, password, ra, email, user_type_id, created_at, last_access, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, password, ra, email, UserType.DEFAULT, new Date(), null, image],
  );
}

async function encryptPassword(password: string) {
  return await hash(password, 8);
}

export async function uploadImageToImgBB(image: string | null) {
  const bufferedImage = bufferImage(image);
  return bufferedImage ? await uploadImage(bufferedImage) : null;
}

function bufferImage(image: string | null) {
  return image ? Buffer.from(image, 'base64') : null;
}
