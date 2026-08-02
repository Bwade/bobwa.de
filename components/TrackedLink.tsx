'use client';

import { trackEvent, type EventName, type EventProps } from '@/lib/analytics';

type TrackedLinkProps<K extends EventName> = Omit<
  React.ComponentPropsWithoutRef<'a'>,
  'onClick'
> & {
  event: K;
  eventProps: EventProps<K>;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

/**
 * An anchor that reports a typed event when clicked. Navigation is never
 * blocked or delayed: `track` fires and the browser follows the href as usual.
 */
export default function TrackedLink<K extends EventName>({
  event,
  eventProps,
  onClick,
  ...anchorProps
}: TrackedLinkProps<K>) {
  return (
    <a
      {...anchorProps}
      onClick={(nativeEvent) => {
        trackEvent(event, eventProps);
        onClick?.(nativeEvent);
      }}
    />
  );
}
