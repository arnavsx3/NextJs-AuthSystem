"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-800 text-white p-8 mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-400 mb-6">
        CloudAuth is a simple photo storage app where you can upload and access
        your photos anytime, from anywhere. No deletions, ever.
      </p>
      <h2 className="text-xl font-semibold mb-2">What we offer</h2>
      <ul className="text-gray-400 flex flex-col gap-2 mb-6 text-sm">
        <li>📸 Upload and store your photos securely</li>
        <li>☁️ Access your photos from any device</li>
        <li>👤 Public profiles to share your gallery</li>
        <li>🔒 Secure authentication to keep your account safe</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">Our mission</h2>
      <p className="text-gray-400 text-sm">
        We believe your memories should last forever. CloudAuth was built to
        give you a reliable place to store your photos without worrying about
        them disappearing.
      </p>
    </div>
  );
}
