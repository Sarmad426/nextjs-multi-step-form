"use client";

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig"; // import initialized Firebase auth

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userEmail, setUserEmail] = useState(null); // State to store user email

  const handleSignUp = async (e) => {
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
      setError(error.message);
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
        <button
          type="submit"
          className="bg-white text-black rounded-md p-2 cursor-pointer"
        >
          Sign Up
        </button>
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
