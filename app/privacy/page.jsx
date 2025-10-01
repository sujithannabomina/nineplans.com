import Shell from "@/components/Shell";

export const metadata = { title: "Privacy • NinePlans" };

export default function Page() {
  return (
    <Shell title="Privacy">
      <p className="text-zinc-300">
        We only collect what we need to run NinePlans (account and basic analytics).
        You control your display name (alias vs. account name) when posting.
      </p>
    </Shell>
  );
}
