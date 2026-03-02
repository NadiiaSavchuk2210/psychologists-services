export const THEMES = {
  green: { label: 'Green', color: '#54be96' },
  blue: { label: 'Blue', color: '#3470ff' },
  orange: { label: 'Orange', color: '#fc832c' },
} as const;

export type Theme = keyof typeof THEMES;
