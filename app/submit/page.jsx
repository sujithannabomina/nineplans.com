// app/submit/page.jsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // adjust if your auth file exports differently
import SubmitClient from "./submit-client";
import { CATEGORIES } from "@/lib/site";

export const metadata = { title: "Submit • NinePlans" };

export default async function SubmitPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/submit")}`);
  }
  return <SubmitClient categories={CATEGORIES} />;
}
