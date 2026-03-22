"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800 bg-gray-900">
      <h1
        className="text-xl font-bold text-white cursor-pointer"
        onClick={() => router.push("/")}>
        Cloud<span className="text-blue-500">Auth</span>
      </h1>

      <div className="flex items-center gap-6">
        <span
          onClick={() => router.push("/premium")}
          className="text-sm text-gray-300 hover:text-white cursor-pointer transition">
          Premium
        </span>
        <span
          onClick={() => router.push("/about")}
          className="text-sm text-gray-300 hover:text-white cursor-pointer transition">
          About Us
        </span>
        <span
          onClick={() => router.push("/contact")}
          className="text-sm text-gray-300 hover:text-white cursor-pointer transition">
          Contact
        </span>
      </div>
    </nav>
  );
}
