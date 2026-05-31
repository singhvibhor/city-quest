import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameProps {
  onComplete: () => void;
}

interface ClothingItem {
  id: string;
  name: string;
  icon: string;
  appropriate: boolean;
  reason: string;
}

const clothingItems: ClothingItem[] = [
  { id: 'tshirt-long', name: 'T-shirt with sleeves', icon: '👕', appropriate: true, reason: 'Shoulders are covered!' },
  { id: 'tank-top', name: 'Tank top', icon: '🩱', appropriate: false, reason: 'Shoulders need to be covered in churches.' },
  { id: 'long-pants', name: 'Long pants', icon: '👖', appropriate: true, reason: 'Knees are covered - perfect!' },
  { id: 'shorts', name: 'Short shorts', icon: '🩳', appropriate: false, reason: 'Knees should be covered in sacred places.' },
  { id: 'dress-long', name: 'Long dress', icon: '👗', appropriate: true, reason: 'This covers shoulders and knees nicely!' },
  { id: 'hat', name: 'Hat (to remove inside)', icon: '🧢', appropriate: true, reason: 'Just remember to take it off inside!' },
];

export default function VaticanDressCode({ onComplete }: GameProps) {
  const [selections, setSelections] = useState<Record<string, 'yes' | 'no'>>({});
  const [feedback, setFeedback] = useState<{ message: string; correct: boolean } | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (itemId: string, answer: 'yes' | 'no') => {
    const item = clothingItems.find(i => i.id === itemId);
    if (!item) return;

    const isCorrect = (answer === 'yes') === item.appropriate;
    
    setSelections(prev => ({ ...prev, [itemId]: answer }));
    setFeedback({
      message: isCorrect ? `Correct! ${item.reason}` : `Not quite. ${item.reason}`,
      correct: isCorrect
    });

    // Check if all items are answered
    const newSelections = { ...selections, [itemId]: answer };
    if (Object.keys(newSelections).length === clothingItems.length) {
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }
  };

  const answeredCount = Object.keys(selections).length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Dress Code Puzzle
        </h2>
        <p className="text-muted-foreground">
          Which clothes are appropriate for visiting St. Peter&apos;s?
        </p>
        <p className="text-sm text-primary mt-2">
          {answeredCount}/{clothingItems.length} answered
        </p>
      </div>

      {feedback && (
        <motion.div
          key={feedback.message}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center py-2 px-4 rounded-lg font-medium ${
            feedback.correct ? 'bg-secondary/20 text-secondary' : 'bg-accent/20 text-accent'
          }`}
        >
          {feedback.correct ? '✓ ' : '✗ '}{feedback.message}
        </motion.div>
      )}

      {/* Clothing items */}
      <div className="space-y-3">
        {clothingItems.map((item) => {
          const answered = selections[item.id];
          const wasCorrect = answered && (answered === 'yes') === item.appropriate;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-xl border-2 transition-all ${
                answered
                  ? wasCorrect
                    ? 'bg-secondary/10 border-secondary'
                    : 'bg-accent/10 border-accent'
                  : 'bg-card border-border'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
                
                {!answered ? (
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSelect(item.id, 'yes')}
                      className="w-10 h-10 rounded-full bg-secondary/20 hover:bg-secondary/40 flex items-center justify-center text-secondary font-bold"
                      aria-label={`${item.name} is appropriate`}
                    >
                      ✓
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSelect(item.id, 'no')}
                      className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent font-bold"
                      aria-label={`${item.name} is not appropriate`}
                    >
                      ✗
                    </motion.button>
                  </div>
                ) : (
                  <span className={`text-xl ${wasCorrect ? 'text-secondary' : 'text-accent'}`}>
                    {wasCorrect ? '✓' : '✗'}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Completion message */}
      {completed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <p className="text-xl font-medium text-secondary">
            You&apos;re ready to visit respectfully!
          </p>
          <div className="bg-primary/10 rounded-xl p-4">
            <p className="text-sm text-foreground">
              <strong>Quick rule:</strong> Cover your shoulders and knees when visiting churches in Italy. 
              Some places even provide shawls if you forget!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
