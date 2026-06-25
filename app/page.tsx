import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-4xl text-6xl font-bold tracking-tight">
          Client onboarding
          <br />
          made effortless.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-600">
          Collect files, information and approvals from your clients in one
          beautiful portal before the project begins.
        </p>

        <button className="mt-10 rounded-xl bg-black px-8 py-4 text-lg font-semibold text-white transition hover:scale-105">
          Start Free Trial
        </button>
      </main>
    </>
  );
}