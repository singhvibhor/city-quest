import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameProps {
  onComplete: () => void;
}

interface PicnicItem {
  id: string;
  name: string;
  icon: string;
  isGood: boolean;
  reason: string;
}

const picnicItems: PicnicItem[] = [
  { id: 'blanket', name: 'Picnic Blanket', icon: '🧺', isGood: true, reason: 'Perfect for sitting on the grass!' },
  { id: 'sandwich', name: 'Sandwich', icon: '🥪', isGood: true, reason: 'A tasty and easy picnic food!' },
  { id: 'water', name: 'Water Bottle', icon: '💧', isGood: true, reason: 'Stay hydrated while exploring!' },
  { id: 'fruit', name: 'Fresh Fruit', icon: '🍎', isGood: true, reason: 'Healthy and refreshing!' },
  { id: 'trash-bag', name: 'Trash Bag', icon: '🗑️', isGood: true, reason: 'Always clean up after yourself!' },
  { id: 'loud-speaker', name: 'Loud Speaker', icon: '📢', isGood: false, reason: 'Keep the park peaceful for everyone!' },
];

export default function ParkPicnicQuest({ onComplete }: GameProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (itemId: string) => {
    if (showResults) return;
    
    const item = picnicItems.find(i => i.id === itemId);
    if (!item) return;

    if (selected.includes(itemId)) {
      setSelected(selected.filter(id => id !== itemId));
      setFeedback('');
    } else {
      setSelected([...selected, itemId]);
      setFeedback(item.reason);
    }
  };

  const handleCheckPicnic = () => {
    const correctSelections = selected.filter(id => picnicItems.find(i => i.id === id)?.isGood);
    const wrongSelections = selected.filter(id => !picnicItems.find(i => i.id === id)?.isGood);
    
    if (wrongSelections.length > 0) {
      const wrongItem = picnicItems.find(i => i.id === wrongSelections[0]);
      setFeedback(`Hmm, ${wrongItem?.name} might not be the best choice. ${wrongItem?.reason}`);
      return;
    }

    if (correctSelections.length >= 4) {
      setShowResults(true);
      setTimeout(onComplete, 2000);
    } else {
      setFeedback('Add a few more items for a great picnic!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Park Picnic Quest
        </h2>
        <p className="text-muted-foreground">
          Pack the perfect picnic for Villa Borghese park!
        </p>
        <p className="text-sm text-primary mt-2">
          {selected.length} items selected
        </p>
      </div>

      {feedback && (
        <motion.div
          key={feedback}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-2 px-4 bg-primary/10 rounded-lg text-primary font-medium text-sm"
        >
          {feedback}
        </motion.div>
      )}

      {/* Park scene */}
      <div className="bg-gradient-to-b from-secondary/30 to-secondary/10 rounded-2xl p-4 relative min-h-[150px]">
        <svg viewBox="0 0 200 80" className="w-full" role="img" aria-label="Villa Borghese park scene">
          {/* Sky */}
          <rect x="0" y="0" width="200" height="40" fill="#87CEEB" opacity="0.3" />
          
          {/* Sun */}
          <circle cx="170" cy="20" r="15" fill="#F5E6C8" />
          
          {/* Trees */}
          <circle cx="30" cy="35" r="20" fill="#7B9E6B" />
          <rect x="27" y="45" width="6" height="15" fill="#8B7355" />
          
          <circle cx="80" cy="30" r="25" fill="#6B8E6B" />
          <rect x="77" y="45" width="6" height="15" fill="#8B7355" />
          
          <circle cx="150" cy="35" r="18" fill="#7B9E6B" />
          <rect x="147" y="45" width="6" height="15" fill="#8B7355" />
          
          {/* Grass */}
          <rect x="0" y="55" width="200" height="25" fill="#7B9E6B" opacity="0.4" />
          
          {/* Path */}
          <path d="M0 70 Q100 60 200 70" fill="none" stroke="#D4C4A8" strokeWidth="8" />
        </svg>

        {/* Picnic blanket with selected items */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-accent/30 rounded-lg p-3 min-w-[120px]">
          <div className="flex flex-wrap gap-1 justify-center">
            {selected.length === 0 ? (
              <span className="text-xs text-muted-foreground">Your picnic spot</span>
            ) : (
              selected.map(itemId => {
                const item = picnicItems.find(i => i.id === itemId);
                return (
                  <motion.span
                    key={itemId}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xl"
                  >
                    {item?.icon}
                  </motion.span>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Item selection */}
      {!showResults && (
        <>
          <div className="grid grid-cols-3 gap-3">
            {picnicItems.map((item) => {
              const isSelected = selected.includes(item.id);
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(item.id)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'bg-secondary/20 border-secondary'
                      : 'bg-card border-border hover:border-primary'
                  }`}
                >
                  <span className="text-2xl block mb-1">{item.icon}</span>
                  <span className="text-xs font-medium">{item.name}</span>
                </motion.button>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckPicnic}
            className="btn btn-primary w-full"
            disabled={selected.length === 0}
          >
            Check My Picnic!
          </motion.button>
        </>
      )}

      {/* Completion message */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <p className="text-xl font-medium text-secondary">
            Perfect picnic planning!
          </p>
          <div className="bg-primary/10 rounded-xl p-4">
            <p className="text-sm text-foreground">
              Villa Borghese is a wonderful place to relax. Remember to always 
              clean up after your picnic and respect the plants and wildlife!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
