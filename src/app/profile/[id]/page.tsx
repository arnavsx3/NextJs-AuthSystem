"use client";

import { use } from "react";

export default function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div>
      <h1>User Profile</h1>
      <p>
        <span>{id}</span>
      </p>
    </div>
  );
}
