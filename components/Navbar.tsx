export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-zinc-900">
          OnboardFlow
        </h1>

        <div className="flex items-center gap-4">
          <button className="font-medium text-zinc-700 transition hover:text-black">
            Login
          </button>

          <button className="rounded-lg bg-black px-5 py-2 font-medium text-white transition hover:bg-zinc-800">
            Start Free
          </button>
        </div>
      </div>
    </nav>
  );
}