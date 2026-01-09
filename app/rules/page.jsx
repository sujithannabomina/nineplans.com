export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <div className="card p-8">
          <div className="text-2xl font-extrabold tracking-tight">Community Rules</div>
          <div className="text-sm text-black/70 mt-3 whitespace-pre-wrap">1) No hate/harassment
2) No doxxing/personal info
3) No spam/scams
4) Report violations

Moderation is active.</div>
          <a href="/" className="btn mt-6 inline-flex no-underline">Go home</a>
        </div>
      </div>
    </div>
  );
}
