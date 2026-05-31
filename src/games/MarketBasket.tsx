import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameProps {
  onComplete: () => void;
}

interface MarketItem {
  id: string;
  name: string;
  icon: string;
  isMarketItem: boolean;
}

const items: MarketItem[] = [
  { id: 'tomatoes', name: 'Fresh Tomatoes', icon: '🍅', isMarketItem: true },
  { id: 'flowers', name: 'Beautiful Flowers', icon: '💐', isMarketItem: true },
  { id: 'bread', name: 'Crusty Bread', icon: '🥖', isMarketItem: true },
  { id: 'cheese', name: 'Italian Cheese', icon: '🧀', isMarketItem: true },
  { id: 'grapes', name: 'Sweet Grapes', icon: '🍇', isMarketItem: true },
  { id: 'phone', name: 'Cell Phone', icon: '📱', isMarketItem: false },
  { id: 'laptop', name: 'Laptop', icon: '💻', isMarketItem: false },
];

export default function MarketBasket({ onComplete }: GameProps) {
  const [basket, setBasket] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');

  const marketItems = items.filter(i => i.isMarketItem);
  const correctCount = basket.filter(id => items.find(i => i.id === id)?.isMarketItem).length;

  const handleAddToBasket = (itemId: string) => {
    if (basket.includes(itemId)) {
      setBasket(basket.filter(id => id !== itemId));
      return;
    }

    const item = items.find(i => i.id === itemId);
    if (!item) return;

    if (!item.isMarketItem) {
      setFeedback(`Oops! You won't find ${item.name.toLowerCase()} at an Italian market!`);
      return;
    }

    const newBasket = [...basket, itemId];
    setBasket(newBasket);
    setFeedback(`Added ${item.name} to your basket!`);

    const newCorrectCount = newBasket.filter(id => items.find(i => i.id === id)?.isMarketItem).length;
    if (newCorrectCount === marketItems.length) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Market Basket
        </h2>
        <p className="text-muted-foreground">
          Fill your basket with items you&apos;d find at Campo de&apos; Fiori market!
        </p>
        <p className="text-sm text-primary mt-2">
          {correctCount}/{marketItems.length} market items collected
        </p>
      </div>

      {feedback && (
        <motion.div
          key={feedback}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center py-2 px-4 rounded-lg font-medium ${
            feedback.includes('Oops') ? 'bg-accent/20 text-accent' : 'bg-secondary/20 text-secondary'
          }`}
        >
          {feedback}
        </motion.div>
      )}

      {/* Basket visualization */}
      <div className="bg-gradient-to-b from-accent/10 to-primary/10 rounded-2xl p-4 min-h-[120px]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🧺</span>
          <span className="font-medium text-foreground">Your Basket:</span>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[60px] bg-card/50 rounded-xl p-3">
          {basket.length === 0 ? (
            <p className="text-muted-foreground text-sm italic">Tap items below to add them...</p>
          ) : (
            basket.map(itemId => {
              const item = items.find(i => i.id === itemId);
              return (
                <motion.div
                  key={itemId}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-3xl"
                >
                  {item?.icon}
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Market stall */}
      <div>
        <p className="text-sm text-muted-foreground mb-3 text-center">
          Tap to add items (but only real market items!):
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {items.map((item) => {
            const inBasket = basket.includes(item.id);
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToBasket(item.id)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  inBasket
                    ? 'bg-secondary/20 border-secondary'
                    : 'bg-card border-border hover:border-primary'
                }`}
              >
                <span className="text-3xl block mb-1">{item.icon}</span>
                <span className="text-xs font-medium">{item.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Market etiquette tip */}
      <div className="bg-accent/10 rounded-xl p-4">
        <p className="text-sm text-foreground">
          <strong>Market Manners:</strong> At Italian markets, always ask the vendor 
          before touching the produce. They&apos;ll pick out the best ones for you!
        </p>
      </div>

      {/* Completion message */}
      {correctCount === marketItems.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-xl font-medium text-secondary">
            Your basket is full of fresh Italian goodness!
          </p>
        </motion.div>
      )}
    </div>
  );
}
