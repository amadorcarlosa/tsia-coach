import Link from "next/link";
import type { WeatherForecast } from "./type";
import WeatherForecastList from "./WeatherForecastList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const dynamic = "force-dynamic";

async function getForecasts(): Promise<WeatherForecast[]> {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) return [];

  const response = await fetch(`${apiUrl}/api/weatherforecast`, {
    cache: "no-store",
  });

  if (!response.ok) return [];
  return response.json();
}

export default async function WeatherPage() {
  const forecasts = await getForecasts();

  return (
    <>
      <div className="mt-accent-strip" />
      <Navbar />

      <section className="w-full mx-auto max-w-content px-6 pt-16 pb-20">
        <div className="mb-2">
          <Link
            href="/"
            className="text-sm font-medium text-ink-sub hover:text-primary-600 transition-colors no-underline"
          >
            ← Back to home
          </Link>
        </div>

        <div className="mt-eyebrow mb-3">Aspire demo · ASP.NET backend</div>
        <h1 className="text-3xl font-semibold tracking-tight leading-snug">
          Weather forecast
        </h1>
        <p className="mt-2 max-w-lg text-base leading-relaxed text-ink-sub mb-8">
          Server-rendered data from the ASP.NET Core API, styled to match the
          TSIA Coach design system. Refresh to get new random forecasts.
        </p>

        <WeatherForecastList forecasts={forecasts} />

        <div className="mt-6 flex items-center gap-3">
          <Link
            href="/weather"
            className="rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 no-underline"
          >
            Refresh forecasts
          </Link>
          <div className="text-sm text-ink-muted">
            {forecasts.length} forecasts · cached 5s
          </div>
        </div>

        {/* API info card */}
        <div className="mt-panel mt-10 p-5">
          <div className="mt-eyebrow mb-3">API details</div>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-sub">Endpoint</span>
              <code className="font-mono text-xs text-ink-muted">
                GET /api/weatherforecast
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-sub">Cache</span>
              <code className="font-mono text-xs text-ink-muted">
                Redis output cache · 5s TTL
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-sub">Rendering</span>
              <code className="font-mono text-xs text-ink-muted">
                Server component · no-store fetch
              </code>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
