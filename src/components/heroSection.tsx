"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/authHook";

export default function HeroSection() {
  const router = useRouter();
  const { user, handleLogout } = useAuth();

  const clickLogout = async () => {
    await handleLogout();
    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center justify-center flex-1 text-center px-4 gap-6 py-24">
      <h2 className="text-5xl font-bold leading-tight">
        Your photos, <span className="text-blue-500">forever.</span>
      </h2>
      <p className="text-gray-400 text-lg max-w-md">
        Upload your photos and access them anytime, from anywhere. No deletions,
        ever.
      </p>
      {!user ? (
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => router.push("/signup")}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
            Create free account
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2.5 border border-gray-700 hover:border-gray-500 rounded-lg text-sm text-gray-300 hover:text-white transition">
            Sign in
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <button
            onClick={clickLogout}
            className="px-6 py-2.5 border border-gray-700 hover:border-gray-500 rounded-lg text-sm text-gray-300 hover:text-white transition">
            Logout
          </button>
        </div>
      )}
    </main>
  );
}
