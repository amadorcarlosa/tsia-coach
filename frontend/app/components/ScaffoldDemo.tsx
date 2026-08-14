export default function ScaffoldDemo() {
  return (
    <div className="rounded-2xl border border-border bg-surface-card p-7 shadow-lg"
         style={{
           backgroundImage:
             "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
           backgroundSize: "32px 32px",
         }}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
          Algebraic reasoning · Phase 2 of 4
        </div>
        <div className="flex gap-1.5">
          <div className="h-1 w-6.5 rounded-full bg-teal-primary" />
          <div className="h-1 w-6.5 rounded-full bg-teal-primary" />
          <div className="h-1 w-6.5 rounded-full bg-border" />
          <div className="h-1 w-6.5 rounded-full bg-border" />
        </div>
      </div>

      {/* Problem stem */}
      <p className="text-[1.0625rem] leading-relaxed text-text-primary">
        Last year, a bakery sold{" "}
        <span className="font-semibold text-accent-purple">w</span> loaves of
        bread. This year, the bakery sold{" "}
        <span className="rounded bg-accent-orange/12 px-1 py-px font-semibold text-accent-orange">
          three more than twice
        </span>{" "}
        the number of loaves sold last year.
      </p>

      {/* Instruction */}
      <div className="mt-6 text-[0.8125rem] font-semibold text-text-muted tracking-wide">
        Match each phrase to its algebra.
      </div>

      {/* Phrase rows */}
      <div className="mt-3 grid gap-2.5">
        <Row label="loaves sold last year" expr="w" />
        <Row label="twice that number" expr="2w" />
        <Row label="three more than twice" expr="2w + 3" active />
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <button className="rounded-xl border border-border-strong px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent-red/60 hover:text-accent-red cursor-pointer">
          I&apos;m stuck
        </button>
        <button className="rounded-xl bg-teal-primary px-4.5 py-2.5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-teal-hover cursor-pointer">
          Next phase →
        </button>
      </div>
    </div>
  );
}

function Row({
  label,
  expr,
  active,
}: {
  label: string;
  expr: string;
  active?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[1fr_auto_128px] items-center gap-3.5 rounded-xl border px-3.5 py-2.5 ${
        active
          ? "border-teal-primary bg-teal-light"
          : "border-border bg-white/86"
      }`}
    >
      <span
        className={`text-[0.9375rem] ${
          active ? "font-medium text-text-primary" : "text-text-secondary"
        }`}
      >
        {label}
      </span>
      <span className={active ? "text-teal-primary" : "text-text-faint"}>→</span>
      <span
        className={`text-center rounded-lg px-0 py-0.5 font-mono text-xl ${
          active
            ? "border border-teal-primary bg-white text-text-primary"
            : "bg-accent-purple/8 text-accent-purple"
        }`}
      >
        {expr}
      </span>
    </div>
  );
}
