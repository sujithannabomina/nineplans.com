// Server Component gate that requires login before showing the client form
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SubmitClient from "./submit-client";

export const metadata = { title: "Submit • NinePlans" };

export default async function SubmitPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?redirect=${encodeURIComponent("/submit")}`);
  }
  return <SubmitClient />;
}
