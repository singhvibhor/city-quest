import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import ExplorerSetup from './components/ExplorerSetup';
import RomeMap from './components/RomeMap';
import AdventureScreen from './components/AdventureScreen';
import Passport from './components/Passport';
import BadgeGallery from './components/BadgeGallery';
import ParentCorner from './components/ParentCorner';
import RewardModal from './components/RewardModal';
import { landmarks } from './data/landmarks';
import { badges, Badge } from './data/badges';

export interface GameState {
  explorerName: string;
  avatar: string;
  coins: number;
  completedLandmarks: string[];
  earnedBadges: string[];
  stamps: string[];
  currentScreen: 'welcome' | 'setup' | 'map' | 'adventure' | 'passport' | 'badges' | 'parent';
  currentLandmark: string | null;
  soundEnabled: boolean;
}

const initialState: GameState = {
  explorerName: '',
  avatar: '',
  coins: 0,
  completedLandmarks: [],
  earnedBadges: [],
  stamps: [],
  currentScreen: 'welcome',
  currentLandmark: null,
  soundEnabled: true,
};

function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('romeQuestState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState<{
    type: 'coins' | 'badge' | 'stamp';
    amount?: number;
    badge?: Badge;
    landmark?: string;
  } | null>(null);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('romeQuestState', JSON.stringify(gameState));
  }, [gameState]);

  // Check for badge unlocks
  const checkBadgeUnlocks = (newState: GameState): string[] => {
    const newBadges: string[] = [];
    
    badges.forEach(badge => {
      if (!newState.earnedBadges.includes(badge.id)) {
        let earned = false;
        
        switch (badge.id) {
          case 'first-steps':
            earned = newState.completedLandmarks.length >= 1;
            break;
          case 'history-buff':
            earned = newState.completedLandmarks.includes('colosseum') &&
                     newState.completedLandmarks.includes('forum') &&
                     newState.completedLandmarks.includes('pantheon');
            break;
          case 'fountain-finder':
            earned = newState.completedLandmarks.includes('trevi') &&
                     newState.completedLandmarks.includes('piazza-navona');
            break;
          case 'culture-champion':
            earned = newState.completedLandmarks.includes('vatican') &&
                     newState.completedLandmarks.includes('castel');
            break;
          case 'foodie-explorer':
            earned = newState.completedLandmarks.includes('market') &&
                     newState.completedLandmarks.includes('trastevere');
            break;
          case 'nature-navigator':
            earned = newState.completedLandmarks.includes('villa-borghese') &&
                     newState.completedLandmarks.includes('tiber');
            break;
          case 'rome-master':
            earned = newState.completedLandmarks.length === landmarks.length;
            break;
          case 'coin-collector':
            earned = newState.coins >= 100;
            break;
          case 'stamp-collector':
            earned = newState.stamps.length >= 6;
            break;
          case 'super-explorer':
            earned = newState.completedLandmarks.length >= 6;
            break;
        }
        
        if (earned) {
          newBadges.push(badge.id);
        }
      }
    });
    
    return newBadges;
  };

  const handleStartAdventure = () => {
    if (gameState.explorerName) {
      setGameState(prev => ({ ...prev, currentScreen: 'map' }));
    } else {
      setGameState(prev => ({ ...prev, currentScreen: 'setup' }));
    }
  };

  const handleSetupComplete = (name: string, avatar: string, _snack?: string) => {
    setGameState(prev => ({
      ...prev,
      explorerName: name,
      avatar,
      currentScreen: 'map',
    }));
  };

  const handleSelectLandmark = (landmarkId: string) => {
    setGameState(prev => ({
      ...prev,
      currentLandmark: landmarkId,
      currentScreen: 'adventure',
    }));
  };

  const handleGameComplete = (coinsEarned: number) => {
    const landmarkId = gameState.currentLandmark!;
    
    // Update state with new completion
    const newState: GameState = {
      ...gameState,
      coins: gameState.coins + coinsEarned,
      completedLandmarks: gameState.completedLandmarks.includes(landmarkId)
        ? gameState.completedLandmarks
        : [...gameState.completedLandmarks, landmarkId],
      stamps: gameState.stamps.includes(landmarkId)
        ? gameState.stamps
        : [...gameState.stamps, landmarkId],
    };
    
    // Check for new badges
    const newBadges = checkBadgeUnlocks(newState);
    if (newBadges.length > 0) {
      newState.earnedBadges = [...newState.earnedBadges, ...newBadges];
    }
    
    setGameState(newState);
    
    // Show reward modal
    if (newBadges.length > 0) {
      const badge = badges.find(b => b.id === newBadges[0]);
      setCurrentReward({ type: 'badge', badge });
    } else {
      setCurrentReward({ type: 'coins', amount: coinsEarned });
    }
    setShowReward(true);
  };

  const handleCloseReward = () => {
    setShowReward(false);
    setCurrentReward(null);
    setGameState(prev => ({ ...prev, currentScreen: 'map', currentLandmark: null }));
  };

  const handleNavigate = (screen: GameState['currentScreen']) => {
    setGameState(prev => ({ ...prev, currentScreen: screen }));
  };

  const handleResetProgress = () => {
    setGameState({
      ...initialState,
      explorerName: gameState.explorerName,
      avatar: gameState.avatar,
      currentScreen: 'map',
    });
  };

  const handleToggleSound = () => {
    setGameState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleChangePlayer = () => {
    setGameState(prev => ({ ...prev, currentScreen: 'setup' }));
  };

  const renderScreen = () => {
    switch (gameState.currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onStart={handleStartAdventure}
            hasExistingProgress={gameState.completedLandmarks.length > 0}
            explorerName={gameState.explorerName}
          />
        );
      case 'setup':
        return <ExplorerSetup onComplete={handleSetupComplete} />;
      case 'map':
        return (
          <RomeMap
            gameState={gameState}
            onSelectLandmark={handleSelectLandmark}
            onNavigate={handleNavigate}
            onChangePlayer={handleChangePlayer}
          />
        );
      case 'adventure':
        return (
          <AdventureScreen
            landmarkId={gameState.currentLandmark!}
            gameState={gameState}
            onComplete={handleGameComplete}
            onBack={() => handleNavigate('map')}
          />
        );
      case 'passport':
        return (
          <Passport
            gameState={gameState}
            onBack={() => handleNavigate('map')}
          />
        );
      case 'badges':
        return (
          <BadgeGallery
            gameState={gameState}
            onBack={() => handleNavigate('map')}
          />
        );
      case 'parent':
        return (
          <ParentCorner
            gameState={gameState}
            onBack={() => handleNavigate('map')}
            onResetProgress={handleResetProgress}
            onToggleSound={handleToggleSound}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
      
      {showReward && currentReward && (
        <RewardModal
          type={currentReward.type}
          amount={currentReward.amount}
          badge={currentReward.badge}
          onClose={handleCloseReward}
        />
      )}
    </div>
  );
}

export default App;
