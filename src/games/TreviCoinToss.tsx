import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameProps {
  onComplete: () => void;
}

export default function TreviCoinToss({ onComplete }: GameProps) {
  const [stage, setStage] = useState<'ready' | 'tossing' | 'landed' | 'complete'>('ready');
  const [coinPosition, setCoinPosition] = useState({ x: 0, y: 0 });

  const handleToss = () => {
    setStage('tossing');
    
    // Animate coin
    setTimeout(() => {
      setCoinPosition({ x: Math.random() * 100 - 50, y: 150 });
      setStage('landed');
    }, 1500);

    setTimeout(() => {
      setStage('complete');
    }, 3000);

    setTimeout(onComplete, 4000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Coin Toss Challenge
        </h2>
        <p className="text-muted-foreground">
          Toss a coin over your shoulder and make a wish to return to Rome!
        </p>
      </div>

      {/* Fountain visualization */}
      <div className="relative bg-gradient-to-b from-secondary/20 to-primary/20 rounded-2xl p-6 min-h-[300px] overflow-hidden">
        {/* Fountain base */}
        <svg viewBox="0 0 200 150" className="w-full" role="img" aria-label="Trevi Fountain">
          {/* Water */}
          <ellipse cx="100" cy="130" rx="80" ry="20" fill="#5B8FAF" opacity="0.6" />
          <ellipse cx="100" cy="125" rx="70" ry="15" fill="#87CEEB" opacity="0.4" />
          
          {/* Fountain structure */}
          <rect x="60" y="60" width="80" height="70" fill="#E8DCC8" />
          <rect x="70" y="50" width="60" height="20" fill="#D4C4A8" />
          
          {/* Columns */}
          <rect x="65" y="60" width="8" height="60" fill="#C4A052" />
          <rect x="127" y="60" width="8" height="60" fill="#C4A052" />
          
          {/* Central figure (simplified) */}
          <ellipse cx="100" cy="75" rx="15" ry="20" fill="#A8896C" />
          <circle cx="100" cy="60" r="8" fill="#D4C4A8" />
          
          {/* Shell chariot */}
          <path d="M80 100 Q100 85 120 100" fill="#F5E6C8" stroke="#C4A052" strokeWidth="2" />
          
          {/* Water streams */}
          <motion.path
            d="M85 100 Q80 115 90 125"
            fill="none"
            stroke="#87CEEB"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.path
            d="M115 100 Q120 115 110 125"
            fill="none"
            stroke="#87CEEB"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          />
        </svg>

        {/* Animated coin */}
        <AnimatePresence>
          {(stage === 'tossing' || stage === 'landed' || stage === 'complete') && (
            <motion.div
              initial={{ x: 0, y: 250, rotate: 0, scale: 1 }}
              animate={
                stage === 'tossing'
                  ? {
                      x: [0, -30, coinPosition.x],
                      y: [250, 50, coinPosition.y],
                      rotate: [0, 720, 1080],
                      scale: [1, 1.5, 0.8],
                    }
                  : { x: coinPosition.x, y: coinPosition.y, rotate: 1080, scale: 0.8 }
              }
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute left-1/2 transform -translate-x-1/2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shadow-lg coin-shadow">
                R
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Splash effect */}
        {stage === 'landed' && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-1/2 bottom-16 transform -translate-x-1/2"
          >
            <div className="w-12 h-6 bg-secondary/40 rounded-full" />
          </motion.div>
        )}
      </div>

      {/* Instructions and button */}
      {stage === 'ready' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="bg-card rounded-xl p-4 roman-border">
            <p className="text-sm text-card-foreground">
              The tradition says: toss a coin with your right hand over your left shoulder.
              If your coin lands in the fountain, you&apos;ll return to Rome someday!
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToss}
            className="btn btn-primary text-lg px-8"
          >
            Toss Your Coin!
          </motion.button>
        </motion.div>
      )}

      {stage === 'tossing' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-lg font-medium text-primary"
        >
          Make a wish...
        </motion.p>
      )}

      {(stage === 'landed' || stage === 'complete') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <p className="text-xl font-medium text-secondary">Splash! Your wish is made!</p>
          <div className="bg-accent/10 rounded-xl p-4">
            <p className="text-sm text-foreground">
              Remember: The fountain collects about 3,000 euros in coins every day! 
              This money helps feed people in need in Rome.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
