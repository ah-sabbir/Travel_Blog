import NextAuth from "next-auth";

export interface IUserSession {
  name: string;
  email: string;
  role: string;
  _id: string;
  image: string;
}

declare module "next-auth" {
  interface Session {
    user: IUserSession;
  }
}
