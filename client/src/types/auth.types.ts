export type UserRole = 'admin' | 'sales';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface IRegisterDTO {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}
