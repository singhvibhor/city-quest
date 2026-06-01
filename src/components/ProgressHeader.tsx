import { motion } from 'framer-motion';
import type { GameState } from '../App';
import { badges } from '../data/badges';

interface ProgressHeaderProps {
  gameState: GameState;
  onNavigate: (screen: GameState['currentScreen']) => void;
}

export default function ProgressHeader({
  gameState,
  onNavigate,
}: ProgressHeaderProps) {
  const { explorerName, coins, earnedBadges } = gameState;
  const badgeCount = earnedBadges.length;
  const totalBadges = badges.length;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Explorer name */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            {explorerName.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-foreground truncate hidden sm:block">
            {explorerName}
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex-1 max-w-xs hidden md:block">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {badgeCount}/{totalBadges}
            </span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(badgeCount / totalBadges) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Coins */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full"
          >
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
              R
            </span>
            <span className="font-semibold text-primary">{coins}</span>
          </motion.div>

          {/* Badges button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('badges')}
            className="flex items-center gap-1 bg-secondary/10 px-3 py-1.5 rounded-full hover:bg-secondary/20 transition-colors"
            aria-label={`View badges. ${badgeCount} of ${totalBadges} earned`}
          >
            <span className="text-lg">🏅</span>
            <span className="font-semibold text-secondary">{badgeCount}</span>
          </motion.button>

          {/* Passport button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('passport')}
            className="flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-full hover:bg-accent/20 transition-colors"
            aria-label="Open Explorer Passport"
          >
            <span className="text-lg">📕</span>
            <span className="font-semibold text-accent hidden sm:inline">Passport</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
