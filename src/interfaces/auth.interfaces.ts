
export interface RegisterResponse {
  message: string;
  status: number;
  count: number;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface loginRequest{
  username: string;
  password: string;
}

export interface token{
  token: string;
}
