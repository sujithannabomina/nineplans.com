import HomeClient from "@/components/HomeClient";

export default function Page({ searchParams }) {
  const initialTab =
    typeof searchParams?.tab === "string" && searchParams.tab.trim()
      ? searchParams.tab.trim()
      : "latest";

  return <HomeClient initialTab={initialTab} />;
}
