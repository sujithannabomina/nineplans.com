import SubmitClient from "./submit-client";

export const metadata = { title: "Submit • NinePlans" };

export default function Page() {
  return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold">Submit</h1>
      <SubmitClient />
    </>
  );
}
