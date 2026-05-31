import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameProps {
  onComplete: () => void;
}

interface TimelineItem {
  id: string;
  era: string;
  use: string;
  icon: string;
  order: number;
}

const timelineItems: TimelineItem[] = [
  { id: 'tomb', era: 'Ancient Times', use: 'Emperor\'s Tomb', icon: '⚱️', order: 1 },
  { id: 'fortress', era: 'Middle Ages', use: 'Military Fortress', icon: '🏰', order: 2 },
  { id: 'refuge', era: 'Renaissance', use: 'Pope\'s Safe House', icon: '🙏', order: 3 },
  { id: 'museum', era: 'Today', use: 'Museum', icon: '🏛️', order: 4 },
];

export default function CastleTimeline({ onComplete }: GameProps) {
  const [placedItems, setPlacedItems] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');

  const availableItems = timelineItems.filter(item => !placedItems.includes(item.id));
  const nextExpectedOrder = placedItems.length + 1;

  const handlePlaceItem = (itemId: string) => {
    const item = timelineItems.find(i => i.id === itemId);
    if (!item) return;

    if (item.order === nextExpectedOrder) {
      const newPlaced = [...placedItems, itemId];
      setPlacedItems(newPlaced);
      setFeedback(`Correct! In ${item.era}, it was used as ${item.use.toLowerCase()}.`);

      if (newPlaced.length === timelineItems.length) {
        setTimeout(onComplete, 1500);
      }
    } else {
      setFeedback('Not quite - think about what came first in history!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Fortress Timeline
        </h2>
        <p className="text-muted-foreground">
          Put the castle&apos;s uses in order from oldest to newest!
        </p>
        <p className="text-sm text-primary mt-2">
          {placedItems.length}/{timelineItems.length} in order
        </p>
      </div>

      {feedback && (
        <motion.div
          key={feedback}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center py-2 px-4 rounded-lg font-medium ${
            feedback.includes('Correct') ? 'bg-secondary/20 text-secondary' : 'bg-accent/20 text-accent'
          }`}
        >
          {feedback}
        </motion.div>
      )}

      {/* Timeline visualization */}
      <div className="relative bg-gradient-to-r from-muted via-primary/10 to-secondary/10 rounded-2xl p-6">
        <div className="flex items-center justify-between relative">
          {/* Timeline line */}
          <div className="absolute left-0 right-0 h-2 bg-border rounded-full" />
          <motion.div
            className="absolute left-0 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
            animate={{ width: `${(placedItems.length / timelineItems.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 100 }}
          />

          {/* Timeline slots */}
          {timelineItems.map((item, index) => {
            const isPlaced = placedItems.includes(item.id);
            return (
              <div key={item.id} className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={isPlaced ? { scale: [1, 1.2, 1] } : undefined}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg ${
                    isPlaced
                      ? 'bg-gradient-to-br from-primary to-secondary'
                      : 'bg-card border-2 border-dashed border-border'
                  }`}
                >
                  {isPlaced ? item.icon : (index + 1)}
                </motion.div>
                <span className="text-xs mt-2 text-center font-medium max-w-[60px]">
                  {isPlaced ? item.era : '?'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available items to place */}
      {availableItems.length > 0 && (
        <div>
          <p className="text-sm text-muted-foreground mb-3 text-center">
            Tap the next use in chronological order:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {availableItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePlaceItem(item.id)}
                className="p-4 rounded-xl bg-card border-2 border-border hover:border-primary transition-all"
              >
                <span className="text-3xl mb-2 block">{item.icon}</span>
                <span className="font-medium text-sm">{item.use}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Completion message */}
      {placedItems.length === timelineItems.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <p className="text-xl font-medium text-secondary">
            You traced the castle through time!
          </p>
          <div className="bg-primary/10 rounded-xl p-4">
            <p className="text-sm text-foreground">
              Buildings can have many lives! This castle went from being a burial place 
              to a fortress, to a secret escape route for popes, and now welcomes visitors like you.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
