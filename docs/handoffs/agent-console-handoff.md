# Handoff: TSIA Coach agent console (`/admin`) — design → Next.js

## Repo, references, and what already exists

Repo: `C:\Users\amado\code\tsia-coach\tsia-coach`, app: `frontend/` (Next.js 16, App Router, Tailwind 4).
Design reference: `docs/handoffs/tsia-coach-console-design.dc.html` in this repo (a local copy of `TSIA Coach.dc.html` from the Claude Design project). **Read it first.** It contains two screens behind `sc-if` blocks: the landing page (`isLanding` — already ported to the repo, do not touch) and the **admin agent console** (`isAdmin` — your job). The `<script data-dc-script>` block at the bottom holds the demo data (CATALOG, STEPS, LIFECYCLE, KIND) and the interaction logic (`renderVals()`); treat it as the behavioral spec.

dc-format primer so you can read the file: `<sc-if value="{{ x }}">` = conditional render; `<sc-for list="{{ xs }}" as="x">` = map; `{{ }}` = binding; `style-hover=` / `style-active=` = hover/active styles; inline styles in the design become **token utilities** in the port, never inline styles.

Already in the repo, to be reused as-is:

- Landing port conventions: see `frontend/app/page.tsx`, `app/components/Navbar.tsx` — server components, Tailwind utilities over tokens (`text-ink-sub`, `border-edge`, `bg-bg-elevated`, `text-primary-600`, `font-(--font-code)`), recipes `mt-panel` / `mt-eyebrow` / `mt-accent-strip` / `mt-overlay`, responsive `auto-fit` grids via one inline `gridTemplateColumns` (the accepted dynamic-value escape hatch).
- Design law: `nextjs-handoff/CONSTRAINTS.md` in the design project — **every visual value comes from a token**; ESLint enforces it; sentence case copy; hover = border/tint only, no shadow/transform changes; focus ring `primary-500` never removed. Where CONSTRAINTS.md and the repo's `globals.css` disagree on token names (`line` vs `edge`, `ink-muted` vs `ink-sub`), **the repo's `globals.css` is ground truth**.
- The typed models contract: `frontend/lib/api/models.ts` exports `FoundryDeployment` (generated from the server's OpenAPI spec) and `getModels()`. `app/api/models/route.ts` proxies to ASP.NET. **Never redeclare model types; never edit `lib/api/schema.d.ts` (generated).**

## The point of this feature (read before coding)

The console's "Prompts & models" tab is the UI face of the contract-drift pipeline: it renders the real `FoundryDeployments.All` catalog through the generated types. The design's hardcoded `CATALOG` is a mock of that data — in the implementation, the **deployment picker and the deployments table consume live `FoundryDeployment[]`**, and every mapping over `lifecycle` / `features` must be an **exhaustive Record over the generated union** (no `default`, no index-signature) so that a new enum member on the server becomes a TypeScript compile error here. That is the acceptance bar, not a nice-to-have.

Everything else on the console (playground chat, system prompt, parameters, agent runs timeline) has **no backend yet** — port it as static demo content, copied verbatim from the design script's data.

## Decisions already made (do not relitigate)

1. **Route**: `app/admin/page.tsx`. The floating Landing/Admin pill switcher at the bottom of the design is a design-preview affordance — **do not build it**. No link from the landing page; the route is reached by URL.
2. **Data flow**: `page.tsx` is a server component that fetches `${process.env.API_URL}/api/models` directly (BFF route is for the browser; server components go straight to the API) with `{ next: { revalidate: 700 } }` — matching the revalidate the BFF route uses. Type the parsed body as `FoundryDeployment[]` and pass it to a `"use client"` `<AdminConsole models={…}>`.
3. **API-down behavior**: the console must render, not crash. If the fetch fails or `API_URL` is unset, pass `models: []`; the picker shows a muted "No deployments available" state and the table shows one full-width muted row saying the API is unreachable.
4. **Grouping rule** for the picker: group by `provider`, except deployments whose `operations` includes `"Embedding"` go to a group labeled `Embeddings` (this reproduces the design's four groups from real data).
5. **New tokens** (the sanctioned "add the token first" path from CONSTRAINTS.md — add to `globals.css` `@theme`, nowhere else):
   - `--max-width-console: 1440px` (CONSTRAINTS names `max-w-console`; it doesn't exist in the repo yet)
   - `--color-navy-500: #567daf`, `--color-navy-700: #334f76` (console identity: eyebrow, avatar, plan-step badge)
   - `--color-amber-500: #f59e0b`, `--color-amber-700: #b45309` (Preview badge, tool-step badge)
   - `--color-slate-500: #64748b`, `--color-slate-600: #475569` (Legacy badge)
   - One new recipe in `@layer components`: `.mt-accent-strip-console` — same 2px strip as `.mt-accent-strip` but `navy-500 → primary-500/60 → transparent` (the design's admin header strip).
   `tokens.css` is synced from the design system — **do not edit it**.
6. **Demo data** lives in one file, `app/admin/demo-data.ts`, copied **verbatim** from the design script: the system prompt text ("You are the Tutor agent for TSIA Coach…"), the session messages (student question, tutor reply, latency/token/cost meta `1.24s · 412 in · 58 out · $0.0021`), the structured-output JSON block, the 5 STEPS entries with their `body` strings, the run summary (`run_4c1e · gpt-5.6-sol · started 14:02:11 · 6.8s`, tokens `3,410 / 1,120`, cost `$0.0143`), agents list, and recent runs. Do not invent or "improve" copy.

## File plan

```
app/admin/
  page.tsx              server component: fetch models, render <AdminConsole>
  AdminConsole.tsx      "use client" — owns tab state; renders header + active tab
  ConsoleHeader.tsx     brand, "Internal · Agent console" eyebrow, Foundry status dot,
                        CA avatar, 3-tab bar (Playground / Agent runs / Prompts & models)
  PlaygroundTab.tsx     layout shell for the three playground columns
  DeploymentPicker.tsx  grouped dropdown, selected card, deprecated warning, feature chips
  SystemPromptCard.tsx  static prompt + "tutor/hint · v7" footer
  ParametersCard.tsx    static sliders (Temperature 0.3 @30%, Max tokens 1024 @52%) + toggles
  SessionPanel.tsx      chat transcript, structured-output block, composer (visual only)
  RunsTab.tsx           agents sidebar + recent runs + run summary card
  StepTimeline.tsx      5-step accordion timeline (single-open, index 2 open by default)
  ConfigTab.tsx         deployments table + hide-deprecated toggle
  demo-data.ts          all static demo content (see decision 6)
lib/api/
  model-presentation.ts lifecycle badge map + feature label map (exhaustive Records)
```

Components stay under `app/admin/` (route-private); `app/components/` is shared landing chrome only.

## The contract-typed presentation maps (`lib/api/model-presentation.ts`)

```ts
import type { FoundryDeployment } from "./models";

type Lifecycle = FoundryDeployment["lifecycle"];
type Feature = FoundryDeployment["features"][number];

// Exhaustive on purpose: a new server-side enum member must fail compilation here.
export const LIFECYCLE_BADGE: Record<Lifecycle, { label: string; className: string }> = {
  GenerallyAvailable: { label: "GA",         className: "bg-primary-500/14 text-primary-700" },
  Preview:            { label: "Preview",    className: "bg-amber-500/16 text-amber-700" },
  Legacy:             { label: "Legacy",     className: "bg-slate-500/16 text-slate-600" },
  Deprecated:         { label: "Deprecated", className: "bg-coral-500/16 text-coral-600" },
};

export const FEATURE_LABEL: Record<Feature, string> = {
  ToolCalling: "tool calling",
  StructuredOutput: "structured output",
  Reasoning: "reasoning",
  FileInput: "file input",
  ComputerUse: "computer use",
  JsonOutput: "json output",
};
```

(Adjust utility spellings to whatever the lint setup accepts — the *shape* (exhaustive `Record`, no default) is the requirement. Field names come from the generated schema — check `lib/api/schema.d.ts` for exact casing of `id`, `modelVersion`, `lifecycle`, `features`, `operations`, `provider` before writing code.)

Meta line in picker rows and table: `` `${id} · ${modelVersion}` `` in `font-(--font-code)`.

## Fidelity checklist per tab (cross-check each against the design file)

**Console header** (all tabs): white elevated bar, bottom border; left — TSIA Coach wordmark, 1px divider, navy eyebrow "Internal · Agent console"; right — green status dot + "Foundry · eastus2", 28px round navy-tinted "CA" avatar. Below: the 3 tabs, active = 2px `primary-500` underline + full ink, inactive = `ink-sub`. Console content wraps in `max-w-console` with `px-6`.

**Playground**: flex layout, sidebar column `flex: 1 1 300px; max-width 340px`, chat `flex: 999 1 420px` (wraps on small screens — mirror the landing's escape-hatch pattern for these two flex values). Sidebar cards are `mt-panel p-4/p-[18px]`-equivalents: Deployment (picker), System prompt, Parameters. Chat panel: header row (Session · `sess_8f21c4 · item 2 · phase 2` mono · Attach item / Clear ghost buttons), transcript (student bubble right-aligned with `primary` tint + border; tutor bubble left on inset background; meta row in mono; dashed-border structured-output block with `pre` JSON), composer row (input + teal Run button — **visual only**, no send behavior; disable the button with a `title="Not wired up yet"`).
Picker behavior: click opens dropdown (absolute, `z-index` above content, max-height scroll); groups with uppercase provider headers; each row = displayName + mono meta + lifecycle badge; picking closes it; selected card shows displayName + mono id + `▾`; feature chips under the card from `FEATURE_LABEL`; when the selected deployment's `lifecycle === "Deprecated"`, show the coral warning banner ("This deployment is deprecated. Retirement is scheduled — move traffic to a GA deployment before shipping."). Default selection: first deployment in the list.

**Agent runs**: left sidebar `mt-panel` — "Agents" eyebrow, Scaffold Author (selected state: `primary` tint + border) and Tutor rows, divider, "Recent runs" eyebrow, three mono rows (`run_4c1e ok` green / `run_4c1d ok` / `run_4c1a fail` red). Right column: run summary card (title + green "completed" chip, mono meta line, right-aligned Tokens and Est. cost stats) and the timeline card: "Step timeline · 5 steps" eyebrow; each step = dot column (teal dot, 1px connector) + row (kind chip `plan`/`tool`/`model` in navy/amber/teal tints, title, mono duration, chevron); clicking toggles the body (mono, `pre-wrap`, inset panel); **single-open accordion, step 3 (index 2) open initially**.

**Prompts & models**: one `mt-panel` with `overflow-x-auto`; header row — "Foundry deployments" + subtitle `Mirrors FoundryDeployments.All on the server.` (mono for the identifier) and the functional **Hide deprecated** toggle (client state, `role="switch"`, `aria-checked`); grid table `min-width: 760px`, columns `1.4fr 1fr 0.7fr 0.8fr 1.6fr`: Deployment (displayName + mono id), Version (mono), Provider, Lifecycle (badge), Features (chips). Row hover = inset background tint only.

**Accessibility**: real `<button>`s everywhere; dropdown trigger `aria-expanded` + `aria-haspopup="listbox"`; timeline rows `aria-expanded`; focus-visible ring `primary-500` on all interactive elements.

## Hard constraints

- Token-only styling. `npm run lint` must pass **with no new eslint-disables** except the documented dynamic-value escape hatch (flex-basis/grid-template strings), each with a reason comment — exactly like `page.tsx` does today.
- Do not modify: landing components, `app/api/**`, `lib/api/schema.d.ts`, `lib/api/models.ts`, `app/tokens.css`, `layout.tsx`, `weather/**`. `globals.css` may gain **only** the tokens and recipe in decision 5.
- No new npm dependencies. No emoji in UI copy; sentence case throughout.
- **Never kill any process you did not start.** Do not start the Aspire AppHost or the .NET server. You may run `npm run lint`, `npx tsc --noEmit`, `npm run build`, and you may start `next dev` on a free port for visual verification — stopping only the process you yourself started. If something holds a file lock, stop and report it; do not clear it.
- Commit only the files this handoff names.

## Acceptance checks (run all; report results verbatim)

1. `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass in `frontend/`.
2. Exhaustiveness proof: paste the final `LIFECYCLE_BADGE` / `FEATURE_LABEL` declarations in your report, and confirm they're keyed by the generated union (hover types or `tsc` accepting `Record<Lifecycle, …>` with all four/six keys and failing if one is removed — try removing one key, observe the error, restore it).
3. With the API reachable: `/admin` picker and table show the real 11 deployments in 4 groups; `DeepSeek-R1-0528` wears the coral Deprecated badge; selecting it shows the warning banner; the Hide deprecated toggle removes it from the table (and from the picker groups).
4. With `API_URL` unset: `/admin` still renders with the empty states from decision 3 — no crash, no unhandled rejection in the console.
5. Tabs, picker open/pick/close, timeline accordion (single-open), and the toggle all work with keyboard focus visible.
6. Screenshot (or describe precisely) each of the three tabs for review, and list every deviation from the design file with a one-line reason.
