const reasons = [
  {
    title: "Everything in one place",
    description:
      "Stop juggling emails, Google Drive links and spreadsheets. Keep every onboarding task together.",
  },
  {
    title: "Professional client experience",
    description:
      "Give clients a branded onboarding portal that feels organized and easy to use.",
  },
  {
    title: "Save hours every week",
    description:
      "Automate repetitive onboarding work so your team can focus on delivering projects.",
  },
];

export default function WhyOnboardFlow() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-zinc-900">
            Why agencies choose OnboardFlow
          </h2>

          <p className="mt-4 text-lg text-zinc-600">
            Built to replace scattered onboarding processes with one simple workflow.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-zinc-200 p-8"
            >
              <h3 className="text-xl font-semibold text-zinc-900">
                {reason.title}
              </h3>

              <p className="mt-4 leading-7 text-zinc-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}