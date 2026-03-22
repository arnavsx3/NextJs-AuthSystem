"use client";

import { useRouter } from "next/navigation";
import HeroSection from "../components/heroSection";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <HeroSection />
    </div>
  );
}
