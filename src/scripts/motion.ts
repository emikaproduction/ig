// Animacje wejścia (Motion). Elementy oznaczone data-* są ukryte w CSS tylko wtedy,
// gdy <html> ma klasę .motion (ustawianą w Layout, pomijaną przy prefers-reduced-motion).
import { animate, inView, stagger } from 'motion';

const root = document.documentElement;
const ease = [0.22, 1, 0.36, 1] as const;
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T & Element>(sel)) as T[];

const fadeUp = { opacity: [0, 1], y: [28, 0] };

if (root.classList.contains('motion')) {
  (window as any).__motion = true;

  // --- Hero: sekwencja po załadowaniu ---
  const header = document.querySelector('[data-header]');
  if (header) animate(header, { opacity: [0, 1], y: [-20, 0] }, { duration: 0.7, ease, delay: 0.1 });

  const media = document.querySelector('[data-hero-media]');
  if (media) {
    animate(media, { opacity: [0, 1] }, { duration: 1.4, ease: 'easeOut' });
    const fg = media.querySelector('.para-fg');
    if (fg) animate(fg, { scale: [1.08, 1] }, { duration: 2, ease });
  }

  const hero = (name: string) => document.querySelector(`[data-hero="${name}"]`);
  const eyebrow = hero('eyebrow');
  if (eyebrow) animate(eyebrow, { opacity: [0, 1], letterSpacing: ['0.6em', '0.3em'] }, { duration: 1, ease, delay: 0.3 });

  const lines = $$('[data-hero-line]');
  if (lines.length)
    animate(lines, { opacity: [0, 1], y: [80, 0], filter: ['blur(14px)', 'blur(0px)'] }, { duration: 1.1, ease, delay: stagger(0.15, { startDelay: 0.45 }) });

  const text = hero('text');
  if (text) animate(text, fadeUp, { duration: 0.8, ease, delay: 0.9 });

  const tags = hero('tags');
  if (tags) animate(Array.from(tags.children), { opacity: [0, 1], y: [12, 0] }, { duration: 0.5, ease, delay: stagger(0.06, { startDelay: 1.0 }) });

  const scrollCue = hero('scroll');
  if (scrollCue) animate(scrollCue, { opacity: [0, 1], y: [-12, 0] }, { duration: 0.8, ease, delay: 1.4 });


  // --- Sekcje: odsłanianie przy przewijaniu ---
  const once = (sel: string, run: (el: HTMLElement) => void, amount = 0.3) =>
    inView(sel, (el) => run(el as HTMLElement), { amount, margin: '0px 0px -10% 0px' });

  once('[data-reveal]', (el) => {
    animate(el, fadeUp, { duration: 0.8, ease, delay: Number(el.dataset.reveal || 0) });
  });

  once('[data-reveal-heading]', (el) => {
    animate(
      el,
      { opacity: [0, 1], y: [60, 0], clipPath: ['inset(-20% 0 100% 0)', 'inset(-20% 0 -20% 0)'] },
      { duration: 1, ease, delay: Number(el.dataset.revealHeading || 0) },
    );
  });

  once('[data-reveal-stagger]', (el) => {
    animate(Array.from(el.children), fadeUp, { duration: 0.7, ease, delay: stagger(0.08, { startDelay: Number(el.dataset.revealStagger || 0) }) });
  }, 0.15);

  once('[data-reveal-image]', (el) => {
    animate(el, { opacity: [0, 1], clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] }, { duration: 1.2, ease });
    const img = el.querySelector('img');
    if (img) animate(img, { scale: [1.2, 1] }, { duration: 1.6, ease });
  }, 0.25);

  // --- Grafik: wiersze aktywnego dnia (przy odsłonięciu i przy zmianie zakładki) ---
  const rowsOf = (panel: Element) => Array.from(panel.children);
  const showRows = (panel: Element, startDelay = 0) =>
    animate(rowsOf(panel), { opacity: [0, 1], x: [-24, 0] }, { duration: 0.55, ease, delay: stagger(0.07, { startDelay }) });

  let scheduleSeen = false;
  once('[data-schedule]', (el) => {
    scheduleSeen = true;
    const active = el.querySelector('[data-panel]:not([hidden])');
    if (active) showRows(active, 0.35);
  }, 0.15);

  const mo = new MutationObserver((records) => {
    if (!scheduleSeen) return;
    for (const r of records) {
      const panel = r.target as HTMLElement;
      if (!panel.hidden) showRows(panel);
    }
  });
  $$('[data-panel]').forEach((p) => mo.observe(p, { attributes: true, attributeFilter: ['hidden'] }));
}
