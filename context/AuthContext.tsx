"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user) {
        try {
          const res = await fetch(`/api/user/${session.user.email}`);
          const data = await res.json();
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            image: data.image,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [session]);

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
