import { useState } from 'react';
import { motion } from 'framer-motion';
import { landmarks } from '../data/landmarks';
import type { GameState } from '../App';
import ColosseumGearMatch from '../games/ColosseumGearMatch';
import ForumBuilder from '../games/ForumBuilder';
import PantheonOculus from '../games/PantheonOculus';
import TreviCoinToss from '../games/TreviCoinToss';
import SpanishStepsCounter from '../games/SpanishStepsCounter';
import PiazzaFountainDetective from '../games/PiazzaFountainDetective';
import VaticanDressCode from '../games/VaticanDressCode';
import CastleTimeline from '../games/CastleTimeline';
import TrastevereSpotIt from '../games/TrastevereSpotIt';
import MarketBasket from '../games/MarketBasket';
import ParkPicnicQuest from '../games/ParkPicnicQuest';
import TiberBridgeBuilder from '../games/TiberBridgeBuilder';

interface AdventureScreenProps {
  landmarkId: string;
  gameState: GameState;
  onComplete: (coinsEarned: number) => void;
  onBack: () => void;
}

export default function AdventureScreen({ landmarkId, onComplete, onBack }: AdventureScreenProps) {
  const [stage, setStage] = useState<'intro' | 'game' | 'complete'>('intro');
  
  const landmark = landmarks.find(l => l.id === landmarkId);
  
  if (!landmark) {
    return (
      <div className="min-h-screen parchment-bg flex items-center justify-center">
        <p>Landmark not found</p>
      </div>
    );
  }

  const handleGameComplete = () => {
    setStage('complete');
  };

  const handleClaimBadge = () => {
    onComplete(10); // Award 10 coins per completed landmark
  };

  const renderGame = () => {
    const gameProps = { onComplete: handleGameComplete };
    
    switch (landmark.gameType) {
      case 'GearMatch':
        return <ColosseumGearMatch {...gameProps} />;
      case 'ForumBuilder':
        return <ForumBuilder {...gameProps} />;
      case 'PantheonOculus':
        return <PantheonOculus {...gameProps} />;
      case 'TreviCoinToss':
        return <TreviCoinToss {...gameProps} />;
      case 'SpanishStepsCounter':
        return <SpanishStepsCounter {...gameProps} />;
      case 'PiazzaFountainDetective':
        return <PiazzaFountainDetective {...gameProps} />;
      case 'VaticanDressCode':
        return <VaticanDressCode {...gameProps} />;
      case 'CastleTimeline':
        return <CastleTimeline {...gameProps} />;
      case 'TrastevereSpotIt':
        return <TrastevereSpotIt {...gameProps} />;
      case 'MarketBasket':
        return <MarketBasket {...gameProps} />;
      case 'ParkPicnicQuest':
        return <ParkPicnicQuest {...gameProps} />;
      case 'TiberBridgeBuilder':
        return <TiberBridgeBuilder {...gameProps} />;
      default:
        return <div>Game not found</div>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen parchment-bg"
    >
      {/* Hero Image Header */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={landmark.imageUrl} 
          alt={landmark.name}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(to bottom, transparent 30%, ${landmark.color}90 100%)` 
          }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-stone-200"
        >
          Back to Map
        </motion.button>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg bg-white/90"
            >
              {landmark.icon}
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl text-white drop-shadow-lg"
              >
                {landmark.name}
              </motion.h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-2xl mx-auto">
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Where are we? */}
            <div className="bg-card rounded-xl p-5 roman-border">
              <h2 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                <span className="text-xl">📍</span> Where are we?
              </h2>
              <p className="text-card-foreground">{landmark.kidExplanation}</p>
            </div>

            {/* Fun fact */}
            <div className="bg-primary/10 rounded-xl p-5 border-2 border-primary/30">
              <h2 className="font-semibold text-primary flex items-center gap-2 mb-2">
                <span className="text-xl">💡</span> Fun Fact!
              </h2>
              <p className="text-foreground">{landmark.funFact}</p>
            </div>

            {/* Spot this */}
            <div className="bg-secondary/10 rounded-xl p-5 border-2 border-secondary/30">
              <h2 className="font-semibold text-secondary flex items-center gap-2 mb-2">
                <span className="text-xl">👀</span> Look closely when you visit!
              </h2>
              <p className="text-foreground">{landmark.spotThis}</p>
            </div>

            {/* Culture tip */}
            <div className="bg-accent/10 rounded-xl p-5 border-2 border-accent/30">
              <h2 className="font-semibold text-accent flex items-center gap-2 mb-2">
                <span className="text-xl">🤝</span> Rome Manners Tip
              </h2>
              <p className="text-foreground">{landmark.cultureTip}</p>
            </div>

            {/* Start game button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStage('game')}
              className="btn btn-primary w-full text-lg py-4"
            >
              Start the Challenge!
            </motion.button>
          </motion.div>
        )}

        {stage === 'game' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {renderGame()}
          </motion.div>
        )}

        {stage === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="font-display text-3xl text-foreground mb-2">
              Challenge Complete!
            </h2>
            <p className="text-muted-foreground mb-6">
              You&apos;ve mastered {landmark.name}!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClaimBadge}
              className="btn btn-primary text-lg px-8 py-4"
            >
              Claim Your Badge!
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
