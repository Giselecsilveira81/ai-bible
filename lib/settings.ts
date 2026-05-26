/** Settings — tema e tamanho da fonte. localStorage. */

const THEME_KEY = "ai-bible:theme";
const FS_KEY = "ai-bible:font-size";

export type Theme = "light" | "dark" | "auto";

export const FONT_SIZE_MIN = 14;
export const FONT_SIZE_MAX = 28;
export const FONT_SIZE_DEFAULT = 18;

function isBrowser() {
  return typeof window !== "undefined";
}

export function getTheme(): Theme {
  if (!isBrowser()) return "auto";
  const v = localStorage.getItem(THEME_KEY) as Theme | null;
  return v === "light" || v === "dark" || v === "auto" ? v : "auto";
}

export function setTheme(t: Theme) {
  if (!isBrowser()) return;
  localStorage.setItem(THEME_KEY, t);
  applyTheme(t);
}

export function applyTheme(t: Theme) {
  if (!isBrowser()) return;
  const root = document.documentElement;
  const dark =
    t === "dark" ||
    (t === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", dark);
}

export function getFontSize(): number {
  if (!isBrowser()) return FONT_SIZE_DEFAULT;
  const raw = localStorage.getItem(FS_KEY);
  const n = raw ? Number(raw) : FONT_SIZE_DEFAULT;
  if (Number.isNaN(n)) return FONT_SIZE_DEFAULT;
  return Math.min(FONT_SIZE_MAX, Math.max(FONT_SIZE_MIN, n));
}

export function setFontSize(px: number) {
  if (!isBrowser()) return;
  const clamped = Math.min(FONT_SIZE_MAX, Math.max(FONT_SIZE_MIN, px));
  localStorage.setItem(FS_KEY, String(clamped));
  document.documentElement.style.setProperty(
    "--reader-fs",
    `${clamped}px`,
  );
}

/** Script inline pra rodar no <head> antes do React montar e evitar FOUC */
export const SETTINGS_INIT_SCRIPT = `
(function(){
  try {
    var t = localStorage.getItem('${THEME_KEY}') || 'auto';
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = t === 'dark' || (t === 'auto' && prefersDark);
    if (dark) document.documentElement.classList.add('dark');
    var fs = parseInt(localStorage.getItem('${FS_KEY}') || '${FONT_SIZE_DEFAULT}', 10);
    if (!isNaN(fs)) document.documentElement.style.setProperty('--reader-fs', fs + 'px');
  } catch(e) {}
})();
`;
