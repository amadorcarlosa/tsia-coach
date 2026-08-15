function Toggle({ active, label }: { active: boolean; label: string }) {
  return <div className="flex items-center justify-between gap-3 text-sm text-ink-sub"><span>{label}</span><span className={`flex h-5 w-9 items-center rounded-full p-0.5 ${active ? "justify-end bg-primary-500" : "bg-edge-strong"}`}><span className="h-4 w-4 rounded-full bg-bg-elevated" /></span></div>;
}

export default function ParametersCard() {
  return <section className="mt-panel grid gap-4 p-[18px]"><h2 className="mt-eyebrow">Parameters</h2>{[["Temperature", "0.3", "w-[30%]"], ["Max output tokens", "1024", "w-[52%]"]].map(([label, value, width]) => <div key={label}><div className="flex justify-between text-sm"><span className="text-ink-sub">{label}</span><span className="font-(--font-code)">{value}</span></div><div className="mt-2 h-1 rounded-full bg-edge"><div className={`h-1 rounded-full bg-primary-500 ${width}`} /></div></div>)}<Toggle active label="Structured output" /><Toggle active={false} label="Stream" /></section>;
}
