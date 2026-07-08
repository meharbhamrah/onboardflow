const stats = [
  { number: "100+", label: "Projects Onboarded" },
  { number: "50+", label: "Agency Clients" },
  { number: "99%", label: "Completion Rate" },
];

export default function Trust() {
  return (
    <section className="bg-zinc-900 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl font-bold">
          Built for growing marketing agencies
        </h2>

        <p className="mt-4 text-lg text-zinc-300">
          Streamline client onboarding and spend more time delivering results.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <h3 className="text-5xl font-bold">{stat.number}</h3>
              <p className="mt-2 text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}