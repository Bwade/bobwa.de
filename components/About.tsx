import { content } from '@/data/content';
import Section from './Section';

export default function About() {
  return (
    <Section id="about" eyebrow={content.about.heading}>
      <p className="text-ink max-w-3xl font-serif text-2xl leading-[1.45] sm:text-[1.75rem] sm:leading-[1.45]">
        {content.about.body}
      </p>
    </Section>
  );
}
