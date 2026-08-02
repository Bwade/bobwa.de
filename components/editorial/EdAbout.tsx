import { content } from '@/data/content';
import Reveal from './Reveal';

export default function EdAbout() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-ed-paper text-ed-ink px-6 pt-4 pb-28 sm:px-10 sm:pb-36"
    >
      <Reveal className="mx-auto max-w-6xl">
        <h2 id="about-heading" className="ed-label text-ed-muted">
          {content.about.heading}
        </h2>
        {/* Narrower measure and looser leading: at full width this was a wall. */}
        <p className="ed-display mt-9 max-w-3xl text-[clamp(1.35rem,2.5vw,2rem)] leading-[1.5]">
          {content.about.body}
        </p>
      </Reveal>
    </section>
  );
}
