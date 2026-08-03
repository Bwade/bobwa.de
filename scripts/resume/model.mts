/**
 * Resolves site content plus an optional per-application tailor into a flat,
 * fully-decided document.
 *
 * Renderers do no content logic: by the time they see a `ResumeDoc` every
 * string is final and every ordering decision is made. That is what lets the
 * designed and ATS variants stay honest about being the same resume, and what
 * makes the JSON dump a usable contract for verification.
 */

import { content } from '../../data/content.ts';

export type DocBullet = { id: string; text: string; emphasis: string[] };
export type DocGroup = { id: string; label: string; bullets: DocBullet[] };
export type DocRole = {
  id: string;
  title: string;
  company: string;
  dates: string;
  location: string;
  summary: string;
  groups: DocGroup[];
};

export type ResumeDoc = {
  legalName: string;
  tagline: string;
  profile: string;
  contact: { location: string; phone: string; email: string; links: string[] };
  metrics: { value: string; label: string }[];
  expertise: { label: string; items: string[] }[];
  roles: DocRole[];
  earlier: { label: string; items: { title: string; company: string; dates: string }[] };
  education: { label: string; items: { title: string; company: string; dates: string }[] };
  certifications: { label: string; items: { title: string; company: string; dates: string }[] };
};

/**
 * Per-application overrides. Everything is opt-out: omitting a key keeps the
 * canonical content, so a tailor file only states what makes this application
 * different.
 */
export type Tailor = {
  slug: string;
  company: string;
  role: string;
  jdUrl?: string;
  tagline?: string;
  profile?: string;
  /** Fully-qualified `role/group` or `role/group/bullet` ids to remove. */
  drop?: string[];
  /** Group ids to lead with, per role: `{ button: ['org', 'reliability'] }`. */
  order?: Record<string, string[]>;
  letter?: {
    date: string;
    salutation: string;
    paragraphs: string[];
  };
};

/** Strips the scheme and any trailing slash so links print as bare domains. */
function displayUrl(href: string): string {
  return href
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
}

/** Every valid id in the document, for validating a tailor against the content. */
export function allIds(): Set<string> {
  const ids = new Set<string>();
  for (const role of content.experience.roles) {
    ids.add(role.id);
    for (const group of role.groups ?? []) {
      ids.add(`${role.id}/${group.id}`);
      for (const bullet of group.bullets) ids.add(`${role.id}/${group.id}/${bullet.id}`);
    }
  }
  return ids;
}

function closest(target: string, candidates: Set<string>): string | null {
  let best: string | null = null;
  let bestScore = 0;
  for (const candidate of candidates) {
    const tail = target.slice(target.lastIndexOf('/') + 1);
    if (candidate.endsWith(`/${tail}`) || candidate.includes(tail)) {
      const score = tail.length;
      if (score > bestScore) {
        bestScore = score;
        best = candidate;
      }
    }
  }
  return best;
}

/**
 * Fails on any id a tailor references that no longer exists. This is the whole
 * point of the id scheme: reword a bullet and nothing breaks, delete or rename
 * one and every application referencing it says so loudly.
 */
export function validateTailor(tailor: Tailor): void {
  const ids = allIds();
  const referenced = [
    ...(tailor.drop ?? []),
    ...Object.entries(tailor.order ?? {}).flatMap(([role, groups]) =>
      groups.map((g) => `${role}/${g}`),
    ),
  ];
  const unknown = referenced.filter((id) => !ids.has(id));
  if (unknown.length > 0) {
    const detail = unknown
      .map((id) => {
        const suggestion = closest(id, ids);
        return `  ${id}${suggestion ? `  (did you mean ${suggestion}?)` : ''}`;
      })
      .join('\n');
    throw new Error(`${tailor.slug}: unknown ids referenced\n${detail}`);
  }
}

export function buildDoc(tailor?: Tailor): ResumeDoc {
  if (tailor) validateTailor(tailor);
  const drop = new Set(tailor?.drop ?? []);

  const roles: DocRole[] = [];
  for (const role of content.experience.roles) {
    if (drop.has(role.id)) continue;

    let groups: DocGroup[] = (role.groups ?? [])
      .filter((group) => !drop.has(`${role.id}/${group.id}`))
      .map((group) => ({
        id: group.id,
        label: group.label,
        bullets: group.bullets
          .filter((bullet) => !drop.has(`${role.id}/${group.id}/${bullet.id}`))
          .map((bullet) => ({
            id: bullet.id,
            text: bullet.text,
            emphasis: [...(bullet.emphasis ?? [])],
          })),
      }))
      .filter((group) => group.bullets.length > 0);

    const wanted = tailor?.order?.[role.id];
    if (wanted) {
      const rank = new Map(wanted.map((id, i) => [id, i]));
      groups = [...groups].sort(
        (a, b) =>
          (rank.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b.id) ?? Number.MAX_SAFE_INTEGER),
      );
    }

    roles.push({
      id: role.id,
      title: role.title,
      company: role.company,
      dates: role.dates,
      location: role.location ?? '',
      summary: role.summary ?? '',
      groups,
    });
  }

  return {
    legalName: content.resume.legalName,
    tagline: tailor?.tagline ?? content.resume.tagline,
    profile: tailor?.profile ?? content.resume.profile,
    contact: {
      location: content.hero.location,
      phone: content.resume.phone,
      email: content.contact.email,
      links: [...content.hero.social.map((s) => displayUrl(s.href)), displayUrl(content.site.url)],
    },
    metrics: content.impact.map((m) => ({ value: m.value, label: m.label })),
    expertise: content.toolkit.groups.map((g) => ({ label: g.label, items: [...g.items] })),
    roles,
    earlier: {
      label: content.experience.earlier.label,
      items: [...content.experience.earlier.roles],
    },
    education: {
      label: content.experience.education.label,
      items: [...content.experience.education.items],
    },
    certifications: {
      label: content.experience.certifications.label,
      items: [...content.experience.certifications.items],
    },
  };
}

/** Every human-readable string in the document, for the character scan. */
export function allProse(doc: ResumeDoc): string {
  const parts = [
    doc.legalName,
    doc.tagline,
    doc.profile,
    doc.contact.location,
    doc.contact.phone,
    doc.contact.email,
    ...doc.contact.links,
    ...doc.metrics.flatMap((m) => [m.value, m.label]),
    ...doc.expertise.flatMap((e) => [e.label, ...e.items]),
    ...doc.roles.flatMap((r) => [
      r.title,
      r.company,
      r.dates,
      r.location,
      r.summary,
      ...r.groups.flatMap((g) => [g.label, ...g.bullets.map((b) => b.text)]),
    ]),
    ...[doc.earlier, doc.education, doc.certifications].flatMap((s) => [
      s.label,
      ...s.items.flatMap((i) => [i.title, i.company, i.dates]),
    ]),
  ];
  return parts.join('\n');
}
