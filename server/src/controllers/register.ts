import { Request, Response } from 'express';
import { queryDatabase } from '../db';
import { hash } from 'bcrypt';
import { uploadImage } from './uploadImgBB';

enum UserType {
  DEFAULT = 1,
  ADMIN,
}

const USER_NAME_MAX_LENGTH = 100;
const RA_LENGTH = 8;
const MIN_PASSWORD_LENGTH = 6;
const EXISTING_RA_ERROR_MESSAGE =
  'We already have an account associated with that RA.';
const EXISTING_EMAIL_ERROR_MESSAGE =
  'We already have an account associated with that email address.';
const BIG_NAME_ERROR_MESSAGE =
  'Please shorten your name to 100 characters or less.';
const WRONG_RA_SIZE_ERROR_MESSAGE = 'RA must be exactly 8 characters long.';
const WRONG_PASSWORD_SIZE_ERROR_MESSAGE =
  'Your password must be at least 6 characters long.';
const INTERNAL_SERVER_ERROR_MESSAGE =
  'Internal Server ERROR! Contact the admin.';

type Fields = {
  name: string;
  password: string;
  ra: string | null;
  email: string;
  image: string | null;
};

export async function register(req: Request, res: Response) {
  const { name, password, ra, email, image } = req.body as Fields;

  try {
    const errorMessage = validateFields(name, password, ra, email, image);
    if (errorMessage) return res.status(400).json({ error: errorMessage });

    const raExists = await validateRAExists(ra);
    if (raExists)
      return res.status(400).json({ error: EXISTING_RA_ERROR_MESSAGE });

    const emailExists = await validateEmailExists(email);
    if (emailExists)
      return res.status(400).json({ error: EXISTING_EMAIL_ERROR_MESSAGE });

    const passwordHash = await encryptPassword(password);
    const imageUrl = await uploadImageToImgBB(image);

    create(name, passwordHash, ra, email, imageUrl);

    res.status(201).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
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

  const fieldLengthErrorMessage = validateFieldLengths(name, ra, password);
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
) {
  if (name.length > USER_NAME_MAX_LENGTH) {
    return BIG_NAME_ERROR_MESSAGE;
  }

  if (ra !== null && ra.length !== RA_LENGTH) {
    return WRONG_RA_SIZE_ERROR_MESSAGE;
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return WRONG_PASSWORD_SIZE_ERROR_MESSAGE;
  }

  return null;
}

async function validateRAExists(ra: string | null) {
  if (!ra) return false;

  const foundRA = await queryDatabase('SELECT * FROM users u WHERE u.ra = ?', [
    ra,
  ]);

  if (foundRA && foundRA.length > 0) {
    return true;
  }

  return false;
}

async function validateEmailExists(email: string) {
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

async function uploadImageToImgBB(image: string | null) {
  const bufferedImage = bufferImage(image);
  return bufferedImage ? await uploadImage(bufferedImage) : null;
}

function bufferImage(image: string | null) {
  return image ? Buffer.from(image, 'base64') : null;
}
