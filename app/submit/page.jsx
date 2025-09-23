// app/submit/page.jsx
import SubmitClient from "@/components/SubmitClient";

export const metadata = { title: "Submit • NinePlans" };

export default function SubmitPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight">Submit</h1>
      <SubmitClient />
    </div>
  );
}
