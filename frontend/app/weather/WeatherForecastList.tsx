"use client";

import type { WeatherForecast } from "./type";

const BADGE: Record<string, string> = {
  Freezing:    "bg-blue-100 text-blue-700",
  Bracing:     "bg-sky-100 text-sky-700",
  Chilly:      "bg-cyan-100 text-cyan-700",
  Cool:        "bg-teal-100 text-teal-700",
  Mild:        "bg-emerald-100 text-emerald-700",
  Warm:        "bg-amber-100 text-amber-700",
  Balmy:       "bg-yellow-100 text-yellow-700",
  Hot:         "bg-orange-100 text-orange-700",
  Sweltering:  "bg-red-100 text-red-700",
  Scorching:   "bg-rose-100 text-rose-700",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function WeatherForecastList({
  forecasts,
}: {
  forecasts: WeatherForecast[];
}) {
  if (forecasts.length === 0) {
    return (
      <div className="mt-panel p-6 text-center text-ink-sub">
        No forecasts available. Is the API running?
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {forecasts.map((f) => (
        <div
          key={f.date}
          className="mt-panel flex items-center justify-between gap-4 px-5 py-4 transition-all hover:border-primary-500"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 text-right font-mono text-3xl font-semibold tracking-tight">
              {f.temperatureC}°
            </div>
            <div className="h-10 w-px bg-edge" />
            <div>
              <div className="text-sm font-medium">{formatDate(f.date)}</div>
              <div className="text-sm text-ink-sub">{f.temperatureF}°F</div>
            </div>
          </div>
          <span className={`rounded-md px-3 py-1 text-xs font-semibold ${BADGE[f.summary] ?? "bg-gray-100 text-gray-700"}`}>
            {f.summary}
          </span>
        </div>
      ))}
    </div>
  );
}
