export type User = {
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

export type UserLogin = {
  id: number;
  name: string;
  password: string;
  ra: string;
  email: string;
  userType: string;
  image: Buffer;
  creationDate: Date;
};

export enum UserType {
  DEFAULT = 1,
  ADMIN,
}

export type Fields = {
  name: string;
  password: string;
  ra: string | null;
  email: string;
  image: string | null;
};
