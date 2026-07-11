type Props = {
  params: Promise<{
    token: string;
  }>;
};

export default async function OnboardingPage({
  params,
}: Props) {
  const { token } = await params;

  return (
    <main className="mx-auto max-w-3xl p-10">
      <h1 className="text-4xl font-bold">
        Client Onboarding
      </h1>

      <p className="mt-4 text-zinc-600">
        Token:
      </p>

      <code className="mt-2 block rounded bg-zinc-100 p-4">
        {token}
      </code>
    </main>
  );
}