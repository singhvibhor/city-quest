import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameProps {
  onComplete: () => void;
}

export default function PantheonOculus({ onComplete }: GameProps) {
  const [found, setFound] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<string>('');

  const handleClick = (isOculus: boolean) => {
    setAttempts(a => a + 1);
    
    if (isOculus) {
      setFound(true);
      setFeedback('You found the oculus! Sunlight streams through this opening to light up the dome.');
      setTimeout(onComplete, 2000);
    } else {
      setFeedback('Not quite! The oculus is the round opening at the very top of the dome.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Find the Oculus
        </h2>
        <p className="text-muted-foreground">
          Tap where sunlight comes through the Pantheon&apos;s dome!
        </p>
      </div>

      {feedback && (
        <motion.div
          key={feedback}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center py-2 px-4 rounded-lg font-medium ${
            found ? 'bg-secondary/20 text-secondary' : 'bg-accent/20 text-accent'
          }`}
        >
          {feedback}
        </motion.div>
      )}

      {/* Dome visualization */}
      <div className="relative flex justify-center">
        <svg viewBox="0 0 300 200" className="w-full max-w-md" role="img" aria-label="Pantheon dome with oculus at the top">
          {/* Dome background */}
          <defs>
            <radialGradient id="domeGradient" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stopColor="#E8DCC8" />
              <stop offset="100%" stopColor="#A8896C" />
            </radialGradient>
            <radialGradient id="skyGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#87CEEB" />
              <stop offset="100%" stopColor="#5B8FAF" />
            </radialGradient>
          </defs>
          
          {/* Dome shape */}
          <path
            d="M20 200 Q20 50 150 30 Q280 50 280 200 Z"
            fill="url(#domeGradient)"
          />
          
          {/* Coffers (decorative squares) */}
          {[1, 2, 3, 4].map((row) => (
            Array.from({ length: 6 - row }).map((_, i) => (
              <rect
                key={`${row}-${i}`}
                x={50 + row * 15 + i * (200 - row * 30) / (6 - row)}
                y={50 + row * 35}
                width={25 - row * 3}
                height={20 - row * 2}
                fill="none"
                stroke="#8B7355"
                strokeWidth="1"
                opacity="0.5"
              />
            ))
          ))}
          
          {/* Oculus (clickable) */}
          <motion.circle
            cx="150"
            cy="45"
            r="25"
            fill={found ? 'url(#skyGradient)' : '#D4C4A8'}
            className="cursor-pointer"
            onClick={() => handleClick(true)}
            whileHover={{ scale: 1.1 }}
            animate={found ? { 
              boxShadow: '0 0 20px rgba(135, 206, 235, 0.8)'
            } : undefined}
          />
          
          {/* Sun rays when found */}
          {found && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <motion.line
                  key={angle}
                  x1="150"
                  y1="45"
                  x2={150 + Math.cos(angle * Math.PI / 180) * 100}
                  y2={45 + Math.sin(angle * Math.PI / 180) * 100}
                  stroke="#F5E6C8"
                  strokeWidth="2"
                  opacity="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
              ))}
            </motion.g>
          )}
          
          {/* Wrong click areas */}
          <circle
            cx="80"
            cy="120"
            r="20"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handleClick(false)}
          />
          <circle
            cx="220"
            cy="120"
            r="20"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handleClick(false)}
          />
          <circle
            cx="150"
            cy="150"
            r="25"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handleClick(false)}
          />
        </svg>
      </div>

      {/* Hint */}
      {attempts >= 2 && !found && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-muted-foreground"
        >
          Hint: Look at the very top center of the dome - that&apos;s where the sky peeks through!
        </motion.p>
      )}

      {/* Fun fact when complete */}
      {found && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 rounded-xl p-4 text-center"
        >
          <p className="text-foreground">
            The oculus is 9 meters (about 30 feet) wide - that&apos;s as wide as a school bus is long!
          </p>
        </motion.div>
      )}
    </div>
  );
}
