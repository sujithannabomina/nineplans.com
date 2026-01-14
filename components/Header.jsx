"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const { user, signInWithGoogle, signOutUser } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-black/10">
      <div className="mx-auto max-w-6xl px-3 py-3 flex items-center gap-4">
        {/* Logo + Name + tagline */}
        <Link href="/" className="flex items-center gap-3 min-w-[220px]">
          <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
            9
          </div>
          <div className="leading-tight">
            <div className="text-base font-extrabold tracking-tight">NinePlans</div>
            <div className="text-xs text-black/60">Post anonymous</div>
          </div>
        </Link>

        {/* Header links (as per sketch) */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-semibold text-black/70">
          <Link className="hover:text-black" href="/">Home</Link>
          <Link className="hover:text-black" href="/rules">Rules</Link>
          <Link className="hover:text-black" href="/policy">Policy</Link>
          <Link className="hover:text-black" href="/faq">FAQ</Link>
          <Link className="hover:text-black" href="/contact">Contact</Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/submit"
            className="btn btn-outline flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create
          </Link>

          {user ? (
            <>
              <Link href="/profile" className="btn btn-outline">
                Profile
              </Link>
              <button onClick={signOutUser} className="btn btn-black">
                Logout
              </button>
            </>
          ) : (
            <button onClick={signInWithGoogle} className="btn btn-black">
              Continue with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
