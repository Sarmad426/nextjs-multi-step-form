"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/components/context/AuthContext";
import { redirect } from "next/navigation";

function Login() {
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Trying to login!");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in");
    } catch (error) {
      if (error instanceof FirebaseError)
        setError(error?.message || "Something went wrong");
    }
  };

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div>
        <h2 className="my-12 lg:text-4xl md:text-3xl text-2xl font-semibold">
          Login
        </h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-8"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem]"
          />
          <button
            type="submit"
            className="bg-white text-black rounded-md p-2 cursor-pointer"
          >
            Continue
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
