'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reveals its children once they scroll into view, then stops observing.
 *
 * The visual work is done in CSS (see .reveal in globals.css) and is wrapped in
 * a prefers-reduced-motion guard, so with reduced motion nothing is hidden in
 * the first place and this component just sets a harmless attribute.
 */
export default function Reveal({
  children,
  stagger = false,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  /** Fade children in one after another rather than the block as a whole. */
  stagger?: boolean;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'header' | 'footer';
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // One ref type covers every tag this component is used with.
      ref={ref as React.Ref<never>}
      data-visible={visible ? 'true' : 'false'}
      className={`${stagger ? 'reveal-stagger' : 'reveal'} ${className}`}
    >
      {children}
    </Tag>
  );
}
