"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const step = searchParams.get("step");

  const handleInputData = () => {
    if (!step) {
      localStorage.setItem("name", inputValue);
      setInputValue("");
      router.push(pathname + "?" + createQueryString("step", "age"));
    } else if (step === "age") {
      localStorage.setItem("age", inputValue);
      setInputValue("");
      router.push(pathname + "?" + createQueryString("step", "email"));
    } else if (step === "email") {
      localStorage.setItem("email", inputValue);
      setInputValue("");
      router.push(pathname + "?" + createQueryString("step", "password"));
    } else if (step === "password") {
      localStorage.setItem("password", inputValue);
      setInputValue("");
    }
  };

  return (
    <main className="flex items-center justify-center mt-16">
      {/* Name */}
      {!step && (
        <div className="flex items-center justify-center gap-6">
          <input
            type="text"
            placeholder="Enter your name..."
            className="p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem]"
            value={inputValue}
            minLength={3}
            maxLength={20}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleInputData}
            className="bg-white text-black rounded-md p-2 cursor-pointer"
          >
            Continue
          </button>
        </div>
      )}
      {/* Age */}
      {step === "age" && (
        <div className="flex items-center justify-center gap-6">
          <input
            type="number"
            placeholder="Enter your age..."
            className="p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem]"
            value={inputValue}
            min={18}
            max={60}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleInputData}
            className="bg-white text-black rounded-md p-2 cursor-pointer"
          >
            Continue
          </button>
        </div>
      )}
      {/* Email */}
      {step === "email" && (
        <div className="flex items-center justify-center gap-6">
          <input
            type="email"
            placeholder="Enter your email..."
            className="p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleInputData}
            className="bg-white text-black rounded-md p-2 cursor-pointer"
          >
            Continue
          </button>
        </div>
      )}
      {/* Password */}
      {step === "password" && (
        <div className="flex flex-col items-center justify-center gap-6">
          <input
            type="password"
            placeholder="Create a password..."
            className="p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new password..."
            className={`p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem] outline-none ${
              inputValue === password2 ? "border-green-500" : "border-red-500"
            }`}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button
            onClick={handleInputData}
            className="bg-white text-black rounded-md p-2 cursor-pointer"
          >
            Register
          </button>
        </div>
      )}
    </main>
  );
};

export default Home;
