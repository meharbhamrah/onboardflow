const faqs = [
  {
    question: "Who is OnboardFlow for?",
    answer:
      "OnboardFlow is built for marketing agencies that want a faster, more organized client onboarding process.",
  },
  {
    question: "Do my clients need an account?",
    answer:
      "No. Clients can access their onboarding portal through a secure link. Account creation can come later if needed.",
  },
  {
    question: "Can I customize my onboarding flow?",
    answer:
      "Yes. You'll be able to create different onboarding templates for different services and clients.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-4xl font-bold text-zinc-900">
          Frequently Asked Questions
        </h2>

        <div className="mt-12 space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-xl border border-zinc-200 bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-zinc-900">
                {faq.question}
              </h3>

              <p className="mt-3 text-zinc-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}