import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameProps {
  onComplete: () => void;
}

interface Bridge {
  id: string;
  name: string;
  connects: string;
}

const bridges: Bridge[] = [
  { id: 'ponte-sisto', name: 'Ponte Sisto', connects: 'Trastevere to Centro' },
  { id: 'ponte-santangelo', name: "Ponte Sant'Angelo", connects: 'Castle to City' },
  { id: 'ponte-vittorio', name: 'Ponte Vittorio', connects: 'Vatican area to Centro' },
];

export default function TiberBridgeBuilder({ onComplete }: GameProps) {
  const [builtBridges, setBuiltBridges] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');

  const handleBuildBridge = (bridgeId: string) => {
    if (builtBridges.includes(bridgeId)) return;

    const bridge = bridges.find(b => b.id === bridgeId);
    const newBuilt = [...builtBridges, bridgeId];
    setBuiltBridges(newBuilt);
    setFeedback(`Built ${bridge?.name}! It connects ${bridge?.connects}.`);

    if (newBuilt.length === bridges.length) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Bridge Builder
        </h2>
        <p className="text-muted-foreground">
          Connect Rome across the Tiber River by building bridges!
        </p>
        <p className="text-sm text-primary mt-2">
          {builtBridges.length}/{bridges.length} bridges built
        </p>
      </div>

      {feedback && (
        <motion.div
          key={feedback}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-2 px-4 bg-secondary/20 rounded-lg text-secondary font-medium text-sm"
        >
          {feedback}
        </motion.div>
      )}

      {/* River visualization */}
      <div className="relative bg-gradient-to-b from-secondary/20 to-primary/10 rounded-2xl p-4 min-h-[280px]">
        <svg viewBox="0 0 200 150" className="w-full" role="img" aria-label="Tiber River with bridges">
          {/* River */}
          <path
            d="M-10 75 Q50 60 100 75 Q150 90 210 75"
            fill="none"
            stroke="#5B8FAF"
            strokeWidth="40"
            opacity="0.4"
          />
          <path
            d="M-10 75 Q50 60 100 75 Q150 90 210 75"
            fill="none"
            stroke="#87CEEB"
            strokeWidth="30"
            opacity="0.3"
          />
          
          {/* River flow lines */}
          <motion.path
            d="M0 75 Q50 65 100 75 Q150 85 200 75"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            opacity="0.5"
            strokeDasharray="5,5"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Left bank (Trastevere) */}
          <rect x="0" y="0" width="200" height="50" fill="#7B9E6B" opacity="0.3" />
          <text x="20" y="30" fill="#3D2914" fontSize="10" fontWeight="bold">Trastevere</text>
          
          {/* Right bank */}
          <rect x="0" y="100" width="200" height="50" fill="#7B9E6B" opacity="0.3" />
          <text x="140" y="130" fill="#3D2914" fontSize="10" fontWeight="bold">Centro</text>
          
          {/* Buildings on banks */}
          <rect x="10" y="25" width="15" height="20" fill="#E8B4A0" />
          <rect x="30" y="20" width="12" height="25" fill="#D4A574" />
          <rect x="160" y="105" width="15" height="20" fill="#F5E6C8" />
          <rect x="140" y="110" width="12" height="18" fill="#C17F59" />
          
          {/* Bridge positions */}
          {bridges.map((bridge, index) => {
            const isBuilt = builtBridges.includes(bridge.id);
            const xPos = 40 + index * 55;
            
            return (
              <g key={bridge.id}>
                {isBuilt ? (
                  <motion.g
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    style={{ transformOrigin: `${xPos + 15}px 75px` }}
                  >
                    {/* Bridge deck */}
                    <rect x={xPos} y="45" width="30" height="60" fill="#C4A052" />
                    {/* Bridge arches */}
                    <ellipse cx={xPos + 15} cy="65" rx="12" ry="8" fill="#D4C4A8" />
                    <ellipse cx={xPos + 15} cy="85" rx="12" ry="8" fill="#D4C4A8" />
                    {/* Railings */}
                    <rect x={xPos} y="45" width="30" height="3" fill="#8B7355" />
                    <rect x={xPos} y="102" width="30" height="3" fill="#8B7355" />
                  </motion.g>
                ) : (
                  <g opacity="0.5">
                    <rect x={xPos} y="45" width="30" height="60" fill="none" stroke="#C4A052" strokeWidth="2" strokeDasharray="4,4" />
                    <text x={xPos + 15} y="78" fill="#C4A052" fontSize="20" textAnchor="middle">?</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bridge building buttons */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          Tap to build each bridge:
        </p>
        {bridges.map((bridge) => {
          const isBuilt = builtBridges.includes(bridge.id);
          return (
            <motion.button
              key={bridge.id}
              whileHover={!isBuilt ? { scale: 1.02 } : undefined}
              whileTap={!isBuilt ? { scale: 0.98 } : undefined}
              onClick={() => handleBuildBridge(bridge.id)}
              disabled={isBuilt}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                isBuilt
                  ? 'bg-secondary/20 border-secondary'
                  : 'bg-card border-border hover:border-primary'
              }`}
            >
              <span className="text-2xl">{isBuilt ? '🌉' : '🔨'}</span>
              <div>
                <p className="font-medium">{bridge.name}</p>
                <p className="text-xs text-muted-foreground">Connects {bridge.connects}</p>
              </div>
              {isBuilt && <span className="ml-auto text-secondary text-xl">✓</span>}
            </motion.button>
          );
        })}
      </div>

      {/* Completion message */}
      {builtBridges.length === bridges.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <p className="text-xl font-medium text-secondary">
            All bridges connected!
          </p>
          <div className="bg-primary/10 rounded-xl p-4">
            <p className="text-sm text-foreground">
              Rivers shape cities! The Tiber divided Rome, but bridges brought people together. 
              Notice how neighborhoods feel different on each side of the river.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
