const features = [
  {
    title: "Collect Files",
    description:
      "Request logos, documents, contracts and assets from clients in one organized place.",
  },
  {
    title: "Custom Forms",
    description:
      "Create onboarding forms tailored to every service your agency provides.",
  },
  {
    title: "Progress Tracking",
    description:
      "Track exactly what each client has completed before your team starts work.",
  },
  {
    title: "Client Portal",
    description:
      "Give clients a clean dashboard instead of endless email chains.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-zinc-900">
            Everything your agency needs
          </h2>

          <p className="mt-4 text-lg text-zinc-600">
            Built specifically for agencies that want a faster, smoother onboarding experience.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-200 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-xl text-white">
                ✓
              </div>

              <h3 className="text-2xl font-semibold text-zinc-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-zinc-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}