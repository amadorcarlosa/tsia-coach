"use client";

import type { WeatherForecast } from "./type";

const SUMMARY_COLORS: Record<string, { bg: string; text: string }> = {
  Freezing: { bg: "bg-blue-100", text: "text-blue-700" },
  Bracing: { bg: "bg-sky-100", text: "text-sky-700" },
  Chilly: { bg: "bg-cyan-100", text: "text-cyan-700" },
  Cool: { bg: "bg-teal-100", text: "text-teal-700" },
  Mild: { bg: "bg-emerald-100", text: "text-emerald-700" },
  Warm: { bg: "bg-amber-100", text: "text-amber-700" },
  Balmy: { bg: "bg-yellow-100", text: "text-yellow-700" },
  Hot: { bg: "bg-orange-100", text: "text-orange-700" },
  Sweltering: { bg: "bg-red-100", text: "text-red-700" },
  Scorching: { bg: "bg-rose-100", text: "text-rose-700" },
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
  return (
    <div className="grid gap-3">
      {forecasts.map((f) => {
        const colors = SUMMARY_COLORS[f.summary] ?? {
          bg: "bg-gray-100",
          text: "text-gray-700",
        };
        return (
          <div
            key={f.date}
            className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-card px-5 py-4 shadow-sm transition-colors hover:border-teal-primary"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl font-semibold tracking-tight font-mono w-16 text-right">
                {f.temperatureC}°
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="text-[0.9375rem] font-medium">
                  {formatDate(f.date)}
                </div>
                <div className="text-sm text-text-secondary">
                  {f.temperatureF}°F
                </div>
              </div>
            </div>
            <span
              className={`rounded-lg px-3 py-1 text-xs font-semibold ${colors.bg} ${colors.text}`}
            >
              {f.summary}
            </span>
          </div>
        );
      })}
    </div>
  );
}
