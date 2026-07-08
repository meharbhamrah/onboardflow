const steps = [
  {
    number: "01",
    title: "Create an onboarding flow",
    description:
      "Build a checklist with forms, file requests and tasks for new clients.",
  },
  {
    number: "02",
    title: "Invite your client",
    description:
      "Send a secure onboarding link in seconds.",
  },
  {
    number: "03",
    title: "Track progress",
    description:
      "See exactly what's completed and what still needs attention.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold text-zinc-900">
          How OnboardFlow works
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-zinc-200 bg-white p-8"
            >
              <p className="text-sm font-bold text-zinc-500">
                {step.number}
              </p>

              <h3 className="mt-4 text-2xl font-semibold text-zinc-900">
                {step.title}
              </h3>

              <p className="mt-4 text-zinc-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}