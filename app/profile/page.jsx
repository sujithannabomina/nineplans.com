import ProfileClient from "@/components/ProfileClient";

export const metadata = { title: "Profile • NinePlans" };

export default function Page() {
  return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold">Profile</h1>
      <ProfileClient />
    </>
  );
}
