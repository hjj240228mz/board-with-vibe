export interface User {
  username: string;
  nickname: string;
}

export interface SignupRequest {
  username: string;
  password: string;
  nickname: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  username: string;
  nickname: string;
}
