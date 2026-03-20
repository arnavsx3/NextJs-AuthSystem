"use client";

import { useAuth } from "@/src/hooks/authHook";
import React from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { user, handleLogout } = useAuth();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const success = await handleLogout();
    if (success) router.push("/login");
  };
  return (
    <>
      <h1>Profile</h1>
      <div>
        <ul>
          <li>Id: {user?._id}</li>
          <li>Username: {user?.username}</li>
          <li>Email: {user?.email}</li>
        </ul>
      </div>
      <button onClick={handleSubmit}>Logout</button>
    </>
  );
}
