import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Badge } from '../data/badges';

interface RewardModalProps {
  type: 'coins' | 'badge' | 'stamp';
  amount?: number;
  badge?: Badge;
  onClose: () => void;
}

export default function RewardModal({
  type,
  amount,
  badge,
  onClose,
}: RewardModalProps) {
  useEffect(() => {
    // Trigger confetti
    const duration = 2000;
    const end = Date.now() + duration;

    const colors = ['#C4A052', '#7B9E6B', '#C17F59', '#5B8FAF'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const isBadge = type === 'badge' && badge;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card rounded-2xl p-8 max-w-sm w-full roman-border text-center"
        >
          {/* Celebration header */}
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl mb-4"
          >
            🎉
          </motion.div>

          <h2 className="font-display text-3xl text-foreground mb-2">
            Amazing Work!
          </h2>
          <p className="text-muted-foreground mb-6">
            {isBadge ? 'You earned a new badge!' : 'You earned some coins!'}
          </p>

          {/* Badge or Coin display */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl shadow-lg coin-shadow">
              {isBadge ? badge.icon : '🪙'}
            </div>
            <h3 className="font-semibold text-xl text-foreground mt-4">
              {isBadge ? badge.name : `+${amount || 10} Coins`}
            </h3>
          </motion.div>

          {/* Coins earned (shown if badge was earned) */}
          {isBadge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-6"
            >
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                R
              </span>
              <span className="font-bold text-primary text-lg">+10 Bonus Coins</span>
            </motion.div>
          )}

          {/* Continue button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="btn btn-primary w-full text-lg"
          >
            Continue Exploring!
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
