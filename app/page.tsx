"use client";

import { setProgress, User } from "@/utils/helper-methods";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

const Home: React.FC = () => {
  const [userData, setUserData] = useState(User);

  useEffect(() => {
    const values = localStorage.getItem("data");
    if (values) {
      setUserData(JSON.parse(values));
    }
  }, []);

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
    const userString = localStorage.getItem("data");

    if (!userString) {
      localStorage.setItem("data", JSON.stringify(userData));
    } else {
      // Setting the name value
      if (!step) {
        const user = JSON.parse(userString);
        user.name = userData.name;
        localStorage.setItem("data", JSON.stringify(user));
        router.push(pathname + "?" + createQueryString("step", "age"));
      }
      // Setting the age value
      if (step === "age") {
        const user = JSON.parse(userString);
        user.age = +userData.age;
        localStorage.setItem("data", JSON.stringify(user));
        router.push(pathname + "?" + createQueryString("step", "email"));
      }
      // Setting the email value
      if (step === "email") {
        const user = JSON.parse(userString);
        user.email = userData.email;
        localStorage.setItem("data", JSON.stringify(user));
        router.push(pathname + "?" + createQueryString("step", "gender"));
      }

      // Setting the password value
      if (step === "password") {
        const user = JSON.parse(userString);
        user.password = userData.password;
        localStorage.setItem("data", JSON.stringify(user));
      }
    }
  };

  const handleGender = (e: ChangeEvent<HTMLSelectElement>) => {
    const userString = localStorage.getItem("data");
    if (userString) {
      const user = JSON.parse(userString);
      setUserData({ ...userData, gender: e.target.value });
      user.gender = e.target?.value;
      localStorage.setItem("data", JSON.stringify(user));
      router.push(pathname + "?" + createQueryString("step", "password"));
    }
  };

  return (
    <main className="flex flex-col gap-12 items-center justify-center mt-16">
      {/* Progress bar */}
      <input
        type="range"
        value={setProgress(step)}
        readOnly
        placeholder="Form Progress"
      />
      {/* Name */}
      {!step && (
        <div className="flex flex-col items-center justify-center gap-6">
          <input
            type="text"
            placeholder="Enter your name..."
            className="p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem]"
            minLength={3}
            maxLength={20}
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          {userData.name.length > 0 && (
            <div className="flex gap-6">
              <button
                onClick={handleInputData}
                className="bg-white text-black rounded-md p-2 cursor-pointer"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}
      {/* Age */}
      {step === "age" && (
        <div className="flex flex-col items-center justify-center gap-6">
          <input
            type="number"
            placeholder="Enter your age..."
            className="p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem]"
            value={userData.age}
            min={18}
            max={60}
            onChange={(e) => setUserData({ ...userData, age: +e.target.value })}
          />
          <div className="flex gap-6">
            <button
              className="bg-white text-black rounded-md px-2 py-1 cursor-pointer text-sm"
              onClick={() => router.back()}
            >
              Back
            </button>
            {userData.age >= 18 && (
              <button
                onClick={handleInputData}
                className="bg-white text-black rounded-md p-2 cursor-pointer"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      )}
      {/* Email */}
      {step === "email" && (
        <div className="flex flex-col items-center justify-center gap-6">
          <input
            type="email"
            placeholder="Enter your email..."
            className="p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem]"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <div className="flex gap-6">
            <button
              className="bg-white text-black rounded-md px-2 py-1 cursor-pointer text-sm"
              onClick={() => router.back()}
            >
              Back
            </button>
            {userData.email && (
              <button
                onClick={handleInputData}
                className="bg-white text-black rounded-md p-2 cursor-pointer"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      )}
      {/* Gender */}
      {step === "gender" && (
        <div className="flex flex-col items-center justify-center gap-6">
          <select
            className="p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem]"
            onChange={(e) => handleGender(e)}
            title="Gender"
            value={userData.gender}
          >
            <option value="" className="bg-gray-900">
              Select Gender
            </option>
            <option value="Male" className="bg-gray-900">
              Male
            </option>
            <option value="Female" className="bg-gray-900">
              Female
            </option>
          </select>
          <div className="flex gap-6">
            <button
              className="bg-white text-black rounded-md px-2 py-1 cursor-pointer text-sm"
              onClick={() => router.back()}
            >
              Back
            </button>
          </div>
        </div>
      )}
      {/* Password */}
      {step === "password" && (
        <div className="flex flex-col items-center justify-center gap-6">
          <input
            type="password"
            placeholder="Create a password..."
            className="p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem]"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm new password..."
            className={`p-2 rounded-md text-white bg-transparent border border-gray-700 w-[20rem] outline-none ${
              userData.password === password2
                ? "border-green-500"
                : "border-red-500"
            }`}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <div className="flex gap-6">
            <button
              className="bg-white text-black rounded-md px-2 py-1 cursor-pointer text-sm"
              onClick={() => router.back()}
            >
              Back
            </button>
            {userData.password.length > 0 &&
              userData.password === password2 && (
                <button
                  onClick={handleInputData}
                  className="bg-white text-black rounded-md p-2 cursor-pointer"
                >
                  Continue
                </button>
              )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
