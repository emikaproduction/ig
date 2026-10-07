# Iron Gym Pisz — strona siłowni (Astro + Tailwind v4)

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # statyczny build do dist/
```

## Struktura
- `src/data/site.ts` — **wszystkie treści**: nazwa, kontakt, godziny otwarcia, grafik, trenerzy. Pola `[W NAWIASACH]` / `TODO` do uzupełnienia.
- `src/styles/global.css` — tokeny design systemu (`@theme`: `brand-black`, `brand-dark`, `brand-zinc`, `brand-accent`, `brand-muted`), ziarno, obrys tekstu, gradient stali, przyciski.
- `src/components/` — Header, Hero, Schedule, Roster, Supplements, Contact.

## Do podmiany
- Wideo hero: wrzuć `public/video/hero.mp4` (+ `hero.jpg`) i odkomentuj `<video>` w `Hero.astro`.
- Zdjęcia trenerów: ustaw `photo: '/img/trener-1.jpg'` w `site.ts` (pliki w `public/img/`).
- Zdjęcie półki z suplementami: komentarz TODO w `Supplements.astro`.

## Zachowanie
- Widget „OTWARTE/ZAMKNIĘTE” i oznaczenie „TRWA TERAZ” w grafiku liczą się w przeglądarce wg czasu Europe/Warsaw.
- Grafik otwiera się na dzisiejszym dniu; zakładki obsługują strzałki ←/→.

## Odstępstwa od specyfikacji
- Tailwind v4: paleta z `tailwind.config.cjs` jest w `@theme` w `global.css` (te same nazwy klas).
- `brand-muted` = `#8b8b94` zamiast `#71717a` (spełnia WCAG AA na czarnym tle).
- Krój nagłówków: Oswald 700 (Anton ma wadliwe glify Ś/Ć). Fonty samohostowane przez @fontsource (WOFF2).
