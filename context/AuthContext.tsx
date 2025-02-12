"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "next-auth/react";

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.name!,
          email: session.user.email!,
          role: session.user.role ? session.user.role : "USER",
          avatar: session.user.avatar ? session.user.avatar : "",
        });
      }
      setLoading(false);
    };

    loadSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
