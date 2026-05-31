import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameProps {
  onComplete: () => void;
}

interface GearItem {
  id: string;
  name: string;
  icon: string;
  purpose: string;
}

const gearItems: GearItem[] = [
  { id: 'helmet', name: 'Helmet', icon: '🪖', purpose: 'Protects the gladiator\'s head' },
  { id: 'shield', name: 'Shield', icon: '🛡️', purpose: 'Blocks attacks from opponents' },
  { id: 'sandals', name: 'Sandals', icon: '🩴', purpose: 'Helps grip the sandy arena floor' },
  { id: 'sword', name: 'Sword', icon: '⚔️', purpose: 'Used for fighting in combat' },
];

export default function ColosseumGearMatch({ onComplete }: GameProps) {
  const [matches, setMatches] = useState<Record<string, boolean>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const shuffledPurposes = [...gearItems].sort(() => Math.random() - 0.5);

  const handleItemClick = (itemId: string) => {
    if (matches[itemId]) return;
    setSelectedItem(itemId);
    setFeedback('Now tap the matching description!');
  };

  const handlePurposeClick = (item: GearItem) => {
    if (!selectedItem) {
      setFeedback('First, tap a piece of gear!');
      return;
    }

    if (selectedItem === item.id) {
      setMatches((prev) => ({ ...prev, [item.id]: true }));
      setFeedback('Great match! 🎉');
      setSelectedItem(null);

      // Check if all matched
      const newMatches = { ...matches, [item.id]: true };
      if (Object.keys(newMatches).length === gearItems.length) {
        setTimeout(onComplete, 1000);
      }
    } else {
      setFeedback('Not quite - try again!');
    }
  };

  const matchedCount = Object.keys(matches).length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Gladiator Gear Match
        </h2>
        <p className="text-muted-foreground">
          Match each piece of gear to what it was used for!
        </p>
        <p className="text-sm text-primary mt-2">
          {matchedCount}/{gearItems.length} matched
        </p>
      </div>

      {feedback && (
        <motion.div
          key={feedback}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-2 px-4 bg-primary/10 rounded-lg text-primary font-medium"
        >
          {feedback}
        </motion.div>
      )}

      {/* Gear items */}
      <div className="grid grid-cols-4 gap-3">
        {gearItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={!matches[item.id] ? { scale: 1.1 } : undefined}
            whileTap={!matches[item.id] ? { scale: 0.95 } : undefined}
            onClick={() => handleItemClick(item.id)}
            disabled={matches[item.id]}
            className={`p-4 rounded-xl border-2 transition-all ${
              matches[item.id]
                ? 'bg-secondary/20 border-secondary opacity-50'
                : selectedItem === item.id
                ? 'bg-primary/20 border-primary ring-2 ring-primary'
                : 'bg-card border-border hover:border-primary'
            }`}
          >
            <span className="text-3xl">{item.icon}</span>
            <p className="text-xs mt-1 font-medium">{item.name}</p>
          </motion.button>
        ))}
      </div>

      {/* Purposes */}
      <div className="space-y-2">
        {shuffledPurposes.map((item) => (
          <motion.button
            key={item.id}
            whileHover={!matches[item.id] ? { scale: 1.02 } : undefined}
            whileTap={!matches[item.id] ? { scale: 0.98 } : undefined}
            onClick={() => handlePurposeClick(item)}
            disabled={matches[item.id]}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              matches[item.id]
                ? 'bg-secondary/20 border-2 border-secondary'
                : 'bg-card border-2 border-border hover:border-primary'
            }`}
          >
            <span className={matches[item.id] ? 'line-through text-muted-foreground' : ''}>
              {item.purpose}
            </span>
            {matches[item.id] && <span className="ml-2">✓</span>}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
