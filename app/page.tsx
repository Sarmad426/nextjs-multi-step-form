"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { setProgress, User } from "@/utils/helper-methods";
import {
  useSearchParams,
  useRouter,
  usePathname,
  redirect,
} from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Home: React.FC = () => {
  const [userData, setUserData] = useState(User);

  useEffect(() => {
    const values = localStorage.getItem("data");
    if (values) {
      setUserData(JSON.parse(values));
    }
  }, []);

  const [password2, setPassword2] = useState<string>("");

  const steps = ["name", "age", "email", "gender", "password"];

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

  if (step && !steps?.includes(step)) {
    redirect("/");
  }
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

  const handleGender = (e: string) => {
    const userString = localStorage.getItem("data");
    if (userString) {
      const user = JSON.parse(userString);
      setUserData({ ...userData, gender: e });
      user.gender = e;
      localStorage.setItem("data", JSON.stringify(user));
      router.push(pathname + "?" + createQueryString("step", "password"));
    }
  };

  return (
    <main className="flex flex-col gap-12 items-center justify-center mt-16">
      {/* Progress bar */}
      <div className="w-[15rem]">
        <Progress value={setProgress(step)} />
      </div>
      {/* Name */}
      {!step && (
        <div className="flex flex-col items-center justify-center gap-6">
          <Input
            type="text"
            placeholder="Enter your name..."
            className="w-[20rem]"
            minLength={3}
            maxLength={20}
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />

          {userData.name.length > 0 && (
            <Button onClick={handleInputData}>Continue</Button>
          )}
        </div>
      )}
      {/* Age */}
      {step === "age" && (
        <div className="flex flex-col items-center justify-center gap-6">
          <Input
            type="number"
            placeholder="Enter your age..."
            className="w-[20rem]"
            value={userData.age}
            min={18}
            max={60}
            onChange={(e) => setUserData({ ...userData, age: +e.target.value })}
          />
          <div className="flex gap-6">
            <Button onClick={() => router.back()} variant="secondary">
              Back
            </Button>
            {userData.age >= 18 && (
              <Button onClick={handleInputData}>Continue</Button>
            )}
          </div>
        </div>
      )}
      {/* Email */}
      {step === "email" && (
        <div className="flex flex-col items-center justify-center gap-6">
          <Input
            type="email"
            placeholder="Enter your email..."
            className="w-[20rem]"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <div className="flex gap-6">
            <Button variant="secondary" onClick={() => router.back()}>
              Back
            </Button>
            {userData.email && (
              <Button onClick={handleInputData}>Continue</Button>
            )}
          </div>
        </div>
      )}
      {/* Gender */}
      {step === "gender" && (
        <div className="flex flex-col items-center justify-center gap-6">
          <Select
            onValueChange={(e) => handleGender(e)}
            value={userData.gender}
          >
            <SelectTrigger className="w-[20rem]">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="secondary" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      )}
      {/* Password */}
      {step === "password" && (
        <div className="flex flex-col items-center justify-center gap-6">
          <Input
            type="password"
            placeholder="Create a password..."
            className="w-[20rem]"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="Confirm new password..."
            className={`w-[20rem] outline-none ${
              userData.password === password2
                ? "border-green-500"
                : "border-red-500"
            }`}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <div className="flex gap-6">
            <Button variant="secondary" onClick={() => router.back()}>
              Back
            </Button>
            {userData.password.length > 0 &&
              userData.password === password2 && (
                <Button onClick={handleInputData}>Create Account</Button>
              )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
