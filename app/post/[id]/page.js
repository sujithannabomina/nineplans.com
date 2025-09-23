// app/post/[id]/page.js

export const metadata = { title: "Post • NinePlans" };

export default function PostPage({ params }) {
  const id = params?.id ?? "";

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Post</h1>
      <div className="rounded-md border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-300">
        Post details page for ID: <span className="font-mono">{id}</span>.
        {/* TODO: render real post + comments once Firestore helpers are ready */}
      </div>
    </div>
  );
}
