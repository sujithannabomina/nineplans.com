import SearchClient from "./search-client";

export const metadata = { title: "Search • NinePlans" };

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Search</h1>
      <SearchClient />
    </div>
  );
}
