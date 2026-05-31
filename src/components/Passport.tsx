import { motion } from 'framer-motion';
import { landmarks } from '../data/landmarks';
import { badges, getExplorerTitle } from '../data/badges';

interface PassportProps {
  explorerName: string;
  avatar: string;
  completedLandmarks: string[];
  coins: number;
  onClose: () => void;
}

const avatarIcons: Record<string, string> = {
  gladiator: '⚔️',
  mosaic: '🎨',
  detective: '🔍',
  traveler: '⏰',
  architect: '🏛️',
};

export default function Passport({
  explorerName,
  avatar,
  completedLandmarks,
  coins,
  onClose,
}: PassportProps) {
  const earnedBadges = badges.filter(b => completedLandmarks.includes(b.landmarkId));
  const title = getExplorerTitle(earnedBadges.length);

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
        className="bg-gradient-to-br from-accent/90 to-accent w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Passport cover */}
        <div className="p-6 text-center border-b-4 border-accent/50">
          <div className="inline-block bg-primary/20 rounded-full p-1 mb-2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-4xl">{avatarIcons[avatar] || '🧭'}</span>
            </div>
          </div>
          <h1 className="font-display text-2xl text-primary-foreground mt-2">
            Explorer Passport
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-sm text-primary-foreground/80">Rome Quest</span>
          </div>
        </div>

        {/* Passport interior */}
        <div className="bg-card p-6 space-y-6">
          {/* Explorer info */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Explorer Name</p>
            <h2 className="text-2xl font-bold text-foreground">{explorerName}</h2>
            <div className="inline-block mt-2 px-4 py-1 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold">{title}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">Landmarks Visited</p>
              <p className="text-3xl font-bold text-foreground">
                {completedLandmarks.length}
                <span className="text-lg text-muted-foreground">/{landmarks.length}</span>
              </p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">Roman Coins</p>
              <p className="text-3xl font-bold text-primary flex items-center justify-center gap-1">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                  R
                </span>
                {coins}
              </p>
            </div>
          </div>

          {/* Stamps */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-xl">🏛️</span> Landmark Stamps
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {landmarks.map((landmark) => {
                const isCompleted = completedLandmarks.includes(landmark.id);
                return (
                  <motion.div
                    key={landmark.id}
                    initial={{ rotate: Math.random() * 10 - 5 }}
                    whileHover={{ scale: 1.1 }}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 ${
                      isCompleted
                        ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary'
                        : 'bg-muted/30 border-2 border-dashed border-border'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <span className="text-lg">{landmark.icon}</span>
                        <span className="text-[8px] text-center leading-tight text-foreground mt-0.5">
                          {landmark.name.split(' ')[0]}
                        </span>
                      </>
                    ) : (
                      <span className="text-muted-foreground text-xs">?</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Badge summary */}
          <div className="bg-primary/5 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
                <p className="text-2xl font-bold text-primary">
                  {earnedBadges.length}/{badges.length}
                </p>
              </div>
              <div className="flex -space-x-2">
                {earnedBadges.slice(0, 5).map((badge) => (
                  <div
                    key={badge.id}
                    className="w-10 h-10 rounded-full border-2 border-card flex items-center justify-center text-lg"
                    style={{ backgroundColor: badge.color }}
                  >
                    {badge.icon}
                  </div>
                ))}
                {earnedBadges.length > 5 && (
                  <div className="w-10 h-10 rounded-full bg-muted border-2 border-card flex items-center justify-center text-sm font-bold text-muted-foreground">
                    +{earnedBadges.length - 5}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress to next title */}
          {earnedBadges.length < badges.length && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress to next title</span>
                <span className="text-primary font-medium">
                  {earnedBadges.length < 3 && 'Junior Explorer'}
                  {earnedBadges.length >= 3 && earnedBadges.length < 6 && 'Rome Detective'}
                  {earnedBadges.length >= 6 && earnedBadges.length < 9 && 'Time Traveler'}
                  {earnedBadges.length >= 9 && earnedBadges.length < 12 && 'Grand Rome Guide'}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="btn btn-primary w-full"
          >
            Close Passport
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
