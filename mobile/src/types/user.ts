export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  token_type: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  token: string;
  token_type: string;
  user: User;
}
