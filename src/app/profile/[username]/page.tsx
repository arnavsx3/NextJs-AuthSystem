"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/authHook";
import { use } from "react";

interface Props {
  params: Promise<{
    username: string;
  }>;
}
interface UserProfile {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  profilePicture: string;
}

export default function UserInfo({ params }: Props) {
  const { username } = use(params);
  const { getUser, loading } = useAuth();
  const [profileUser, setProfileUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!username) return;
    const fetchUser = async () => {
      const user = await getUser(username);
      setProfileUser(user);
    };
    fetchUser();
  }, [username]);

  if (!profileUser)
    return (
      <p className="min-h-screen bg-gray-800 text-center text-white p-8">
        User not found.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <img
          className="h-20 w-20 rounded-full object-cover bg-gray-700"
          src={profileUser.profilePicture || ""}
          alt="pfp"
        />
        <h1 className="text-2xl font-bold">{profileUser.username}</h1>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 flex flex-col gap-4 text-sm">
        <div className="flex justify-between border-b border-gray-700 pb-3">
          <span className="text-gray-400">ID</span>
          <span>{profileUser._id}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-3">
          <span className="text-gray-400">Email</span>
          <span>{profileUser.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Joined</span>
          <span>{new Date(profileUser.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
