export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <div className="card p-8">
          <div className="text-2xl font-extrabold tracking-tight">Privacy</div>
          <div className="text-sm text-black/70 mt-3 whitespace-pre-wrap">We keep your email private. Public identity is your alias.

This is an MVP policy page. Replace with your final legal text before launch.</div>
          <a href="/" className="btn mt-6 inline-flex no-underline">Go home</a>
        </div>
      </div>
    </div>
  );
}
