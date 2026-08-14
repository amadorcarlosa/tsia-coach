import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/88 backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 min-h-16">
        <Link href="/" className="flex items-baseline gap-0.5">
          <span className="text-lg font-semibold tracking-tight text-text-primary">
            TSIA
          </span>
          <span className="text-lg font-semibold tracking-tight text-teal-primary border-b-2 border-teal-primary pb-px">
            Coach
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.9375rem] text-text-secondary">
          <Link href="#how" className="hover:text-text-primary transition-colors">
            How it works
          </Link>
          <Link href="#areas" className="hover:text-text-primary transition-colors">
            What&apos;s on the test
          </Link>
          <Link href="/weather" className="hover:text-text-primary transition-colors">
            Weather demo
          </Link>
        </nav>

        <div className="flex items-center gap-3.5">
          <Link
            href="#"
            className="text-[0.9375rem] text-text-secondary hover:text-text-primary transition-colors"
          >
            Log in
          </Link>
          <button className="rounded-xl bg-teal-primary px-4 py-2.5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-teal-hover active:bg-teal-active cursor-pointer">
            Start free
          </button>
        </div>
      </div>
    </header>
  );
}
