"use client";

import { useAuth } from "@/components/context/AuthContext";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { user, logOut } = useAuth();

  if (!user) redirect("/sign-in");

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {user?.email}
      {user && (
        <button
          onClick={() => logOut()}
          className="bg-white text-black rounded-md p-2 cursor-pointer"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Dashboard;
