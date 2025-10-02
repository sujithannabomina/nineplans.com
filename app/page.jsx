// app/page.jsx
import PageShell from "@/components/PageShell";
import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  return (
    <PageShell>
      <section>
        <h1 className="text-3xl font-bold mb-4">Recent Posts</h1>
        {/* Your existing feed component */}
        <HomeClient />
      </section>
    </PageShell>
  );
}
