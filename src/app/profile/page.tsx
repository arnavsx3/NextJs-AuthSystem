"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/src/hooks/authHook";
import { usePhotos } from "@/src/hooks/imgHook";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const { photos, loading, handleUploadPhoto, handleGetPhotos, handleSetPfp } =
    usePhotos();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleGetPhotos();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await handleUploadPhoto(file);
    await handleGetPhotos();
  };

  const handleSelectPfp = async (photoUrl: string) => {
    const success = await handleSetPfp(photoUrl);
    if (success) {
      setUser({ ...user!, profilePicture: photoUrl });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Profile Top */}
      <div className="flex items-center gap-6 mb-10">
        <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="pfp"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl text-gray-400">👤</span>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.username}</h2>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Upload Button */}
      <div className="mb-8">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition">
          {loading ? "Uploading..." : "Upload Photo"}
        </button>
      </div>

      {/* Photos Grid */}
      <h3 className="text-lg font-semibold mb-4">Your Photos</h3>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : photos.length === 0 ? (
        <p className="text-gray-400">No photos yet. Upload your first one!</p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {photos.map((p) => (
            <div
              key={p._id}
              onClick={() => handleSelectPfp(p.photo)}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition relative group">
              <img
                src={p.photo}
                alt="photo"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
