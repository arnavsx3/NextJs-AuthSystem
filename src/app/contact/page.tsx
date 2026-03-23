"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: "string",
    text: "string",
  });

  const handleSubmit = async(e:React.SyntheticEvent):Promise<void>=>{
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8 mx-auto">
      <div className="bg-gray-700 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Connect with us</h1>
      </div>
    </div>
  );
}
