export default function Hero() {
  return (
    <section className="bg-zinc-50">
      <div className="mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <span className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700">
          Built for Marketing Agencies
        </span>

        <h1 className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight text-zinc-900 md:text-7xl">
          Client onboarding
          <br />
          made effortless.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Stop chasing clients for files, credentials and approvals.
          Collect everything in one beautiful onboarding portal before
          the project even begins.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-lg bg-black px-8 py-4 font-semibold text-white transition hover:bg-zinc-800">
            Start Free Trial
          </button>

          <button className="rounded-lg border border-zinc-300 bg-white px-8 py-4 font-semibold text-zinc-900 transition hover:bg-zinc-100">
            Book Demo
          </button>
        </div>
      </div>
    </section>
  );
}