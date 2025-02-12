import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// 🔹 Tambahkan tipe "role" ke User dan Session
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
