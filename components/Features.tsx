const features = [
  {
    title: "Collect Files",
    description:
      "Request logos, documents, brand assets and other files from clients in one place.",
  },
  {
    title: "Custom Forms",
    description:
      "Create onboarding forms tailored to each service your agency offers.",
  },
  {
    title: "Progress Tracking",
    description:
      "Track exactly what every client has completed before work begins.",
  },
  {
    title: "Client Portal",
    description:
      "Give clients one clean place to complete onboarding instead of endless emails.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold text-zinc-900">
          Everything your agency needs
        </h2>

        <p className="mt-4 text-center text-lg text-zinc-600">
          Built specifically for marketing agencies.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-zinc-200 p-6"
            >
              <h3 className="text-xl font-semibold text-zinc-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-zinc-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}