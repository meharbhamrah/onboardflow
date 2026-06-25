export default function Features() {
  const features = [
    "Collect files",
    "Custom onboarding forms",
    "Progress tracking",
    "Client portal",
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="mb-12 text-center text-4xl font-bold">
        Everything you need
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature}
            className="rounded-xl border p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold">
              {feature}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}