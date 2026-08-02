import { content } from '@/data/content';
import Reveal from './Reveal';

export default function EdAbout() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-ed-paper text-ed-ink px-6 pb-28 sm:px-10 sm:pb-36"
    >
      <Reveal className="mx-auto max-w-6xl">
        <h2 id="about-heading" className="ed-label text-ed-muted">
          {content.about.heading}
        </h2>
        <p className="ed-display mt-10 max-w-5xl text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.25]">
          {content.about.body}
        </p>
      </Reveal>
    </section>
  );
}
