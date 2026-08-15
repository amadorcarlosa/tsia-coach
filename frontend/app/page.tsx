import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScaffoldDemo from "./components/ScaffoldDemo";

const AREAS: { num: string; color: string; title: string; desc: string; count: string }[] = [
  { num: "01", color: "text-purple-500",  title: "Quantitative reasoning",  desc: "Ratios, percents, proportional change, unit rates.", count: "9 walkthroughs" },
  { num: "02", color: "text-blue-600",    title: "Algebraic reasoning",     desc: "Linear equations, expressions from words, systems.", count: "14 walkthroughs" },
  { num: "03", color: "text-pink-500",    title: "Geometry & measurement",  desc: "Area, volume, similarity, the coordinate plane.", count: "8 walkthroughs" },
  { num: "04", color: "text-orange-500",  title: "Probability & statistics", desc: "Reading data, center and spread, simple probability.", count: "6 walkthroughs" },
];

const PHASES = [
  { n: 1, title: "Name the unknown",         desc: "Say what the letter stands for, in words, before touching any symbols." },
  { n: 2, title: "Translate the phrases",     desc: "Map each piece of English to a fragment of algebra. One phrase at a time." },
  { n: 3, title: "Assemble",                  desc: "Snap the fragments together into the expression the question is asking for." },
  { n: 4, title: "Check against the choices", desc: "Find your expression among A–D, and see why the other three are there." },
];

export default function Home() {
  return (
    <>
      <div className="mt-accent-strip" />
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="w-full mx-auto max-w-page px-6 pt-20 pb-16">
        <div
          className="grid gap-14 items-center"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))" }}
        >
          <div>
            <div className="mt-eyebrow mb-5">TSIA2 · College readiness math</div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
              The TSI is a gate.
            </h1>
            <h1 className="mt-2.5 text-4xl sm:text-5xl font-semibold tracking-tight leading-none text-primary-600">
              Not a measure.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-sub">
              You already know more math than this test is asking for. Step through
              it once with the scaffolding in place, clear the gate, and get on
              with your degree.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button className="rounded-lg bg-primary-500 px-5 py-3 text-base font-semibold text-white cursor-pointer border-0 transition-colors hover:bg-primary-600 active:bg-primary-700">
                Take the 12-question diagnostic →
              </button>
              <button className="rounded-lg border border-edge-strong px-5 py-3 text-base font-medium text-ink cursor-pointer bg-transparent transition-colors hover:border-primary-500 hover:bg-primary-500/8">
                Watch a walkthrough
              </button>
            </div>
            <div className="mt-5 text-sm text-ink-muted">
              No account needed for the diagnostic. Takes about 15 minutes.
            </div>
          </div>

          <ScaffoldDemo />
        </div>
      </section>

      {/* ─── Score band ─── */}
      <section className="border-t border-b border-edge bg-bg-elevated">
        <div className="mx-auto flex max-w-page flex-wrap items-center gap-x-11 gap-y-8 px-6 py-10">
          <div className="flex items-baseline gap-4">
            <div>
              <div className="text-4xl font-semibold tracking-tight text-ink-muted">910</div>
              <div className="text-sm text-ink-sub">typical placement</div>
            </div>
            <div className="text-2xl text-ink-faint">→</div>
            <div>
              <div className="text-4xl font-semibold tracking-tight text-primary-600">950</div>
              <div className="text-sm text-ink-sub">college ready</div>
            </div>
          </div>
          <div className="hidden sm:block w-px min-h-16 self-stretch bg-edge" />
          <div>
            <p className="max-w-lg text-base leading-relaxed text-ink-sub">
              Forty points is the difference between a semester of developmental
              math and starting the course you actually enrolled for. It is a gap
              in scaffolding, not in ability.
            </p>
            <Link
              href="#how"
              className="mt-3 inline-block text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              See how a walkthrough is built →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Reporting categories ─── */}
      <section id="areas" className="w-full mx-auto max-w-page px-6 pt-20 pb-4">
        <div className="mt-eyebrow">What&apos;s on the test · 4 areas</div>
        <h2 className="mt-3.5 text-3xl font-semibold tracking-tight leading-snug">
          Twenty questions. Four reporting categories.
        </h2>
        <div
          className="mt-8 grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}
        >
          {AREAS.map((a) => (
            <div key={a.num} className="mt-panel p-5 transition-all hover:border-primary-500">
              <div className={`font-(--font-code) text-xs ${a.color}`}>{a.num}</div>
              <div className="mt-2.5 text-lg font-semibold">{a.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-sub">{a.desc}</p>
              <div className="mt-4 text-xs text-ink-muted">{a.count}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Phases ─── */}
      <section id="how" className="w-full mx-auto max-w-page px-6 pt-20 pb-24">
        <div className="mt-eyebrow">Phase outline · 4 steps total</div>
        <h2 className="mt-3.5 text-3xl font-semibold tracking-tight leading-snug">
          Every walkthrough runs the same four phases.
        </h2>
        <p className="mt-3.5 max-w-xl text-lg leading-relaxed text-ink-sub">
          You act at each one. The scaffold holds the parts you are not working
          on yet, so the only thing in front of you is the step you are actually
          doing.
        </p>

        <div
          className="mt-9 grid overflow-hidden rounded-xl border border-edge bg-edge"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
            gap: "1px",
          }}
        >
          {PHASES.map((p) => (
            <div key={p.n} className="bg-bg-elevated p-6">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500/12 text-sm font-semibold text-primary-700">
                {p.n}
              </div>
              <div className="mt-3.5 text-base font-semibold">{p.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-sub">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
