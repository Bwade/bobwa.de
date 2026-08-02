/** Shared section shell: hairline rule, generous vertical rhythm, small eyebrow heading. */
export default function Section({
  id,
  eyebrow,
  children,
}: {
  id: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-rule border-t py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2
          id={`${id}-heading`}
          className="text-ink-faint mb-10 text-[0.7rem] font-medium tracking-[0.2em] uppercase sm:mb-14"
        >
          {eyebrow}
        </h2>
        {children}
      </div>
    </section>
  );
}
