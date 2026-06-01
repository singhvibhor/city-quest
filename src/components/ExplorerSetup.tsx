import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from './Mascot';

interface ExplorerSetupProps {
  onComplete: (name: string, avatar: string, snack?: string) => void;
}

const avatars = [
  { id: 'gladiator', name: 'Little Gladiator', icon: '⚔️', color: '#C4A052' },
  { id: 'mosaic', name: 'Mosaic Maker', icon: '🎨', color: '#6B8E6B' },
  { id: 'detective', name: 'Gelato Detective', icon: '🔍', color: '#E8B4A0' },
  { id: 'traveler', name: 'Time Traveler', icon: '⏰', color: '#5B8FAF' },
  { id: 'architect', name: 'Junior Architect', icon: '🏛️', color: '#C17F59' },
];

const snacks = [
  { id: 'gelato', name: 'Gelato', icon: '🍨' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'suppli', name: 'Suppli', icon: '🍙' },
  { id: 'biscotti', name: 'Biscotti', icon: '🍪' },
  { id: 'fruit', name: 'Fresh Fruit', icon: '🍇' },
];

export default function ExplorerSetup({ onComplete }: ExplorerSetupProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [snack, setSnack] = useState('');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(name, avatar, snack);
    }
  };

  const canProceed = () => {
    if (step === 1) return name.trim().length >= 2;
    if (step === 2) return avatar !== '';
    return snack !== '';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 parchment-bg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md"
      >
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              className={`w-3 h-3 rounded-full ${s <= step ? 'bg-primary' : 'bg-muted'}`}
              animate={{ scale: s === step ? 1.2 : 1 }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <Mascot size="medium" className="mx-auto mb-4" />
              <h2 className="font-display text-3xl text-foreground mb-2">
                What&apos;s your name, explorer?
              </h2>
              <p className="text-muted-foreground mb-6">
                Every great explorer needs a name for their passport!
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your explorer name..."
                className="w-full px-4 py-3 text-lg rounded-lg border-2 border-border bg-card text-card-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                maxLength={20}
                autoFocus
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <h2 className="font-display text-3xl text-foreground mb-2">
                Choose your explorer style!
              </h2>
              <p className="text-muted-foreground mb-6">
                Who will you be on your Roman adventure?
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {avatars.map((a) => (
                  <motion.button
                    key={a.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAvatar(a.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      avatar === a.id
                        ? 'border-primary bg-primary/10 shadow-lg'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                    style={{ 
                      boxShadow: avatar === a.id ? `0 4px 12px ${a.color}40` : undefined 
                    }}
                  >
                    <div className="text-3xl mb-2">{a.icon}</div>
                    <div className="text-sm font-medium text-card-foreground">{a.name}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="snack"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <h2 className="font-display text-3xl text-foreground mb-2">
                Pick your travel snack!
              </h2>
              <p className="text-muted-foreground mb-6">
                Every explorer needs energy for the journey!
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {snacks.map((s) => (
                  <motion.button
                    key={s.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSnack(s.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      snack === s.id
                        ? 'border-primary bg-primary/10 shadow-lg'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="text-sm font-medium text-card-foreground">{s.name}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(step - 1)}
              className="btn bg-muted text-muted-foreground hover:bg-muted/80"
            >
              Back
            </motion.button>
          ) : (
            <div />
          )}
          <motion.button
            whileHover={canProceed() ? { scale: 1.05 } : undefined}
            whileTap={canProceed() ? { scale: 0.95 } : undefined}
            onClick={handleNext}
            disabled={!canProceed()}
            className="btn btn-primary"
          >
            {step === 3 ? 'Start Exploring!' : 'Next'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
