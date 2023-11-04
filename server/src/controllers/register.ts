import { Request, Response } from "express";
import { queryDatabase } from "../db";

enum UserType {
  DEFAULT = 1,
  ADMIN,
}

const USER_NAME_MAX_LENGTH = 100;
const RA_LENGTH = 8;
const MIN_PASSWORD_LENGTH = 6;
const EXISTING_RA_ERROR_MESSAGE =
  "We already have an account associated with that RA.";
const EXISTING_EMAIL_ERROR_MESSAGE =
  "We already have an account associated with that email address.";
const BIG_NAME_ERROR_MESSAGE =
  "Please shorten your name to 100 characters or less.";
const WRONG_RA_SIZE_ERROR_MESSAGE = "RA must be exactly 8 characters long.";
const WRONG_PASSWORD_SIZE_ERROR_MESSAGE =
  "Your password must be at least 6 characters long.";
const INTERNAL_SERVER_ERROR_MESSAGE =
  "Internal Server ERROR! Contact the admin.";

export async function register(req: Request, res: Response) {
  const { name, password, ra, email, image } = req.body;

  try {
    const errorMessage = validateFields(name, password, ra, email);
    if (errorMessage !== null) {
      return res.status(400).json({ error: errorMessage });
    }

    const raExists = await validateRAExists(ra);
    if (raExists) {
      return res.status(400).json({ error: EXISTING_RA_ERROR_MESSAGE });
    }

    const emailExists = await validateEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ error: EXISTING_EMAIL_ERROR_MESSAGE });
    }

    create(name, password, ra, email, image);
    
    res.status(201).send();
  } catch (err) {
    return res.status(500).json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
  }
}

function validateFields(name: string, password: string, ra: string, email: string): string | null {
  const error = validateUndefinedFields(name, password, ra, email);
  if (error !== null) {
    return error;
  }

  const nullErrorMessage = validateNullFields(name, password, email);
  if (nullErrorMessage !== null) {
    return nullErrorMessage;
  }

  const fieldLengthErrorMessage = validateFieldLengths(name, ra, password);
  if (fieldLengthErrorMessage !== null) {
    return fieldLengthErrorMessage;
  }

  return null;
}

function validateUndefinedFields(name: string, password: string, ra: string, email: string): string | null {
  const undefinedFields = [];
  if (name === undefined) undefinedFields.push("name");
  if (password === undefined) undefinedFields.push("password");
  if (ra === undefined) undefinedFields.push("ra");
  if (email === undefined) undefinedFields.push("email");

  if (undefinedFields.length > 0) {
    const errorMessage =
      undefinedFields.length === 1
        ? `Field '${undefinedFields[0]}' is undefined.`
        : `Fields [${undefinedFields.join(", ")}] are undefined.`;
    
    return errorMessage;
  }

  return null;
}

function validateNullFields(name: string, password: string, email: string): string | null {
  const nullFields = [];
  if (name === null) nullFields.push("name");
  if (password === null) nullFields.push("password");
  if (email === null) nullFields.push("email");

  if (nullFields.length > 0) {
    const errorMessage =
      nullFields.length === 1
        ? `Field '${nullFields[0]}' is mandatory.`
        : `Fields [${nullFields.join(", ")}] are mandatories.`;
    
    return errorMessage;
  }

  return null;
}

function validateFieldLengths(name: string, ra: string, password: string): string | null {
  if (name.length > USER_NAME_MAX_LENGTH) {
    return BIG_NAME_ERROR_MESSAGE
  }

  if (ra !== null && ra.length !== RA_LENGTH) {
    return WRONG_RA_SIZE_ERROR_MESSAGE;
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return WRONG_PASSWORD_SIZE_ERROR_MESSAGE;
  }

  return null;
}

async function validateRAExists(ra: string) : Promise<boolean> {
  if (ra === null) {
    return false;
  }

  const foundRA = await queryDatabase(
    "SELECT * FROM users u WHERE u.ra = ?",
    [ra],
  );

  if (foundRA && foundRA.length > 0) {
    return true;
  }

  return false;
}

async function validateEmailExists(email: string) : Promise<boolean> {
  const foundEmail = await queryDatabase(
    "SELECT * FROM users u WHERE u.email = ?",
    [email],
  );

  if (foundEmail && foundEmail.length > 0) {
    return true;
  }

  return false;
}

async function create(name: string, password: string, ra: string, email: string, image: string): Promise<void> {
  await queryDatabase(
    `INSERT INTO users (name, password, ra, email, user_type_id, created_at, last_access, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      password,
      ra,
      email,
      UserType.DEFAULT,
      new Date(),
      null,
      image,
    ],
  );
}

