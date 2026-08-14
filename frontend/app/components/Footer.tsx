import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-card">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-4 px-6 py-8 text-sm text-text-muted">
        <div>TSIA Coach · Built on the MathTabla scaffold system</div>
        <div className="flex gap-6">
          <Link href="#" className="text-text-muted hover:text-text-primary transition-colors">
            Accessibility
          </Link>
          <Link href="#" className="text-text-muted hover:text-text-primary transition-colors">
            Privacy
          </Link>
          <Link href="#" className="text-text-muted hover:text-text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
