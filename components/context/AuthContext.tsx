"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { FirebaseError } from "firebase/app";

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  console.log("🚀 ~ AuthProvider ~ user:", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credentials.user);
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-not-found") console.log("User not found");
        else if (error.code === "auth/wrong-password")
          console.log("Wrong password");
      }
    }
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logOut }}>
      {loading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}
