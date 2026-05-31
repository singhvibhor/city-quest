import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameProps {
  onComplete: () => void;
}

interface Building {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const buildings: Building[] = [
  { id: 'senate', name: 'Senate House', icon: '🏛️', description: 'Where leaders made important decisions' },
  { id: 'temple', name: 'Temple', icon: '⛩️', description: 'A sacred place for worship' },
  { id: 'market', name: 'Market', icon: '🏪', description: 'Where people bought food and goods' },
  { id: 'road', name: 'Roman Road', icon: '🛤️', description: 'Connected all the buildings' },
  { id: 'speaker', name: 'Speaker Platform', icon: '📢', description: 'Where speeches were given' },
];

export default function ForumBuilder({ onComplete }: GameProps) {
  const [placedBuildings, setPlacedBuildings] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');

  const handlePlaceBuilding = (buildingId: string) => {
    if (placedBuildings.includes(buildingId)) return;

    const newPlaced = [...placedBuildings, buildingId];
    setPlacedBuildings(newPlaced);
    
    const building = buildings.find(b => b.id === buildingId);
    setFeedback(`Added ${building?.name}! ${building?.description}`);

    if (newPlaced.length === buildings.length) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Build the Ancient City
        </h2>
        <p className="text-muted-foreground">
          Tap each building to add it to your Roman Forum!
        </p>
        <p className="text-sm text-primary mt-2">
          {placedBuildings.length}/{buildings.length} buildings placed
        </p>
      </div>

      {feedback && (
        <motion.div
          key={feedback}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-2 px-4 bg-primary/10 rounded-lg text-primary font-medium text-sm"
        >
          {feedback}
        </motion.div>
      )}

      {/* City grid */}
      <div className="bg-gradient-to-br from-muted to-secondary/20 rounded-2xl p-6 roman-border min-h-[200px] relative">
        <div className="grid grid-cols-3 gap-4">
          {buildings.map((building, index) => {
            const isPlaced = placedBuildings.includes(building.id);
            return (
              <motion.div
                key={building.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={isPlaced ? { opacity: 1, scale: 1 } : { opacity: 0.2, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center ${
                  isPlaced ? 'bg-card shadow-lg' : 'bg-card/30 border-2 border-dashed border-border'
                }`}
              >
                {isPlaced && (
                  <>
                    <span className="text-3xl">{building.icon}</span>
                    <span className="text-xs mt-1 font-medium text-center px-1">{building.name}</span>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Building selection */}
      <div>
        <p className="text-sm text-muted-foreground mb-3 text-center">
          Tap to place each building:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {buildings.map((building) => {
            const isPlaced = placedBuildings.includes(building.id);
            return (
              <motion.button
                key={building.id}
                whileHover={!isPlaced ? { scale: 1.1 } : undefined}
                whileTap={!isPlaced ? { scale: 0.95 } : undefined}
                onClick={() => handlePlaceBuilding(building.id)}
                disabled={isPlaced}
                className={`p-3 rounded-xl border-2 transition-all ${
                  isPlaced
                    ? 'bg-secondary/20 border-secondary opacity-50'
                    : 'bg-card border-border hover:border-primary hover:bg-primary/5'
                }`}
              >
                <span className="text-2xl">{building.icon}</span>
                <p className="text-xs mt-1 font-medium">{building.name}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
