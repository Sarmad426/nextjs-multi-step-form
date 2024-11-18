"use client";

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig"; // import initialized Firebase auth
import { FirebaseError } from "firebase/app";
import { Button } from "@/components/ui/button";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to store user email

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setUserEmail(null); // Reset the user email state on new submission
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setSuccess("User registered successfully!");
      setUserEmail(userCredential.user.email); // Set the email of the signed-up user
    } catch (error) {
      if (error instanceof FirebaseError)
        setError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="my-12 lg:text-4xl md:text-3xl text-2xl font-semibold">
        Sign Up
      </h2>
      <form
        onSubmit={handleSignUp}
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
        <Button type="submit">Sign Up</Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-teal-500">{success}</p>}

      {/* Display the user's email if registration was successful */}
      {userEmail && (
        <div className="mt-4 p-4 rounded-md bg-gray-800 text-white">
          <p>
            Welcome, <span className="font-semibold">{userEmail}</span>!
          </p>
        </div>
      )}
    </div>
  );
}

export default SignUp;
