type Tab = "playground" | "runs" | "config";

const TABS: { id: Tab; label: string }[] = [
  { id: "playground", label: "Playground" },
  { id: "runs", label: "Agent runs" },
  { id: "config", label: "Prompts & models" },
];

export default function ConsoleHeader({ tab, onTab }: { tab: Tab; onTab: (tab: Tab) => void }) {
  return (
    <>
      <div className="mt-accent-strip-console" />
      <header className="border-b border-edge bg-bg-elevated">
        <div className="mx-auto flex min-h-15 max-w-console flex-wrap items-center justify-between gap-x-6 gap-y-2.5 px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-0.5 font-semibold"><span>TSIA</span><span className="text-primary-600">Coach</span></div>
            <div className="h-5 w-px bg-edge" />
            <div className="mt-eyebrow text-navy-500">Internal · Agent console</div>
          </div>
          <div className="flex items-center gap-3.5 text-xs text-ink-sub">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-600" />Foundry · eastus2</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-500/16 font-semibold text-navy-700">CA</span>
          </div>
        </div>
        <nav aria-label="Agent console sections" className="mx-auto flex max-w-console flex-wrap gap-1 px-6">
          {TABS.map((item) => (
            <button key={item.id} onClick={() => onTab(item.id)} className={`border-b-2 px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${tab === item.id ? "border-primary-500 text-ink" : "border-transparent text-ink-sub hover:border-primary-500/40 hover:bg-primary-500/8 hover:text-ink"}`}>
              {item.label}
            </button>
          ))}
        </nav>
      </header>
    </>
  );
}
