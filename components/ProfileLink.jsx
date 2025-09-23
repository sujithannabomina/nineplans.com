<<<<<<< HEAD
"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function ProfileLink() {
  const { user, signOutUser } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-lg border border-white/20 px-4 py-1.5 hover:bg-white/10"
      >
        Login
      </Link>
    );
  }

  const photo =
    user.photoURL && typeof user.photoURL === "string"
      ? user.photoURL
      : "/logo.svg";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2"
        aria-label="Open profile menu"
      >
        <img
          src={photo}
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover ring-1 ring-white/20"
          onError={(e) => {
            e.currentTarget.src = "/logo.svg";
          }}
        />
        <span className="hidden sm:inline max-w-[160px] truncate">
          {user.displayName || "User"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/15 bg-black/95 p-1 shadow-lg">
          <Link href="/profile" className="block px-3 py-2 rounded-lg hover:bg-white/10">
            My profile
          </Link>
          <Link href="/profile/settings" className="block px-3 py-2 rounded-lg hover:bg-white/10">
            Settings
          </Link>
          <button
            onClick={signOutUser}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
=======
"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function ProfileLink() {
  const { user, signOutUser } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-lg border border-white/20 px-4 py-1.5 hover:bg-white/10"
      >
        Login
      </Link>
    );
  }

  const photo =
    user.photoURL && typeof user.photoURL === "string"
      ? user.photoURL
      : "/logo.svg";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2"
        aria-label="Open profile menu"
      >
        <img
          src={photo}
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover ring-1 ring-white/20"
          onError={(e) => {
            e.currentTarget.src = "/logo.svg";
          }}
        />
        <span className="hidden sm:inline max-w-[160px] truncate">
          {user.displayName || "User"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/15 bg-black/95 p-1 shadow-lg">
          <Link href="/profile" className="block px-3 py-2 rounded-lg hover:bg-white/10">
            My profile
          </Link>
          <Link href="/profile/settings" className="block px-3 py-2 rounded-lg hover:bg-white/10">
            Settings
          </Link>
          <button
            onClick={signOutUser}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
