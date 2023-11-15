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