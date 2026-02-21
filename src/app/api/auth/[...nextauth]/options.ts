import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import { dbConnect } from '@/lib/dbConnect';
import CredentialsProvider from "next-auth/providers/credentials";
import LoginModel from '@/model/Login';
import SalonModel from '@/model/Salon';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "SalonX",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "user@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        // console.log({ credentials });
        try {
          const user = await LoginModel.findOne({
            isVerified: true, email: credentials.email
          }).lean();

          if (!user) {
            throw new Error("No user found!");
          }

          const salon = await SalonModel.findOne({ email: user.email });

          const isPassCorrect = await bcrypt.compare(credentials.password, user.password);
          if (isPassCorrect) {
            return salon;
          } else {
            throw new Error("Password incorrect!");
          }
        } catch (error: any) {
          return null;
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const isSignIn = user ? true : false;
      // if (trigger === 'update') {
      //   // If the user updates registrationStage, add it to the token
      //   // @ts-ignore
      //   token.stage = user.registrationStage;
      // }
      if (isSignIn) {
        token._id = user._id?.toString();
        token.username = user.email;
        // @ts-ignore
        token.stage = user.registrationStage;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // @ts-ignore
        session.user._id = token._id;
        // @ts-ignore
        session.user.username = token.username;
        // @ts-ignore
        session.user.stage = token.stage;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};