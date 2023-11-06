import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      // Nếu authorize trả về falsy thì tức là đăng nhập thất bại
      authorize: async (credentials: any) => {
        const { email, password } = credentials;

        try {
          await dbConnect();
          const existedUser = await User.findOne({ email });

          if (!existedUser) return null;

          const passwordMatch = await bcrypt.compare(
            password,
            existedUser.password
          );
          if (!passwordMatch) return null;

          return existedUser;
        } catch (error: any) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
  },

  pages: {
    signIn: "/admin/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
