import { motion } from 'framer-motion';
import { landmarks } from '../data/landmarks';
import { getRandomTip, CultureTip } from '../data/cultureTips';
import { useState, useEffect } from 'react';
import type { GameState } from '../App';
import ProgressHeader from './ProgressHeader';

interface RomeMapProps {
  gameState: GameState;
  onSelectLandmark: (landmarkId: string) => void;
  onNavigate: (screen: GameState['currentScreen']) => void;
}

export default function RomeMap({ gameState, onSelectLandmark, onNavigate }: RomeMapProps) {
  const [currentTip, setCurrentTip] = useState<CultureTip | null>(null);
  const { completedLandmarks } = gameState;

  useEffect(() => {
    setCurrentTip(getRandomTip());
    const interval = setInterval(() => {
      setCurrentTip(getRandomTip());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // All landmarks are unlocked - explore in any order!
  const unlockedLandmarks = landmarks.map(l => l.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen parchment-bg flex flex-col"
    >
      <ProgressHeader gameState={gameState} onNavigate={onNavigate} />
      
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
        <div className="relative ancient-map-container burnt-edge rounded-2xl p-6 min-h-[650px] overflow-hidden">
          {/* Sepia/aged paper overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-transparent to-amber-200/20 pointer-events-none rounded-2xl" />
          
          {/* Decorative elements */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Tiber River */}
            <path
              d="M15 30 Q20 40, 25 50 Q30 60, 35 70 Q40 80, 45 90"
              fill="none"
              stroke="#5B8FAF"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Roads */}
            <path
              d="M20 45 L80 45"
              fill="none"
              stroke="#8B5A2B"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              opacity="0.4"
            />
            <path
              d="M50 20 L50 80"
              fill="none"
              stroke="#8B5A2B"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              opacity="0.4"
            />
          </svg>

          {/* Landmark pins */}
          <div className="relative h-[620px]">
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
                  onClick={() => isUnlocked && onSelectLandmark(landmark.id)}
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
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-xl border-2 ${
                      isCompleted
                        ? 'bg-gradient-to-br from-primary to-accent border-amber-300'
                        : isUnlocked
                        ? 'bg-amber-50 border-primary hover:bg-amber-100'
                        : 'bg-stone-200/80 border-stone-300'
                    }`}
                    style={{
                      backgroundColor: isCompleted ? landmark.color : undefined,
                      boxShadow: isUnlocked ? '0 4px 12px rgba(139, 90, 43, 0.4)' : undefined,
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
                  <span className={`mt-1 text-xs font-semibold text-center max-w-[80px] leading-tight px-1.5 py-0.5 rounded ${
                    isUnlocked 
                      ? 'text-amber-900 bg-amber-50/90 shadow-sm' 
                      : 'text-stone-500 bg-stone-100/80'
                  }`}>
                    {landmark.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-amber-50/95 backdrop-blur-sm rounded-lg p-3 text-xs shadow-lg border border-amber-200/50">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[8px]">&#10003;</span>
              <span className="text-amber-900">Completed</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-4 rounded-full bg-amber-50 border border-primary" />
              <span className="text-amber-900">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-[8px]">&#128274;</span>
              <span className="text-amber-900">Locked</span>
            </div>
          </div>
          
          {/* Compass rose decoration */}
          <div className="absolute top-4 right-4 w-12 h-12 opacity-60">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#8B5A2B" strokeWidth="2" opacity="0.5" />
              <path d="M50 10 L55 50 L50 90 L45 50 Z" fill="#8B5A2B" opacity="0.7" />
              <path d="M10 50 L50 45 L90 50 L50 55 Z" fill="#A0522D" opacity="0.5" />
              <text x="50" y="8" textAnchor="middle" fontSize="8" fill="#8B5A2B" fontWeight="bold">N</text>
            </svg>
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-muted-foreground text-sm mt-4">
          Tap a landmark to start your adventure!
        </p>
      </div>
    </div>
    </motion.div>
  );
}
