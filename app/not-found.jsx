export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card p-8 max-w-md w-full">
        <div className="text-xl font-extrabold">Page not found</div>
        <div className="text-sm text-black/60 mt-2">The page you’re looking for doesn’t exist.</div>
        <a href="/" className="btn mt-5 inline-flex no-underline">Go home</a>
      </div>
    </div>
  );
}
