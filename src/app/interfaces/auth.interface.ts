export interface ILogin {
  username: string;
  password: string;
}

export interface ISignup {
  username: string;
  password: string;
  name: string;
  orcid?: string;
  github?: string;
}

export interface IUser {
  id: string;
  username: string;
  name: string;
  orcid?: string;
  github?: string;
}
