import { SYSTEM_PROMPT } from "./demo-data";

export default function SystemPromptCard() {
  return <section className="mt-panel p-[18px]"><h2 className="mt-eyebrow">System prompt</h2><div className="mt-3 min-h-33 rounded-md border border-edge bg-bg-inset px-3 py-2.5 font-(--font-code) text-xs leading-relaxed text-ink-sub">{SYSTEM_PROMPT}</div><div className="mt-3 flex items-center justify-between gap-3 text-xs text-ink-muted"><span className="font-(--font-code)">tutor/hint · v7</span><button className="font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-primary-500">Edit in prompts →</button></div></section>;
}
