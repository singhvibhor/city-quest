import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameProps {
  onComplete: () => void;
}

interface FountainElement {
  id: string;
  name: string;
  icon: string;
  found: boolean;
}

const elements: FountainElement[] = [
  { id: 'obelisk', name: 'Obelisk', icon: '🗼', found: false },
  { id: 'river-god', name: 'River God', icon: '🧜', found: false },
  { id: 'water', name: 'Flowing Water', icon: '💧', found: false },
  { id: 'animals', name: 'Animals', icon: '🦁', found: false },
];

export default function PiazzaFountainDetective({ onComplete }: GameProps) {
  const [foundElements, setFoundElements] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');

  const handleFind = (elementId: string) => {
    if (foundElements.includes(elementId)) return;

    const newFound = [...foundElements, elementId];
    setFoundElements(newFound);
    
    const element = elements.find(e => e.id === elementId);
    setFeedback(`Found the ${element?.name}! Great detective work!`);

    if (newFound.length === elements.length) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Fountain Detective
        </h2>
        <p className="text-muted-foreground">
          Find all the special things hidden in the Fountain of the Four Rivers!
        </p>
        <p className="text-sm text-primary mt-2">
          {foundElements.length}/{elements.length} found
        </p>
      </div>

      {feedback && (
        <motion.div
          key={feedback}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-2 px-4 bg-secondary/20 rounded-lg text-secondary font-medium"
        >
          {feedback}
        </motion.div>
      )}

      {/* Fountain scene */}
      <div className="relative bg-gradient-to-b from-secondary/10 to-primary/20 rounded-2xl p-4 min-h-[280px]">
        <svg viewBox="0 0 200 160" className="w-full" role="img" aria-label="Fountain of the Four Rivers at Piazza Navona">
          {/* Basin */}
          <ellipse cx="100" cy="145" rx="90" ry="15" fill="#5B8FAF" opacity="0.5" />
          <ellipse cx="100" cy="140" rx="85" ry="12" fill="#87CEEB" opacity="0.4" />
          
          {/* Rock formation base */}
          <path d="M30 140 Q50 100 100 90 Q150 100 170 140" fill="#A8896C" />
          
          {/* Obelisk - clickable */}
          <motion.g
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => handleFind('obelisk')}
          >
            <rect x="92" y="20" width="16" height="80" fill={foundElements.includes('obelisk') ? '#C4A052' : '#D4C4A8'} />
            <polygon points="100,10 92,20 108,20" fill={foundElements.includes('obelisk') ? '#C4A052' : '#D4C4A8'} />
            {foundElements.includes('obelisk') && (
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                cx="100"
                cy="50"
                r="8"
                fill="#7B9E6B"
              >
                <text x="97" y="54" fill="white" fontSize="10">✓</text>
              </motion.circle>
            )}
          </motion.g>
          
          {/* River gods - clickable */}
          <motion.g
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => handleFind('river-god')}
          >
            <ellipse cx="50" cy="110" rx="20" ry="25" fill={foundElements.includes('river-god') ? '#C4A052' : '#E8DCC8'} />
            <circle cx="50" cy="95" r="8" fill={foundElements.includes('river-god') ? '#E8B4A0' : '#D4C4A8'} />
            <ellipse cx="150" cy="110" rx="20" ry="25" fill={foundElements.includes('river-god') ? '#C4A052' : '#E8DCC8'} />
            <circle cx="150" cy="95" r="8" fill={foundElements.includes('river-god') ? '#E8B4A0' : '#D4C4A8'} />
          </motion.g>
          
          {/* Water streams - clickable */}
          <motion.g
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => handleFind('water')}
          >
            <motion.path
              d="M60 120 Q55 130 65 140"
              fill="none"
              stroke={foundElements.includes('water') ? '#5B8FAF' : '#87CEEB'}
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.path
              d="M140 120 Q145 130 135 140"
              fill="none"
              stroke={foundElements.includes('water') ? '#5B8FAF' : '#87CEEB'}
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
          </motion.g>
          
          {/* Animals - clickable */}
          <motion.g
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer"
            onClick={() => handleFind('animals')}
          >
            <ellipse cx="75" cy="130" rx="10" ry="8" fill={foundElements.includes('animals') ? '#C4A052' : '#C17F59'} />
            <circle cx="75" cy="125" r="5" fill={foundElements.includes('animals') ? '#E8B4A0' : '#D4A574'} />
            <ellipse cx="125" cy="130" rx="8" ry="6" fill={foundElements.includes('animals') ? '#C4A052' : '#6B8E6B'} />
          </motion.g>
        </svg>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-3">
        {elements.map((element) => {
          const isFound = foundElements.includes(element.id);
          return (
            <motion.div
              key={element.id}
              animate={isFound ? { scale: [1, 1.1, 1] } : undefined}
              className={`p-3 rounded-xl border-2 flex items-center gap-2 ${
                isFound
                  ? 'bg-secondary/20 border-secondary'
                  : 'bg-card border-border'
              }`}
            >
              <span className="text-xl">{element.icon}</span>
              <span className={`text-sm font-medium ${isFound ? 'line-through text-muted-foreground' : ''}`}>
                {element.name}
              </span>
              {isFound && <span className="ml-auto text-secondary">✓</span>}
            </motion.div>
          );
        })}
      </div>

      {/* Hint */}
      <p className="text-center text-sm text-muted-foreground">
        Tap on the fountain to find each hidden element!
      </p>

      {/* Fun fact when complete */}
      {foundElements.length === elements.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 rounded-xl p-4 text-center"
        >
          <p className="text-foreground">
            The four river gods represent the Nile, Ganges, Danube, and Rio de la Plata - 
            major rivers from four continents!
          </p>
        </motion.div>
      )}
    </div>
  );
}
