// Wszystkie treści strony w jednym miejscu.
// Wartości w [NAWIASACH] i oznaczone TODO to dane do uzupełnienia.

export const site = {
  name: 'Iron Gym',
  city: 'Pisz',
  phone: '729 407 930',
  email: 'piotr.nowak.tp@gmail.com',
  address: ['ul. Mazurska 14', '12-200 Pisz'],
  // Trasa w Mapach Google do siłowni
  mapsHref: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('Mazurska 14, 12-200 Pisz'),
  phoneHref: 'tel:+48729407930',
  social: {
    facebook: 'https://www.facebook.com/iron.gym.crosswork/',
    instagram: 'https://www.instagram.com/iron_gym_crosswork/',
  },
};

export type OpenRange = { open: string; close: string }; // HH:MM, z zerem wiodącym

// Godziny otwarcia: indeks 0 = poniedziałek. Dzień może mieć kilka przedziałów (przerwa w ciągu dnia).
// Używane w stopce (sekcja Kontakt).
export const openingHours: OpenRange[][] = [
  [{ open: '07:00', close: '13:00' }, { open: '15:00', close: '21:00' }],
  [{ open: '07:00', close: '13:00' }, { open: '15:00', close: '21:00' }],
  [{ open: '08:00', close: '13:00' }, { open: '15:00', close: '21:00' }],
  [{ open: '07:00', close: '13:00' }, { open: '15:00', close: '21:00' }],
  [{ open: '07:00', close: '21:00' }],
  [{ open: '09:00', close: '18:00' }],
  [{ open: '10:00', close: '15:00' }],
];

export type ClassItem = {
  time: string; // HH:MM
  minutes: number;
  name: string;
  desc: string;
};

// TODO: czas trwania i opisy do potwierdzenia.
const classTypes = {
  senior: { name: 'Senior', desc: 'Spokojny trening dla seniorów: siła, równowaga i sprawność na co dzień', minutes: 60 },
  crosswork: { name: 'Crosswork', desc: 'Trening funkcjonalny w grupie: siła, wytrzymałość i kondycja', minutes: 60 },
  spine: { name: 'Zdrowy kręgosłup', desc: 'Wzmacnianie mięśni posturalnych i mobilność kręgosłupa', minutes: 60 },
} as const;

type Key = keyof typeof classTypes;
const c = (time: string, key: Key): ClassItem => ({ time, ...classTypes[key] });

export const schedule: { short: string; long: string; classes: ClassItem[] }[] = [
  { short: 'PN', long: 'Poniedziałek', classes: [c('09:00', 'senior'), c('18:00', 'crosswork'), c('19:00', 'crosswork')] },
  { short: 'WT', long: 'Wtorek', classes: [c('18:00', 'spine')] },
  { short: 'ŚR', long: 'Środa', classes: [c('18:00', 'crosswork'), c('19:00', 'crosswork')] },
  { short: 'CZ', long: 'Czwartek', classes: [c('09:00', 'senior'), c('18:00', 'spine')] },
  { short: 'PT', long: 'Piątek', classes: [c('17:00', 'crosswork'), c('18:00', 'crosswork')] },
  { short: 'SB', long: 'Sobota', classes: [] },
  { short: 'ND', long: 'Niedziela', classes: [] },
];

// --- Sekcja „O nas” ---
export const zones = [
  { name: 'Strefa siłowa i cardio', desc: 'Wolne ciężary, maszyny izolowane, suwnice i sprzęt cardio.' },
  { name: 'Strefa CrossWork', desc: 'Osobna przestrzeń do treningu funkcjonalnego: bramy, drążki, kettlebelle i sprzęt do obwodów.' },
  { name: 'Treningi personalne', desc: 'Indywidualny plan, nauka techniki, opieka instruktora i stała kontrola postępów.' },
  { name: 'Zajęcia grupowe', desc: 'Treningi w grupie dopasowane do różnych poziomów — od pierwszych kroków po zaawansowanych.' },
  { name: 'Solarium Iron Sun', desc: 'Solarium na miejscu — płacisz tylko za wykorzystane minuty.' },
];

export const perks = [
  { name: 'Atmosfera', desc: 'Luźno, przyjaźnie i z motywacją. Tu nikt nie ocenia — wszyscy trenują.' },
  { name: 'Sprzęt i porządek', desc: 'Dbamy o stan techniczny maszyn i czystość na hali.' },
  { name: 'Elastyczne wejścia', desc: 'Wejścia jednorazowe, karnety krótkoterminowe (np. 2-tygodniowe) i karty partnerskie.' },
];

// Opinie z wizytówki Google (stan na 10.2026) – TODO: aktualizować co jakiś czas
export const googleRating = { score: '4,8', count: 144 };

export const partnerCards = ['MultiSport', 'Medicover Sport', 'FitProfit'];

// --- Cennik (assets/cennik.jpeg) ---
export type Price = { name: string; price: number; reduced?: number; note?: string; per?: string };

export const pricing = {
  featured: { name: 'Open + CrossWork', price: 300, note: 'Karnet Open i zajęcia CrossWork w jednym' },
  passes: [
    { name: 'Karnet Open', price: 180, reduced: 150, note: 'Ważny 30 dni od wydania' },
    { name: 'Karnet 14-dniowy', price: 140 },
    { name: 'Wejście jednorazowe', price: 40, reduced: 30 },
  ] as Price[],
  // Ceny zajęć grupowych za miesiąc
  classes: [
    { name: 'CrossWork', price: 200, per: 'mies.' },
    { name: 'Zdrowy kręgosłup', price: 150, per: 'mies.' },
    { name: 'Senior', price: 120, per: 'mies.' },
  ] as Price[],
  extras: [{ name: 'Solarium Iron Sun', price: 2.5, per: 'minutę' }] as Price[],
  reducedInfo: 'Karnet ulgowy przysługuje osobom uczącym się do 26. roku życia (z aktualną legitymacją) oraz osobom powyżej 60. roku życia.',
};
