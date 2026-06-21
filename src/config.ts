// Edit this file to personalize the site. These values feed the header,
// hero, status card, and footer — no need to touch component markup.

export const site = {
  name: 'Joseph Le Brun',
  // Shown in the hero. Keep it punchy.
  tagline:
    'AI response evaluator and data annotator. I write about AI evaluation, LLM quality, and RLHF — the invisible human judgment behind the models — and build the engineering and infrastructure around it.',
  // Default accent: 'rose' | 'violet' | 'cyan' | 'amber'
  defaultAccent: 'rose' as const,
};

export const social = {
  github: 'https://github.com/AcroIsTrash',
  linkedin: 'https://www.linkedin.com/in/joseph-romero-le-brun-88aa43239',
  email: 'acrolebrun@gmail.com',
  // Set to '' to hide. (Twitter/X is hidden by default.)
  twitter: '',
};

// The little "status" extras in the hero side card. All optional —
// set any to undefined to hide it.
export const status = {
  availableForHire: true,
  nowListening: 'Pink Floyd',
  dayStreak: 26,
  toolbox: ['Python', 'LangChain', 'Pydantic', 'AWS', 'Terraform', 'Docker'],
};

// Small stats row shown under the hero. Edit freely or set to [] to hide.
export const stats: { value: string; label: string }[] = [];
