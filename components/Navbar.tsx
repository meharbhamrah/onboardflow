export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 px-8 py-6">
      <h1 className="text-2xl font-bold">OnboardFlow</h1>

      <div className="flex gap-4">
        <button className="px-4 py-2 text-sm font-medium">
          Login
        </button>

        <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white">
          Start Free
        </button>
      </div>
    </nav>
  );
}