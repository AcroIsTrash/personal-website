// Edit this file to personalize the site. These values feed the header,
// hero, status card, and footer — no need to touch component markup.

export const site = {
  name: 'acroistrash',
  // Shown in the hero. Keep it punchy.
  tagline:
    'I write about engineering clean, lightweight systems, publish neat concepts, and craft modern visual solutions. This is my corner of the web.',
  // Default accent: 'rose' | 'violet' | 'cyan' | 'amber'
  defaultAccent: 'rose' as const,
};

export const social = {
  github: 'https://github.com/AcroIsTrash',
  twitter: 'https://twitter.com/',
};

// The little "status" extras in the hero side card. All optional —
// set any to undefined to hide it.
export const status = {
  availableForHire: true,
  nowListening: 'Pink Floyd',
  dayStreak: 26,
  toolbox: ['Astro', 'TypeScript', 'React', 'Node.js', 'TailwindCSS', 'Rust'],
};

// Small stats row shown under the hero. Edit freely or set to [] to hide.
export const stats = [
  { value: '04+', label: 'Years Coding' },
  { value: '12', label: 'Shipped Apps' },
  { value: '100%', label: 'Open Source' },
];
