"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FoundryDeployment } from "../../lib/api/models";
import { FEATURE_LABEL, LIFECYCLE_BADGE } from "../../lib/api/model-presentation";

export default function DeploymentPicker({ models, hideDeprecated, selected, onSelect }: { models: FoundryDeployment[]; hideDeprecated: boolean; selected?: FoundryDeployment; onSelect: (model: FoundryDeployment) => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const available = useMemo(() => models.filter((model) => !(hideDeprecated && model.lifecycle === "Deprecated")), [models, hideDeprecated]);
  const groups = useMemo(() => {
    const grouped = new Map<string, FoundryDeployment[]>();
    for (const model of available) {
      const group = model.operations.includes("Embedding") ? "Embeddings" : model.provider;
      grouped.set(group, [...(grouped.get(group) ?? []), model]);
    }
    return [...grouped.entries()];
  }, [available]);

  useEffect(() => {
    const close = (event: MouseEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (!selected) return <div className="mt-3 rounded-md border border-edge bg-bg-inset px-3 py-4 text-sm text-ink-muted">No deployments available</div>;
  return (
    <div ref={root}>
      <div className="relative mt-3">
        <button aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-3 rounded-md border border-edge-strong bg-bg-elevated px-3 py-2.5 text-left transition-colors hover:border-primary-500 hover:bg-primary-500/4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
          <span className="grid gap-0.5"><span className="text-sm font-semibold">{selected.displayName}</span><span className="font-(--font-code) text-[0.6875rem] text-ink-muted">{selected.id}</span></span>
          <span className="text-xs text-ink-muted">▾</span>
        </button>
        {open && (
          <div role="listbox" className="absolute inset-x-0 top-[calc(100%+6px)] z-60 max-h-105 overflow-y-auto rounded-lg border border-edge bg-bg-elevated p-1.5 shadow-lg">
            {groups.map(([group, items]) => <div key={group}><div className="px-2.5 pb-1 pt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">{group}</div>{items.map((model) => { const modelBadge = LIFECYCLE_BADGE[model.lifecycle]; return <button role="option" aria-selected={model.id === selected.id} key={model.id} onClick={() => { onSelect(model); setOpen(false); }} className="flex w-full items-center justify-between gap-2.5 rounded-md px-2.5 py-2 text-left hover:bg-primary-500/8 focus-visible:outline-2 focus-visible:outline-primary-500"><span className="min-w-0"><span className="block text-sm font-medium">{model.displayName}</span><span className="block truncate font-(--font-code) text-[0.6875rem] text-ink-muted">{model.id} · {model.modelVersion}</span></span><span className={`shrink-0 rounded-sm px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider ${modelBadge.className}`}>{modelBadge.label}</span></button>; })}</div>)}
          </div>
        )}
      </div>
      {selected.lifecycle === "Deprecated" && <div className="mt-3 rounded-md border border-coral-500/40 bg-coral-500/10 px-3 py-2.5 text-xs leading-relaxed text-coral-600">This deployment is deprecated. Retirement is scheduled — move traffic to a GA deployment before shipping.</div>}
      <div className="mt-3.5 flex flex-wrap gap-1.5">{selected.features.map((feature) => <span key={feature} className="rounded-sm bg-bg-inset px-2 py-1 text-[0.6875rem] font-medium text-ink-sub">{FEATURE_LABEL[feature]}</span>)}</div>
    </div>
  );
}
