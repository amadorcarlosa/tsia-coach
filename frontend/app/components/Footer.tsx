import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-edge bg-bg-elevated">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-4 px-6 py-8 text-sm text-ink-muted">
        <div>TSIA Coach · Built on the MathTabla scaffold system</div>
        <div className="flex gap-6">
          <Link href="#" className="text-ink-muted hover:text-primary-600 transition-colors">
            Accessibility
          </Link>
          <Link href="#" className="text-ink-muted hover:text-primary-600 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="text-ink-muted hover:text-primary-600 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
