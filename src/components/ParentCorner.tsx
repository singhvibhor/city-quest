import { useState } from 'react';
import { motion } from 'framer-motion';
import type { GameState } from '../App';

interface ParentCornerProps {
  gameState: GameState;
  onBack: () => void;
  onResetProgress: () => void;
  onToggleSound: () => void;
}

const scavengerHuntItems = [
  'Find three different types of columns (Doric, Ionic, Corinthian)',
  'Spot a fountain with horses',
  'Count how many gelato flavors you can name in Italian',
  'Find a cat napping in the sun',
  'Spot laundry hanging between buildings',
  'Find a cobblestone that\'s a different color',
  'Listen for church bells',
  'Spot an ancient stone with Latin writing',
];

const conversationStarters = [
  'What was your favorite landmark and why?',
  'If you lived in ancient Rome, what job would you want?',
  'What food would you like to try again?',
  'What was the most surprising thing you learned?',
  'Which bridge would you like to walk across again?',
  'What would you tell a friend about Rome?',
];

export default function ParentCorner({ gameState, onBack, onResetProgress, onToggleSound }: ParentCornerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'hunt' | 'talk' | 'tips' | 'settings'>('overview');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 overflow-auto"
      onClick={onBack}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card w-full max-w-lg max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-secondary to-primary">
          <h1 className="font-display text-2xl text-primary-foreground">
            Parent & Teacher Corner
          </h1>
          <p className="text-primary-foreground/80 text-sm mt-1">
            Resources for grown-ups
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'hunt', label: 'Scavenger Hunt' },
            { id: 'talk', label: 'Talk About It' },
            { id: 'tips', label: 'Safety Tips' },
            { id: 'settings', label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 min-w-max px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-semibold text-foreground mb-2">What Kids Will Learn</h2>
                <ul className="space-y-2 text-sm text-card-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>Major Roman landmarks and their historical significance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>Italian cultural customs and etiquette</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>How to be a respectful visitor in sacred and historic places</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>Basic Italian words and phrases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>How ancient Rome shaped modern cities</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-foreground mb-2">Suggested Pacing</h2>
                <div className="bg-muted/50 rounded-xl p-4 text-sm">
                  <p className="text-card-foreground mb-2">
                    <strong>Before your trip:</strong> Complete 2-3 landmarks to build excitement
                  </p>
                  <p className="text-card-foreground mb-2">
                    <strong>During your trip:</strong> Revisit landmarks as you visit them in person
                  </p>
                  <p className="text-card-foreground">
                    <strong>After your trip:</strong> Complete remaining landmarks to reinforce memories
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-foreground mb-2">Age Appropriateness</h2>
                <p className="text-sm text-card-foreground">
                  This game is designed for children ages 6-11. Younger children may need 
                  help reading, while older children can explore more independently. All 
                  content has been reviewed for age-appropriate historical accuracy.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'hunt' && (
            <div className="space-y-4">
              <p className="text-sm text-card-foreground">
                Use this scavenger hunt during your real visit to Rome! 
                Check off items as you find them together.
              </p>
              <div className="space-y-2">
                {scavengerHuntItems.map((item, index) => (
                  <label
                    key={index}
                    className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-card-foreground">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'talk' && (
            <div className="space-y-4">
              <p className="text-sm text-card-foreground">
                Use these conversation starters to extend learning and hear 
                what your child remembers and found most interesting.
              </p>
              <div className="space-y-3">
                {conversationStarters.map((starter, index) => (
                  <div
                    key={index}
                    className="p-4 bg-primary/5 rounded-xl border-l-4 border-primary"
                  >
                    <p className="text-sm text-card-foreground">{starter}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-4">
              <div className="bg-accent/10 rounded-xl p-4">
                <h3 className="font-semibold text-accent mb-2">Street Safety</h3>
                <ul className="text-sm text-card-foreground space-y-1">
                  <li>• Watch for scooters - they can appear quickly</li>
                  <li>• Stay on sidewalks and use crosswalks</li>
                  <li>• Hold hands in crowded piazzas</li>
                  <li>• Cobblestones can be uneven - wear sturdy shoes</li>
                </ul>
              </div>

              <div className="bg-secondary/10 rounded-xl p-4">
                <h3 className="font-semibold text-secondary mb-2">Visiting Sacred Sites</h3>
                <ul className="text-sm text-card-foreground space-y-1">
                  <li>• Bring a light scarf for covering shoulders</li>
                  <li>• Avoid shorts that are too short</li>
                  <li>• Use quiet voices inside churches</li>
                  <li>• No flash photography in most places</li>
                </ul>
              </div>

              <div className="bg-primary/10 rounded-xl p-4">
                <h3 className="font-semibold text-primary mb-2">General Tips</h3>
                <ul className="text-sm text-card-foreground space-y-1">
                  <li>• Carry water - especially in summer</li>
                  <li>• Take breaks in parks and gelaterias</li>
                  <li>• Lunch is typically 12-3pm, dinner after 7pm</li>
                  <li>• Many sites close for riposo (afternoon break)</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-2">Sound</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-card-foreground">Sound Effects</span>
                  <button
                    onClick={onToggleSound}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      gameState.soundEnabled ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                        gameState.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-2">Progress</h3>
                <div className="space-y-2 text-sm text-card-foreground">
                  <p>Landmarks completed: {gameState.completedLandmarks.length}/12</p>
                  <p>Coins earned: {gameState.coins}</p>
                  <p>Badges earned: {gameState.earnedBadges.length}</p>
                </div>
                <button
                  onClick={onResetProgress}
                  className="mt-4 w-full py-2 px-4 bg-destructive/10 text-destructive rounded-lg text-sm font-medium hover:bg-destructive/20 transition-colors"
                >
                  Reset All Progress
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Close button */}
        <div className="p-4 border-t border-border">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="btn btn-secondary w-full"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
