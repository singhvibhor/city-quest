export interface CultureTip {
  id: string;
  title: string;
  tip: string;
  icon: string;
}

export const cultureTips: CultureTip[] = [
  {
    id: 'dinner-time',
    title: 'Dinner Time',
    tip: 'Italians often eat dinner later than in many other countries - usually around 8 or 9 PM!',
    icon: '🍝',
  },
  {
    id: 'piazza-life',
    title: 'Piazza Life',
    tip: 'A piazza is like an outdoor living room. Italians love to gather, chat, and watch the world go by.',
    icon: '🏛️',
  },
  {
    id: 'sacred-spaces',
    title: 'Sacred Spaces',
    tip: 'Churches are active sacred spaces where people pray, not only tourist sites. Be quiet and respectful.',
    icon: '⛪',
  },
  {
    id: 'ancient-treasures',
    title: 'Ancient Treasures',
    tip: 'Do not touch old ruins or monuments. The oils from our hands can damage ancient stones over time.',
    icon: '🏺',
  },
  {
    id: 'scooter-safety',
    title: 'Scooter Safety',
    tip: 'Look both ways for scooters! They can come from unexpected directions on Roman streets.',
    icon: '🛵',
  },
  {
    id: 'magic-words',
    title: 'Magic Words',
    tip: 'Try saying "buongiorno" (good day), "grazie" (thank you), and "per favore" (please). Italians love it!',
    icon: '🗣️',
  },
  {
    id: 'gelato-secret',
    title: 'Gelato Secret',
    tip: 'Gelato is different from regular ice cream - it\'s creamier and has less air. Look for natural colors!',
    icon: '🍨',
  },
  {
    id: 'fountain-rules',
    title: 'Fountain Rules',
    tip: 'Fountains are beautiful art, not swimming pools. Keep hands out and toss coins only where allowed.',
    icon: '⛲',
  },
  {
    id: 'walking-city',
    title: 'Walking City',
    tip: 'Romans walk a lot, so comfortable shoes matter. Many streets are cobblestone and uneven.',
    icon: '👟',
  },
  {
    id: 'coffee-culture',
    title: 'Coffee Culture',
    tip: 'Italians drink their coffee standing at the bar, not sitting at tables. It\'s faster and cheaper!',
    icon: '☕',
  },
];

export function getRandomTip(): CultureTip {
  return cultureTips[Math.floor(Math.random() * cultureTips.length)];
}
