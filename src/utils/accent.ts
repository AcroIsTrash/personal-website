// Maps a string to a stable two-color gradient drawn from the brand palette,
// so each card gets its own distinct accent that stays consistent across builds.
const colors = ['#7c3aed', '#ec4899', '#06b6d4', '#f59e0b', '#10b981', '#6366f1'];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function accentFor(seed: string): string {
  const h = hash(seed);
  const a = colors[h % colors.length];
  const b = colors[(h + 2) % colors.length];
  return `linear-gradient(180deg, ${a}, ${b})`;
}
