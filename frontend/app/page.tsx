type HealthResponse = { status: string };

async function getApiHealth(): Promise<HealthResponse> {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) return { status: "API_URL is not configured" };

  try {
    const response = await fetch(`${apiUrl}/health`, { cache: "no-store" });
    if (!response.ok) return { status: `API returned ${response.status}` };
    return await response.json();
  } catch {
    return { status: "API is unreachable" };
  }
}

export default async function Home() {
  const health = await getApiHealth();

  return (
    <main className="min-h-screen p-10 font-sans">
      <section className="mx-auto max-w-3xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          TSIA Coach
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Aspire + Next.js + ASP.NET Core
        </h1>
        <p className="text-lg text-gray-600">
          This page is rendered by Next.js and checks the ASP.NET API server-side.
        </p>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm text-gray-500">API health</p>
          <p className="mt-1 text-2xl font-semibold">{health.status}</p>
        </div>
      </section>
    </main>
  );
}
