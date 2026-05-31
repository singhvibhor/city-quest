import { motion } from 'framer-motion';
import { badges } from '../data/badges';
import { landmarks } from '../data/landmarks';

interface BadgeGalleryProps {
  completedLandmarks: string[];
  onClose: () => void;
}

export default function BadgeGallery({ completedLandmarks, onClose }: BadgeGalleryProps) {
  const earnedBadges = badges.filter(b => completedLandmarks.includes(b.landmarkId));
  const lockedBadges = badges.filter(b => !completedLandmarks.includes(b.landmarkId));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 overflow-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card w-full max-w-lg max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-primary to-secondary text-center">
          <h1 className="font-display text-3xl text-primary-foreground">
            Badge Collection
          </h1>
          <p className="text-primary-foreground/80 mt-1">
            {earnedBadges.length} of {badges.length} badges earned
          </p>
        </div>

        {/* Badge grid */}
        <div className="flex-1 overflow-auto p-6">
          {/* Earned badges */}
          {earnedBadges.length > 0 && (
            <div className="mb-8">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-xl">🏆</span> Earned Badges
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {earnedBadges.map((badge, index) => {
                  const landmark = landmarks.find(l => l.id === badge.landmarkId);
                  return (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 text-center border-2 border-primary/30"
                    >
                      <motion.div
                        animate={{ 
                          boxShadow: ['0 0 0 0 rgba(196, 160, 82, 0)', '0 0 0 8px rgba(196, 160, 82, 0.2)', '0 0 0 0 rgba(196, 160, 82, 0)']
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-2"
                        style={{ backgroundColor: badge.color }}
                      >
                        {badge.icon}
                      </motion.div>
                      <h3 className="font-semibold text-foreground text-sm">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{landmark?.name}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Locked badges */}
          {lockedBadges.length > 0 && (
            <div>
              <h2 className="font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                <span className="text-xl">🔒</span> Not Yet Earned
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {lockedBadges.map((badge, index) => {
                  const landmark = landmarks.find(l => l.id === badge.landmarkId);
                  return (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.03 }}
                      className="bg-muted/30 rounded-xl p-4 text-center border-2 border-dashed border-border"
                    >
                      <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center text-2xl mb-2 opacity-50">
                        🔒
                      </div>
                      <h3 className="font-semibold text-muted-foreground text-sm">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        Visit {landmark?.name}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* All badges earned celebration */}
          {earnedBadges.length === badges.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-6"
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                className="text-5xl mb-3"
              >
                🎉
              </motion.div>
              <h3 className="font-display text-2xl text-foreground">
                Grand Rome Guide!
              </h3>
              <p className="text-muted-foreground mt-2">
                You&apos;ve collected every badge! You&apos;re a true Rome expert!
              </p>
            </motion.div>
          )}
        </div>

        {/* Close button */}
        <div className="p-4 border-t border-border">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="btn btn-primary w-full"
          >
            Close Gallery
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
