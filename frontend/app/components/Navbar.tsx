import Link from "next/link";

export default function Navbar() {
  return (
    <header className="mt-overlay sticky top-0 z-40 border-b border-edge">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4">
        <Link href="/" className="flex items-baseline gap-0.5 no-underline">
          <span className="text-lg font-semibold tracking-tight text-ink">
            TSIA
          </span>
          <span className="text-lg font-semibold tracking-tight text-primary-600 border-b-2 border-primary-500 pb-px">
            Coach
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
          <Link href="/#how" className="text-ink-sub hover:text-ink transition-colors no-underline">
            How it works
          </Link>
          <Link href="/#areas" className="text-ink-sub hover:text-ink transition-colors no-underline">
            What&apos;s on the test
          </Link>
        </nav>

        <div className="flex items-center gap-3.5">
          <Link href="#" className="text-sm text-ink-sub hover:text-ink transition-colors no-underline">
            Log in
          </Link>
          <button className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white cursor-pointer border-0 transition-colors hover:bg-primary-600 active:bg-primary-700">
            Start free
          </button>
        </div>
      </div>
    </header>
  );
}
