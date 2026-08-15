"use client";

import { useState } from "react";
import { STEPS } from "./demo-data";

const KIND_STYLE = { plan: "bg-navy-500/14 text-navy-700", tool: "bg-amber-500/16 text-amber-700", model: "bg-primary-500/14 text-primary-700" } as const;

export default function StepTimeline() {
  const [openStep, setOpenStep] = useState(2);
  return <section className="mt-panel px-5.5 py-5"><h2 className="mt-eyebrow mb-1.5">Step timeline · 5 steps</h2>{STEPS.map((step, index) => { const open = openStep === index; return <div key={step.title} className="grid grid-cols-[20px_1fr] gap-3.5"><div className="flex flex-col items-center"><span className="mt-4 h-2.5 w-2.5 shrink-0 rounded-full bg-primary-500" /><span className="min-h-2 w-px flex-1 bg-edge" /></div><div className="border-b border-edge/60 py-3"><button aria-expanded={open} onClick={() => setOpenStep(open ? -1 : index)} className="flex w-full items-center justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-primary-500"><span className="flex min-w-0 items-center gap-2.5"><span className={`shrink-0 rounded-sm px-1.5 py-0.5 font-(--font-code) text-[0.6875rem] ${KIND_STYLE[step.kind]}`}>{step.kind}</span><span className="text-sm font-medium">{step.title}</span></span><span className="flex shrink-0 items-center gap-3.5 font-(--font-code) text-xs text-ink-muted"><span>{step.dur}</span><span className="text-ink-faint">{open ? "▴" : "▾"}</span></span></button>{open && <pre className="mt-3 whitespace-pre-wrap rounded-md border border-edge bg-bg-inset px-3.5 py-3 font-(--font-code) text-xs leading-relaxed text-ink-sub">{step.body}</pre>}</div></div>; })}</section>;
}
