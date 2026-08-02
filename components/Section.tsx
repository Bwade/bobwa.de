/** Shared section shell: hairline rule, generous vertical rhythm, small eyebrow heading. */
export default function Section({
  id,
  eyebrow,
  children,
  className = '',
}: {
  id: string;
  eyebrow: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`border-t border-rule py-20 sm:py-28 ${className}`}
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2
          id={`${id}-heading`}
          className="mb-10 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink-faint sm:mb-14"
        >
          {eyebrow}
        </h2>
        {children}
      </div>
    </section>
  );
}
