import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameProps {
  onComplete: () => void;
}

export default function SpanishStepsCounter({ onComplete }: GameProps) {
  const [count, setCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const targetCount = 135;

  const handleStep = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    if (newCount >= 15) {
      // Fast forward after counting some steps
      setTimeout(() => {
        setCount(targetCount);
        setTimeout(onComplete, 1500);
      }, 500);
    }
  };

  const progress = Math.min((count / targetCount) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Step Counter Challenge
        </h2>
        <p className="text-muted-foreground">
          Help count the steps! The Spanish Steps have exactly 135 steps.
        </p>
      </div>

      {/* Steps visualization */}
      <div className="relative bg-gradient-to-t from-muted to-primary/10 rounded-2xl p-6 min-h-[250px]">
        <svg viewBox="0 0 200 150" className="w-full" role="img" aria-label="Spanish Steps">
          {/* Steps */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.rect
              key={i}
              x={20 + i * 5}
              y={120 - i * 15}
              width={160 - i * 10}
              height={12}
              fill={count > i * 17 ? '#C4A052' : '#E8DCC8'}
              stroke="#D4C4A8"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
          
          {/* Church at top */}
          <rect x="70" y="5" width="60" height="40" fill="#F5E6C8" stroke="#C4A052" strokeWidth="2" />
          <polygon points="100,0 70,20 130,20" fill="#C17F59" />
          <rect x="90" y="25" width="20" height="20" fill="#8B7355" />
          
          {/* Little explorer climbing */}
          <motion.g
            animate={{ y: -count * 0.8 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <circle cx="100" cy="130" r="8" fill="#C4A052" />
            <circle cx="100" cy="122" r="5" fill="#E8B4A0" />
          </motion.g>
        </svg>

        {/* Counter display */}
        <motion.div
          key={count}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 bg-card rounded-xl px-4 py-2 shadow-lg"
        >
          <span className="text-3xl font-bold text-primary">{count}</span>
          <span className="text-sm text-muted-foreground">/{targetCount}</span>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {count < targetCount 
            ? `${targetCount - count} steps to go!` 
            : 'You made it to the top!'}
        </p>
      </div>

      {/* Step button */}
      {count < targetCount && (
        <div className="text-center space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleStep}
            className="btn btn-primary text-xl px-12 py-5"
          >
            Take a Step! 👟
          </motion.button>
          
          {count >= 5 && count < 15 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground"
            >
              Keep going! Just a few more taps...
            </motion.p>
          )}
        </div>
      )}

      {/* Completion message */}
      {count >= targetCount && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <p className="text-xl font-medium text-secondary">🎉 You climbed all 135 steps!</p>
          <div className="bg-accent/10 rounded-xl p-4">
            <p className="text-sm text-foreground">
              <strong>Remember:</strong> Sitting on the Spanish Steps is no longer allowed 
              to protect them. But you can still enjoy the beautiful view from the top!
            </p>
          </div>
        </motion.div>
      )}

      {/* Hint button */}
      {count < 5 && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-sm text-muted-foreground underline mx-auto block"
        >
          {showHint ? 'Hide hint' : 'Need a hint?'}
        </button>
      )}
      
      {showHint && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-muted-foreground bg-muted/50 rounded-lg p-3"
        >
          Keep tapping the step button to climb! After a few steps, 
          we&apos;ll help you reach the top faster.
        </motion.p>
      )}
    </div>
  );
}
