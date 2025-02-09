import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // Gunakan Prisma Adapter untuk menyimpan session ke database
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@luxima.id" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi!");
        }

        // Cari user berdasarkan email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          
        });

        if (!user || !user.password) {
          throw new Error("Email atau password salah!");
        }

        // Cek password
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) {
          throw new Error("Email atau password salah!");
        }

        return user;
      },
    }),
  ],
  session: {
    //strategy: "database", // Menggunakan session berbasis database
    strategy: "jwt", // <-- Set JWT strategy
  },
  callbacks: {
    async session({ session, user }) {
     if (user) {
        session.user = user

      }
      return session;
    },
  },
  pages: {
      signIn: "/login",
      error: "/login"
    },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
