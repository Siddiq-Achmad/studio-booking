import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password harus diisi");
        }

        // 🔹 Cari user di database berdasarkan email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // 🔹 Cek apakah user ditemukan
        if (!user || user.password !== credentials.password) {
          throw new Error("Email atau password salah");
        }

        // 🔹 Return user dengan role untuk session
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // Pastikan role tersimpan di session
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string; // Tambahkan role ke session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Simpan role ke token JWT
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};
