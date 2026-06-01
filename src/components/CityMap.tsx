import { motion } from 'framer-motion';
import { MapPin, Trophy, Award, User, Clock, Star } from 'lucide-react';
import type { Team } from '../App';
import type { Quest } from '../data/quests';
import { getChallengeTypeLabel, getDifficultyColor } from '../data/quests';

interface CityMapProps {
  team: Team;
  quests: Quest[];
  onSelectQuest: (questId: string) => void;
  onNavigate: (screen: 'leaderboard' | 'achievements' | 'profile') => void;
}

export default function CityMap({ team, quests, onSelectQuest, onNavigate }: CityMapProps) {
  const completedCount = team.completedQuests.length;
  const totalPoints = team.points;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                City<span className="text-primary">Quest</span>
              </h1>
              <p className="text-sm text-muted-foreground">Rome, Italy</p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Stats */}
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{totalPoints} pts</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{completedCount}/{quests.length}</span>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('leaderboard')}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  title="Leaderboard"
                >
                  <Trophy className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </button>
                <button
                  onClick={() => onNavigate('achievements')}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  title="Achievements"
                >
                  <Award className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </button>
                <button
                  onClick={() => onNavigate('profile')}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  title="Team Profile"
                >
                  <User className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">{team.name}</span>
            <span className="text-sm text-muted-foreground">
              {completedCount} of {quests.length} quests completed
            </span>
          </div>
          <div className="progress-bar h-2">
            <motion.div 
              className="progress-bar-fill h-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / quests.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Quest Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Available Quests</h2>
          <p className="text-muted-foreground">Select a location to begin your cultural exploration</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quests.map((quest, index) => {
            const isCompleted = team.completedQuests.includes(quest.id);
            const score = team.questScores[quest.id];

            return (
              <motion.button
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectQuest(quest.id)}
                className="group text-left"
              >
                <div className={`relative overflow-hidden rounded-lg border transition-all hover-lift ${
                  isCompleted ? 'border-primary/50' : 'border-border hover:border-primary/30'
                }`}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={quest.imageUrl}
                      alt={quest.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="quest-gradient absolute inset-0" />
                    
                    {/* Completed Badge */}
                    {isCompleted && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                        Completed
                      </div>
                    )}

                    {/* Difficulty Badge */}
                    <div 
                      className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: `${getDifficultyColor(quest.difficulty)}20`,
                        color: getDifficultyColor(quest.difficulty)
                      }}
                    >
                      {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 bg-card">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {quest.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{quest.era}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {quest.estimatedTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {quest.points} pts
                        </span>
                      </div>
                      <span className="text-xs text-primary/80">
                        {getChallengeTypeLabel(quest.challengeType)}
                      </span>
                    </div>

                    {isCompleted && score !== undefined && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Your score</span>
                          <span className="font-medium text-primary">{score} pts</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
