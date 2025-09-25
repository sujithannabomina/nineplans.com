import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const metadata = { title: "Login • NinePlans" };

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="px-2 py-4 text-zinc-400">Loading…</div>}>
      <LoginClient />
    </Suspense>
  );
}
