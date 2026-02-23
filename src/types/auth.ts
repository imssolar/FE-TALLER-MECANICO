export interface SignInResponse {
  access_token: string;
  userName?: string;
}

export interface SignInCredentials {
  username: string;
  password: string;
}
