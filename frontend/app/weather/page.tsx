import Link from "next/link";
import type { WeatherForecast } from "./type";
import WeatherForecastList from "./WeatherForecastList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const dynamic = "force-dynamic";

async function getForecasts(): Promise<WeatherForecast[]> {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return [];
  }

  const response = await fetch(`${apiUrl}/api/weatherforecast`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function WeatherPage() {
  const forecasts = await getForecasts();

  return (
    <>
      <div className="h-0.5 bg-gradient-to-r from-teal-primary via-sky-400/60 to-transparent" />
      <Navbar />

      <section className="mx-auto max-w-[800px] px-6 pt-16 pb-20">
        <div className="mb-2">
          <Link
            href="/"
            className="text-sm font-medium text-text-secondary hover:text-teal-primary transition-colors"
          >
            ← Back to home
          </Link>
        </div>

        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted mb-3">
          Aspire demo · ASP.NET backend
        </div>
        <h1 className="text-[2rem] font-semibold tracking-tight leading-snug">
          Weather forecast
        </h1>
        <p className="mt-2 max-w-[520px] text-base leading-relaxed text-text-secondary mb-8">
          Server-rendered data from the ASP.NET Core API, styled to match the
          TSIA Coach design system. Refresh to get new random forecasts.
        </p>

        <WeatherForecastList forecasts={forecasts} />

        <div className="mt-6 flex items-center gap-3">
          <Link
            href="/weather"
            className="rounded-xl bg-teal-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-hover"
          >
            Refresh forecasts
          </Link>
          <div className="text-sm text-text-muted">
            {forecasts.length} forecasts · cached 5s
          </div>
        </div>

        {/* API info card */}
        <div className="mt-10 rounded-xl border border-border bg-surface-card p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted mb-3">
            API details
          </div>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Endpoint</span>
              <code className="font-mono text-xs text-text-muted">
                GET /api/weatherforecast
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Cache</span>
              <code className="font-mono text-xs text-text-muted">
                Redis output cache · 5s TTL
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Rendering</span>
              <code className="font-mono text-xs text-text-muted">
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
