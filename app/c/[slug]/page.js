// app/c/[slug]/page.js
import PageShell from "@/components/PageShell";
import { getCategoryBySlug } from "@/components/CategoryLinks";

export default function CategoryPage({ params }) {
  const cat = getCategoryBySlug(params.slug);

  return (
    <PageShell>
      {cat ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{cat.label}</h1>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-zinc-400">No posts yet. Be the first to write one.</p>
          </div>
        </>
      ) : (
       <>
          <h1 className="text-3xl font-bold mb-4">Not found</h1>
          <p className="text-zinc-400">This category does not exist.</p>
        </>
      )}
    </PageShell>
  );
}
