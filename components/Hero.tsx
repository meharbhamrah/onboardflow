export default function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-zinc-50 px-6 text-center">
      <span className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
        Built for Marketing Agencies
      </span>

     <h1 className="mt-6 max-w-4xl text-5xl font-extrabold tracking-tight text-zinc-900 md:text-7xl">
        Client onboarding
        <br />
        made effortless.
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-zinc-600">
        Stop chasing clients for files, credentials, and approvals. Manage
        everything in one beautiful onboarding portal.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-zinc-800">
          Start Free Trial
        </button>

        <button className="rounded-lg border border-zinc-300 bg-white px-6 py-3 font-semibold text-zinc-900 transition hover:bg-zinc-100">
          Book Demo
        </button>
      </div>
    </section>
  );
}