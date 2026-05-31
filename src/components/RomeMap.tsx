import { motion } from 'framer-motion';
import { landmarks } from '../data/landmarks';
import { getRandomTip, CultureTip } from '../data/cultureTips';
import { useState, useEffect } from 'react';

interface RomeMapProps {
  completedLandmarks: string[];
  onLandmarkClick: (landmarkId: string) => void;
}

export default function RomeMap({ completedLandmarks, onLandmarkClick }: RomeMapProps) {
  const [currentTip, setCurrentTip] = useState<CultureTip | null>(null);

  useEffect(() => {
    setCurrentTip(getRandomTip());
    const interval = setInterval(() => {
      setCurrentTip(getRandomTip());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Determine which landmarks are unlocked (first one + any adjacent to completed)
  const getUnlockedLandmarks = () => {
    if (completedLandmarks.length === 0) {
      return [landmarks[0].id]; // Start with Colosseum
    }
    
    const unlocked = new Set(completedLandmarks);
    
    // Unlock next landmarks based on completion
    completedLandmarks.forEach((completedId) => {
      const completedIndex = landmarks.findIndex(l => l.id === completedId);
      if (completedIndex < landmarks.length - 1) {
        unlocked.add(landmarks[completedIndex + 1].id);
      }
      // Also unlock some nearby landmarks for variety
      if (completedIndex > 0) {
        unlocked.add(landmarks[completedIndex - 1].id);
      }
    });
    
    return Array.from(unlocked);
  };

  const unlockedLandmarks = getUnlockedLandmarks();

  return (
    <div className="flex-1 p-4 pb-24 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Today's Rome Tip */}
        {currentTip && (
          <motion.div
            key={currentTip.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-card rounded-xl p-4 roman-border"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{currentTip.icon}</span>
              <div>
                <h3 className="font-semibold text-foreground text-sm">
                  Today&apos;s Rome Tip: {currentTip.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{currentTip.tip}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Map title */}
        <h2 className="font-display text-2xl text-center text-foreground mb-4">
          Explore Rome!
        </h2>

        {/* Illustrated Map */}
        <div className="relative bg-gradient-to-br from-secondary/10 via-muted to-primary/10 rounded-2xl p-4 roman-border min-h-[500px]">
          {/* Decorative elements */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Tiber River */}
            <path
              d="M15 30 Q20 40, 25 50 Q30 60, 35 70 Q40 80, 45 90"
              fill="none"
              stroke="#5B8FAF"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
            {/* Roads */}
            <path
              d="M20 45 L80 45"
              fill="none"
              stroke="#D4C4A8"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              opacity="0.5"
            />
            <path
              d="M50 20 L50 80"
              fill="none"
              stroke="#D4C4A8"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              opacity="0.5"
            />
          </svg>

          {/* Landmark pins */}
          <div className="relative h-[500px]">
            {landmarks.map((landmark, index) => {
              const isCompleted = completedLandmarks.includes(landmark.id);
              const isUnlocked = unlockedLandmarks.includes(landmark.id);
              
              return (
                <motion.button
                  key={landmark.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={isUnlocked ? { scale: 1.15, y: -5 } : undefined}
                  whileTap={isUnlocked ? { scale: 0.95 } : undefined}
                  onClick={() => isUnlocked && onLandmarkClick(landmark.id)}
                  disabled={!isUnlocked}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all ${
                    isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  }`}
                  style={{
                    left: `${landmark.mapPosition.x}%`,
                    top: `${landmark.mapPosition.y}%`,
                  }}
                  aria-label={`${landmark.name}${isCompleted ? ' - Completed' : isUnlocked ? ' - Available' : ' - Locked'}`}
                >
                  {/* Pin */}
                  <motion.div
                    animate={isCompleted ? { 
                      boxShadow: ['0 0 0 0 rgba(196, 160, 82, 0)', '0 0 0 8px rgba(196, 160, 82, 0.3)', '0 0 0 0 rgba(196, 160, 82, 0)']
                    } : undefined}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg ${
                      isCompleted
                        ? 'bg-gradient-to-br from-primary to-accent ring-2 ring-primary'
                        : isUnlocked
                        ? 'bg-card border-2 border-primary'
                        : 'bg-muted border-2 border-border'
                    }`}
                    style={{
                      backgroundColor: isCompleted ? landmark.color : undefined,
                    }}
                  >
                    {isCompleted ? (
                      <span className="text-white">✓</span>
                    ) : isUnlocked ? (
                      landmark.icon
                    ) : (
                      <span className="text-muted-foreground">🔒</span>
                    )}
                  </motion.div>
                  
                  {/* Label */}
                  <span className={`mt-1 text-xs font-medium text-center max-w-[80px] leading-tight ${
                    isUnlocked ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {landmark.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 text-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[8px]">✓</span>
              <span className="text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-4 rounded-full bg-card border border-primary" />
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[8px]">🔒</span>
              <span className="text-muted-foreground">Locked</span>
            </div>
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-muted-foreground text-sm mt-4">
          Tap a landmark to start your adventure!
        </p>
      </div>
    </div>
  );
}
