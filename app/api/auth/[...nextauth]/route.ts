import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
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
    async session({ session }) {
      await dbConnect();
      const user = await User.findOne({ email: session.user?.email });
      if (user)
        session.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.avatar.url || "",
        } as any;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
