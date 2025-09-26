import SearchClient from "./search-client";

export const metadata = { title: "Search • NinePlans" };

export default function Page() {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold">Search</h1>
      <SearchClient />
    </div>
  );
}
