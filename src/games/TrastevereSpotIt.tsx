import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameProps {
  onComplete: () => void;
}

interface SpotItem {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
}

const spotItems: SpotItem[] = [
  { id: 'vines', name: 'Ivy Vines', icon: '🌿', x: 15, y: 30 },
  { id: 'shutters', name: 'Colorful Shutters', icon: '🪟', x: 40, y: 25 },
  { id: 'laundry', name: 'Hanging Laundry', icon: '👕', x: 65, y: 20 },
  { id: 'trattoria', name: 'Small Trattoria', icon: '🍝', x: 30, y: 70 },
  { id: 'scooter', name: 'Scooter', icon: '🛵', x: 75, y: 75 },
  { id: 'cat', name: 'Napping Cat', icon: '🐱', x: 85, y: 60 },
];

export default function TrastevereSpotIt({ onComplete }: GameProps) {
  const [foundItems, setFoundItems] = useState<string[]>([]);
  const [lastFound, setLastFound] = useState<string>('');

  const handleSpot = (itemId: string) => {
    if (foundItems.includes(itemId)) return;

    const item = spotItems.find(i => i.id === itemId);
    setFoundItems(prev => [...prev, itemId]);
    setLastFound(item?.name || '');

    if (foundItems.length + 1 === spotItems.length) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Neighborhood Explorer
        </h2>
        <p className="text-muted-foreground">
          Spot the charming details of Trastevere&apos;s streets!
        </p>
        <p className="text-sm text-primary mt-2">
          {foundItems.length}/{spotItems.length} found
        </p>
      </div>

      {lastFound && (
        <motion.div
          key={lastFound}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-2 px-4 bg-secondary/20 rounded-lg text-secondary font-medium"
        >
          Found: {lastFound}!
        </motion.div>
      )}

      {/* Street scene */}
      <div className="relative bg-gradient-to-b from-secondary/30 to-accent/20 rounded-2xl overflow-hidden min-h-[300px]">
        {/* Buildings background */}
        <svg viewBox="0 0 200 150" className="w-full h-full absolute inset-0" role="img" aria-label="Trastevere street scene">
          {/* Sky */}
          <rect x="0" y="0" width="200" height="60" fill="#87CEEB" opacity="0.3" />
          
          {/* Buildings */}
          <rect x="5" y="30" width="50" height="120" fill="#E8B4A0" />
          <rect x="60" y="20" width="45" height="130" fill="#F5E6C8" />
          <rect x="110" y="35" width="40" height="115" fill="#D4A574" />
          <rect x="155" y="25" width="45" height="125" fill="#C17F59" />
          
          {/* Windows */}
          {[[15, 45], [25, 45], [15, 75], [25, 75]].map(([x, y], i) => (
            <rect key={`w1-${i}`} x={x} y={y} width="10" height="15" fill="#5B8FAF" opacity="0.6" />
          ))}
          {[[70, 35], [85, 35], [70, 65], [85, 65]].map(([x, y], i) => (
            <rect key={`w2-${i}`} x={x} y={y} width="12" height="18" fill="#87CEEB" opacity="0.5" />
          ))}
          
          {/* Cobblestone street */}
          <rect x="0" y="130" width="200" height="20" fill="#8B7355" />
          <ellipse cx="30" cy="140" rx="8" ry="4" fill="#A8896C" opacity="0.5" />
          <ellipse cx="80" cy="138" rx="6" ry="3" fill="#A8896C" opacity="0.5" />
          <ellipse cx="130" cy="142" rx="7" ry="3" fill="#A8896C" opacity="0.5" />
          <ellipse cx="170" cy="139" rx="5" ry="3" fill="#A8896C" opacity="0.5" />
        </svg>

        {/* Clickable items */}
        {spotItems.map((item) => {
          const isFound = foundItems.includes(item.id);
          return (
            <motion.button
              key={item.id}
              whileHover={!isFound ? { scale: 1.3 } : undefined}
              whileTap={!isFound ? { scale: 0.9 } : undefined}
              onClick={() => handleSpot(item.id)}
              disabled={isFound}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                isFound ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              aria-label={`Find ${item.name}`}
            >
              <motion.span
                className={`text-2xl sm:text-3xl block ${isFound ? '' : 'drop-shadow-lg'}`}
                animate={isFound ? { scale: [1, 1.3, 1] } : undefined}
              >
                {item.icon}
              </motion.span>
              {isFound && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center text-white text-xs"
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-3 gap-2">
        {spotItems.map((item) => {
          const isFound = foundItems.includes(item.id);
          return (
            <div
              key={item.id}
              className={`p-2 rounded-lg text-center text-xs transition-all ${
                isFound ? 'bg-secondary/20 text-secondary' : 'bg-muted text-muted-foreground'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <p className={isFound ? 'line-through' : ''}>{item.name}</p>
            </div>
          );
        })}
      </div>

      {/* Completion message */}
      {foundItems.length === spotItems.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <p className="text-xl font-medium text-secondary">
            You noticed everything!
          </p>
          <div className="bg-primary/10 rounded-xl p-4">
            <p className="text-sm text-foreground">
              Trastevere is a real neighborhood where people live. 
              When you visit, walk slowly, speak softly, and soak in the atmosphere!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
