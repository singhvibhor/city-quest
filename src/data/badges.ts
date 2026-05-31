export interface Badge {
  id: string;
  name: string;
  description: string;
  landmarkId: string;
  icon: string;
  color: string;
}

export const badges: Badge[] = [
  {
    id: 'arena-adventurer',
    name: 'Arena Adventurer',
    description: 'You explored the mighty Colosseum and learned about gladiator gear!',
    landmarkId: 'colosseum',
    icon: '🏆',
    color: '#C4A052',
  },
  {
    id: 'forum-builder',
    name: 'Forum Builder',
    description: 'You built an ancient Roman city and discovered the heart of Rome!',
    landmarkId: 'roman-forum',
    icon: '🏗️',
    color: '#8B7355',
  },
  {
    id: 'dome-detective',
    name: 'Dome Detective',
    description: 'You found the oculus and unlocked the secrets of the Pantheon!',
    landmarkId: 'pantheon',
    icon: '🔍',
    color: '#6B8E6B',
  },
  {
    id: 'fountain-friend',
    name: 'Fountain Friend',
    description: 'You made a wish at the Trevi Fountain like a true Roman visitor!',
    landmarkId: 'trevi-fountain',
    icon: '✨',
    color: '#5B8FAF',
  },
  {
    id: 'stair-scholar',
    name: 'Stair Scholar',
    description: 'You counted all the Spanish Steps and learned to respect public spaces!',
    landmarkId: 'spanish-steps',
    icon: '📚',
    color: '#E8B4A0',
  },
  {
    id: 'piazza-pro',
    name: 'Piazza Pro',
    description: 'You became a fountain detective at Piazza Navona!',
    landmarkId: 'piazza-navona',
    icon: '🎯',
    color: '#D4A574',
  },
  {
    id: 'respectful-visitor',
    name: 'Respectful Visitor',
    description: 'You learned how to dress appropriately for sacred places!',
    landmarkId: 'vatican',
    icon: '🙏',
    color: '#F5E6C8',
  },
  {
    id: 'castle-chronologist',
    name: 'Castle Chronologist',
    description: 'You traced the history of Castel Sant\'Angelo through time!',
    landmarkId: 'castel-santangelo',
    icon: '⏰',
    color: '#A0856C',
  },
  {
    id: 'neighborhood-noticer',
    name: 'Neighborhood Noticer',
    description: 'You discovered the hidden details of Trastevere!',
    landmarkId: 'trastevere',
    icon: '👀',
    color: '#C17F59',
  },
  {
    id: 'market-master',
    name: 'Market Master',
    description: 'You learned Italian market manners at Campo de\' Fiori!',
    landmarkId: 'campo-de-fiori',
    icon: '🛒',
    color: '#E25822',
  },
  {
    id: 'park-pal',
    name: 'Park Pal',
    description: 'You planned the perfect picnic at Villa Borghese!',
    landmarkId: 'villa-borghese',
    icon: '🧺',
    color: '#7B9E6B',
  },
  {
    id: 'river-ranger',
    name: 'River Ranger',
    description: 'You connected Rome across the Tiber River!',
    landmarkId: 'tiber-river',
    icon: '🌉',
    color: '#5B8FAF',
  },
];

export function getExplorerTitle(badgeCount: number): string {
  if (badgeCount >= 12) return 'Grand Rome Guide';
  if (badgeCount >= 9) return 'Time Traveler';
  if (badgeCount >= 6) return 'Rome Detective';
  if (badgeCount >= 3) return 'Junior Explorer';
  return 'Curious Traveler';
}
