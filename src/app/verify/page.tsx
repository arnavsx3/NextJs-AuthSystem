"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  verifyEmail,
  sendVerificationEmail,
} from "@/src/services/auth-services";
import { useAuth } from "@/src/hooks/authHook";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { user, setUser } = useAuth();

  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendMessage, setSendMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setMessage("No token provided");
      return;
    }
    const verify = async () => {
      try {
        const response = await verifyEmail(token);
        setSuccess(true);
        setMessage("Email verified successfully");
        setUser({ ...user!, isVerified: true });
      } catch (error) {
        setMessage("Invalid or expired token");
        console.log(error);
      }
    };
    verify();
  }, [token]);

  const handleSendVerification = async () => {
    setSending(true);
    setSendMessage("");
    try {
      const response = await sendVerificationEmail();
      setSendMessage(response.message);
    } catch (error: any) {
      setSendMessage("Failed to send email. Try again.");
      console.log(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
      <div className="bg-gray-700 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Email Verification
        </h1>

        <div
          className={`text-sm text-center px-4 py-2 rounded-lg mb-4 ${
            user?.isVerified
              ? "bg-green-900 text-green-400"
              : "bg-yellow-900 text-yellow-400"
          }`}>
          {user?.isVerified
            ? "Your email is verified"
            : "Your email is not verified yet"}
        </div>

        {message && (
          <p
            className={`text-sm text-center mb-4 ${success ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        {!user?.isVerified && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-400 text-center">
              Click below to receive a verification link on your email.
            </p>
            <button
              onClick={handleSendVerification}
              disabled={sending}
              className="bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50">
              {sending ? "Sending..." : "Send Verification Email"}
            </button>
            {sendMessage && (
              <p className="text-sm text-center text-gray-400">{sendMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
