export default function ScaffoldDemo() {
  return (
    <div className="mt-board p-7">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="mt-eyebrow">Algebraic reasoning · Phase 2 of 4</div>
        <div className="flex gap-1">
          <div className="h-1 w-7 rounded-full bg-primary-500" />
          <div className="h-1 w-7 rounded-full bg-primary-500" />
          <div className="h-1 w-7 rounded-full bg-edge" />
          <div className="h-1 w-7 rounded-full bg-edge" />
        </div>
      </div>

      {/* Problem stem */}
      <p className="text-base leading-relaxed text-ink">
        Last year, a bakery sold{" "}
        <span className="font-semibold text-purple-500">w</span> loaves of
        bread. This year, the bakery sold{" "}
        <span className="rounded-sm bg-orange-500/12 px-1 py-0.5 font-semibold text-orange-500">
          three more than twice
        </span>{" "}
        the number of loaves sold last year.
      </p>

      {/* Instruction */}
      <div className="mt-6 text-xs font-semibold text-ink-muted tracking-wide">
        Match each phrase to its algebra.
      </div>

      {/* Phrase rows */}
      <div className="mt-3 grid gap-2.5">
        <PhraseRow label="loaves sold last year" expr="w" />
        <PhraseRow label="twice that number" expr="2w" />
        <PhraseRow label="three more than twice" expr="2w + 3" active />
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <button className="rounded-lg border border-edge-strong px-3.5 py-2 text-sm font-medium text-ink-sub cursor-pointer bg-transparent transition-colors hover:border-coral-500 hover:text-coral-600">
          I&apos;m stuck
        </button>
        <button className="rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white cursor-pointer border-0 transition-colors hover:bg-primary-600">
          Next phase →
        </button>
      </div>
    </div>
  );
}

function PhraseRow({
  label,
  expr,
  active,
}: {
  label: string;
  expr: string;
  active?: boolean;
}) {
  const wrapperClass = active
    ? "border border-primary-500 bg-primary-500/6 rounded-xl px-3.5 py-2.5"
    : "border border-edge bg-bg-elevated/86 rounded-xl px-3.5 py-2.5";

  return (
    <div className={`mt-tracks-phrase-row grid items-center gap-3.5 ${wrapperClass}`}>
      <span className={`text-sm ${active ? "font-medium text-ink" : "text-ink-sub"}`}>
        {label}
      </span>
      <span className={active ? "text-primary-500" : "text-ink-faint"}>→</span>
      {active ? (
        <span className="text-center rounded-md border border-primary-500 bg-bg-elevated py-0.5 font-math text-xl text-ink">
          {expr}
        </span>
      ) : (
        <span className="text-center rounded-md bg-purple-500/8 py-0.5 font-math text-xl text-purple-500">
          {expr}
        </span>
      )}
    </div>
  );
}
