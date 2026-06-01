export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: {
    type: 'quests_completed' | 'points_earned' | 'category_completed' | 'streak';
    value: number;
    category?: string;
  };
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export const achievements: Achievement[] = [
  {
    id: 'first-quest',
    name: 'The Journey Begins',
    description: 'Complete your first quest and take the first step into history.',
    icon: 'compass',
    requirement: { type: 'quests_completed', value: 1 },
    tier: 'bronze',
  },
  {
    id: 'scholar',
    name: 'Apprentice Scholar',
    description: 'Complete 3 quests and prove your dedication to cultural exploration.',
    icon: 'book-open',
    requirement: { type: 'quests_completed', value: 3 },
    tier: 'bronze',
  },
  {
    id: 'historian',
    name: 'Amateur Historian',
    description: 'Complete 5 quests and deepen your understanding of Rome.',
    icon: 'scroll',
    requirement: { type: 'quests_completed', value: 5 },
    tier: 'silver',
  },
  {
    id: 'master-explorer',
    name: 'Master Explorer',
    description: 'Complete all available quests and become a true connoisseur of Rome.',
    icon: 'crown',
    requirement: { type: 'quests_completed', value: 8 },
    tier: 'gold',
  },
  {
    id: 'point-collector',
    name: 'Point Collector',
    description: 'Earn 500 points through your cultural explorations.',
    icon: 'trophy',
    requirement: { type: 'points_earned', value: 500 },
    tier: 'silver',
  },
  {
    id: 'high-scorer',
    name: 'High Achiever',
    description: 'Earn 1000 points and demonstrate exceptional knowledge.',
    icon: 'medal',
    requirement: { type: 'points_earned', value: 1000 },
    tier: 'gold',
  },
  {
    id: 'epicurean',
    name: 'Epicurean Adventurer',
    description: 'Complete all culinary discovery quests.',
    icon: 'utensils',
    requirement: { type: 'category_completed', value: 2, category: 'taste' },
    tier: 'silver',
  },
  {
    id: 'ancient-world',
    name: 'Voice of the Ancients',
    description: 'Complete all ancient Roman site quests.',
    icon: 'columns',
    requirement: { type: 'quests_completed', value: 4 },
    tier: 'gold',
  },
];

export const getTierColor = (tier: Achievement['tier']): string => {
  const colors: Record<Achievement['tier'], string> = {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
  };
  return colors[tier];
};

export const getTierLabel = (tier: Achievement['tier']): string => {
  return tier.charAt(0).toUpperCase() + tier.slice(1);
};
