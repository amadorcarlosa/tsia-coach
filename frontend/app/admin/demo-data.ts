export const SYSTEM_PROMPT = "You are the Tutor agent for TSIA Coach. The student is mid-phase in a scaffolded walkthrough. Answer only the phase in front of them. Never give the final answer. Return one hint, at most two sentences.";

export const SESSION = {
  student: "I don't get where the 3 goes. Is it 3(2w) or 2w + 3?",
  tutor: "Read the phrase left to right and hold the order: “three more than” tells you something gets added at the end. What does “twice the number” give you on its own, before the three shows up?",
  meta: "1.24s · 412 in · 58 out · $0.0021",
  structuredOutput: `{
  "hint": "…",
  "revealsAnswer": false,
  "phase": 2,
  "misconception": "order-of-operations-in-translation"
}`,
};

export const STEPS = [
  { kind: "plan", title: "Read item 2 and identify the unknown", dur: "0.42s", body: "unknown: w = loaves sold last year\ntarget: expression for loaves sold next year\nreporting category: algebraic reasoning" },
  { kind: "tool", title: 'getItem("staar-2025-02")', dur: "0.11s", body: `{\n  "id": "staar-2025-02",\n  "stem": "Last year, a bakery sold w loaves…",\n  "choices": ["2w + 3", "4w + 6", "2(w + 3)", "4w + 3"],\n  "key": "B"\n}` },
  { kind: "model", title: "Translate phrases to algebra fragments", dur: "2.90s", body: '"loaves sold last year"      → w\n"twice the number"           → 2w\n"three more than twice"      → 2w + 3\n"twice the number this year" → 2(2w + 3) = 4w + 6' },
  { kind: "tool", title: 'validateExpression("4w + 6", key: "B")', dur: "0.08s", body: '{ "valid": true, "matchesKey": true, "distractorsExplained": 3 }' },
  { kind: "model", title: "Emit 4 phases + distractor rationales", dur: "3.24s", body: "phases: [name-the-unknown, translate, assemble, check-choices]\ndistractors:\n  A 2w + 3   → stopped at this year\n  C 2(w + 3) → grouped before doubling\n  D 4w + 3   → doubled the 3 away" },
] as const;

export const AGENTS = [
  { name: "Scaffold Author", description: "Writes phases for an item" },
  { name: "Tutor", description: "Live hints inside a phase" },
] as const;

export const RECENT_RUNS = [
  { id: "run_4c1e", status: "ok" },
  { id: "run_4c1d", status: "ok" },
  { id: "run_4c1a", status: "fail" },
] as const;

export const RUN_SUMMARY = {
  id: "run_4c1e",
  model: "gpt-5.6-sol",
  started: "14:02:11",
  duration: "6.8s",
  tokens: "3,410 / 1,120",
  cost: "$0.0143",
} as const;
