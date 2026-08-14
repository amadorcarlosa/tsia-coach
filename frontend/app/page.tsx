import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScaffoldDemo from "./components/ScaffoldDemo";

const AREAS = [
  {
    num: "01",
    color: "text-accent-purple",
    title: "Quantitative reasoning",
    desc: "Ratios, percents, proportional change, unit rates.",
    count: "9 walkthroughs",
  },
  {
    num: "02",
    color: "text-accent-blue",
    title: "Algebraic reasoning",
    desc: "Linear equations, expressions from words, systems.",
    count: "14 walkthroughs",
  },
  {
    num: "03",
    color: "text-accent-pink",
    title: "Geometry & measurement",
    desc: "Area, volume, similarity, the coordinate plane.",
    count: "8 walkthroughs",
  },
  {
    num: "04",
    color: "text-accent-orange",
    title: "Probability & statistics",
    desc: "Reading data, center and spread, simple probability.",
    count: "6 walkthroughs",
  },
];

const PHASES = [
  {
    n: 1,
    title: "Name the unknown",
    desc: "Say what the letter stands for, in words, before touching any symbols.",
  },
  {
    n: 2,
    title: "Translate the phrases",
    desc: "Map each piece of English to a fragment of algebra. One phrase at a time.",
  },
  {
    n: 3,
    title: "Assemble",
    desc: "Snap the fragments together into the expression the question is asking for.",
  },
  {
    n: 4,
    title: "Check against the choices",
    desc: "Find your expression among A–D, and see why the other three are there.",
  },
];

export default function Home() {
  return (
    <>
      {/* Accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-teal-primary via-sky-400/60 to-transparent" />

      <Navbar />

      {/* Hero */}
      <section className="mx-auto grid max-w-[1200px] gap-14 px-6 pt-18 pb-14 items-center"
               style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))" }}>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted mb-5">
            TSIA2 · College readiness math
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.05]">
            The TSI is a gate.
          </h1>
          <h1 className="mt-2.5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.05] text-teal-hover">
            Not a measure.
          </h1>
          <p className="mt-6 max-w-[440px] text-lg leading-relaxed text-text-secondary">
            You already know more math than this test is asking for. Step through
            it once with the scaffolding in place, clear the gate, and get on
            with your degree.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button className="rounded-xl bg-teal-primary px-5.5 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-hover active:bg-teal-active cursor-pointer">
              Take the 12-question diagnostic →
            </button>
            <button className="rounded-xl border border-border-strong px-5 py-3 text-base font-medium text-text-primary transition-colors hover:border-teal-primary hover:bg-teal-light cursor-pointer">
              Watch a walkthrough
            </button>
          </div>
          <div className="mt-5 text-sm text-text-muted">
            No account needed for the diagnostic. Takes about 15 minutes.
          </div>
        </div>

        <ScaffoldDemo />
      </section>

      {/* Score band */}
      <section className="border-y border-border bg-surface-card">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-11 gap-y-8 px-6 py-10">
          <div className="flex items-baseline gap-4.5">
            <div>
              <div className="text-[2.5rem] font-semibold tracking-tight text-text-muted">910</div>
              <div className="text-sm text-text-secondary">typical placement</div>
            </div>
            <div className="text-2xl text-text-faint">→</div>
            <div>
              <div className="text-[2.5rem] font-semibold tracking-tight text-teal-hover">950</div>
              <div className="text-sm text-text-secondary">college ready</div>
            </div>
          </div>
          <div className="hidden sm:block w-px min-h-16 self-stretch bg-border" />
          <div>
            <p className="max-w-[560px] text-base leading-relaxed text-text-secondary">
              Forty points is the difference between a semester of developmental
              math and starting the course you actually enrolled for. It is a gap
              in scaffolding, not in ability.
            </p>
            <Link href="#how" className="mt-3 inline-block text-[0.9375rem] font-medium">
              See how a walkthrough is built →
            </Link>
          </div>
        </div>
      </section>

      {/* Reporting categories */}
      <section id="areas" className="mx-auto max-w-[1200px] px-6 pt-16 pb-2">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
          What&apos;s on the test · 4 areas
        </div>
        <h2 className="mt-3.5 text-[2rem] font-semibold tracking-tight leading-snug">
          Twenty questions. Four reporting categories.
        </h2>
        <div
          className="mt-8 grid gap-4.5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}
        >
          {AREAS.map((a) => (
            <div
              key={a.num}
              className="rounded-xl border border-border bg-surface-card p-5.5 shadow-sm transition-colors hover:border-teal-primary"
            >
              <div className={`font-mono text-xs ${a.color}`}>{a.num}</div>
              <div className="mt-2.5 text-lg font-semibold">{a.title}</div>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-secondary">
                {a.desc}
              </p>
              <div className="mt-4 text-[0.8125rem] text-text-muted">{a.count}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Phases */}
      <section id="how" className="mx-auto max-w-[1200px] px-6 pt-16 pb-20">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
          Phase outline · 4 steps total
        </div>
        <h2 className="mt-3.5 text-[2rem] font-semibold tracking-tight leading-snug">
          Every walkthrough runs the same four phases.
        </h2>
        <p className="mt-3.5 max-w-[640px] text-lg leading-relaxed text-text-secondary">
          You act at each one. The scaffold holds the parts you are not working
          on yet, so the only thing in front of you is the step you are actually
          doing.
        </p>

        <div
          className="mt-9 grid overflow-hidden rounded-2xl border border-border bg-border"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: "1px" }}
        >
          {PHASES.map((p) => (
            <div key={p.n} className="bg-surface-card p-6">
              <div className="flex size-7 items-center justify-center rounded-full bg-teal-lighter text-sm font-semibold text-teal-active">
                {p.n}
              </div>
              <div className="mt-3.5 text-[1.0625rem] font-semibold">{p.title}</div>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-secondary">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
