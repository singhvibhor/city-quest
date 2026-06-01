import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import TeamSetup from './components/TeamSetup';
import CityMap from './components/CityMap';
import QuestDetail from './components/QuestDetail';
import QuestChallenge from './components/QuestChallenge';
import Leaderboard from './components/Leaderboard';
import AchievementsScreen from './components/AchievementsScreen';
import ProfileScreen from './components/ProfileScreen';
import { quests } from './data/quests';
import { achievements } from './data/achievements';

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  points: number;
  completedQuests: string[];
  questScores: Record<string, number>;
  earnedAchievements: string[];
  createdAt: number;
}

export interface GameState {
  currentScreen: 'welcome' | 'setup' | 'map' | 'quest-detail' | 'challenge' | 'leaderboard' | 'achievements' | 'profile';
  currentQuestId: string | null;
  team: Team | null;
  allTeams: Team[];
}

const initialState: GameState = {
  currentScreen: 'welcome',
  currentQuestId: null,
  team: null,
  allTeams: [],
};

function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('cityQuestState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  const saveState = (newState: GameState) => {
    setGameState(newState);
    localStorage.setItem('cityQuestState', JSON.stringify(newState));
  };

  const handleStartExploring = () => {
    if (gameState.team) {
      saveState({ ...gameState, currentScreen: 'map' });
    } else {
      saveState({ ...gameState, currentScreen: 'setup' });
    }
  };

  const handleTeamCreated = (team: Team) => {
    const newAllTeams = [...gameState.allTeams.filter(t => t.id !== team.id), team];
    saveState({
      ...gameState,
      team,
      allTeams: newAllTeams,
      currentScreen: 'map',
    });
  };

  const handleSelectQuest = (questId: string) => {
    saveState({
      ...gameState,
      currentQuestId: questId,
      currentScreen: 'quest-detail',
    });
  };

  const handleStartChallenge = () => {
    saveState({
      ...gameState,
      currentScreen: 'challenge',
    });
  };

  const handleChallengeComplete = (score: number, totalPossible: number) => {
    if (!gameState.team || !gameState.currentQuestId) return;

    const quest = quests.find(q => q.id === gameState.currentQuestId);
    if (!quest) return;

    const earnedPoints = Math.round((score / totalPossible) * quest.points);
    const alreadyCompleted = gameState.team.completedQuests.includes(quest.id);

    const updatedTeam: Team = {
      ...gameState.team,
      points: alreadyCompleted 
        ? gameState.team.points 
        : gameState.team.points + earnedPoints,
      completedQuests: alreadyCompleted
        ? gameState.team.completedQuests
        : [...gameState.team.completedQuests, quest.id],
      questScores: {
        ...gameState.team.questScores,
        [quest.id]: Math.max(gameState.team.questScores[quest.id] || 0, earnedPoints),
      },
    };

    // Check for new achievements
    const newAchievements: string[] = [];
    achievements.forEach(achievement => {
      if (!updatedTeam.earnedAchievements.includes(achievement.id)) {
        let earned = false;
        switch (achievement.requirement.type) {
          case 'quests_completed':
            earned = updatedTeam.completedQuests.length >= achievement.requirement.value;
            break;
          case 'points_earned':
            earned = updatedTeam.points >= achievement.requirement.value;
            break;
          case 'category_completed':
            if (achievement.requirement.category) {
              const categoryQuests = quests.filter(q => q.challengeType === achievement.requirement.category);
              const completedInCategory = categoryQuests.filter(q => 
                updatedTeam.completedQuests.includes(q.id)
              ).length;
              earned = completedInCategory >= achievement.requirement.value;
            }
            break;
        }
        if (earned) {
          newAchievements.push(achievement.id);
        }
      }
    });

    updatedTeam.earnedAchievements = [...updatedTeam.earnedAchievements, ...newAchievements];

    const newAllTeams = gameState.allTeams.map(t => 
      t.id === updatedTeam.id ? updatedTeam : t
    );

    saveState({
      ...gameState,
      team: updatedTeam,
      allTeams: newAllTeams,
      currentScreen: 'map',
      currentQuestId: null,
    });
  };

  const handleNavigate = (screen: GameState['currentScreen']) => {
    saveState({ ...gameState, currentScreen: screen });
  };

  const handleBack = () => {
    if (gameState.currentScreen === 'challenge') {
      saveState({ ...gameState, currentScreen: 'quest-detail' });
    } else if (gameState.currentScreen === 'quest-detail') {
      saveState({ ...gameState, currentScreen: 'map', currentQuestId: null });
    } else {
      saveState({ ...gameState, currentScreen: 'map' });
    }
  };

  const handleResetProgress = () => {
    const emptyTeam: Team = {
      ...gameState.team!,
      points: 0,
      completedQuests: [],
      questScores: {},
      earnedAchievements: [],
    };
    const newAllTeams = gameState.allTeams.map(t => 
      t.id === emptyTeam.id ? emptyTeam : t
    );
    saveState({
      ...gameState,
      team: emptyTeam,
      allTeams: newAllTeams,
    });
  };

  const handleSwitchTeam = () => {
    saveState({
      ...gameState,
      team: null,
      currentScreen: 'setup',
    });
  };

  const currentQuest = gameState.currentQuestId 
    ? quests.find(q => q.id === gameState.currentQuestId) 
    : null;

  const renderScreen = () => {
    switch (gameState.currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onStart={handleStartExploring}
            hasExistingTeam={!!gameState.team}
            teamName={gameState.team?.name}
          />
        );
      case 'setup':
        return (
          <TeamSetup
            existingTeams={gameState.allTeams}
            onTeamCreated={handleTeamCreated}
            onSelectTeam={(team) => {
              saveState({ ...gameState, team, currentScreen: 'map' });
            }}
          />
        );
      case 'map':
        return (
          <CityMap
            team={gameState.team!}
            quests={quests}
            onSelectQuest={handleSelectQuest}
            onNavigate={handleNavigate}
          />
        );
      case 'quest-detail':
        return currentQuest ? (
          <QuestDetail
            quest={currentQuest}
            team={gameState.team!}
            onStartChallenge={handleStartChallenge}
            onBack={handleBack}
          />
        ) : null;
      case 'challenge':
        return currentQuest ? (
          <QuestChallenge
            quest={currentQuest}
            onComplete={handleChallengeComplete}
            onBack={handleBack}
          />
        ) : null;
      case 'leaderboard':
        return (
          <Leaderboard
            teams={gameState.allTeams}
            currentTeamId={gameState.team?.id}
            onBack={() => handleNavigate('map')}
          />
        );
      case 'achievements':
        return (
          <AchievementsScreen
            team={gameState.team!}
            achievements={achievements}
            onBack={() => handleNavigate('map')}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            team={gameState.team!}
            quests={quests}
            onBack={() => handleNavigate('map')}
            onResetProgress={handleResetProgress}
            onSwitchTeam={handleSwitchTeam}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={gameState.currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
