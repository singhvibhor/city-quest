import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Compass, BookOpen, Scroll, Crown, Trophy, Medal, Utensils, Columns } from 'lucide-react';
import type { Team } from '../App';
import type { Achievement } from '../data/achievements';
import { getTierColor, getTierLabel } from '../data/achievements';

interface AchievementsScreenProps {
  team: Team;
  achievements: Achievement[];
  onBack: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'compass': <Compass className="w-6 h-6" />,
  'book-open': <BookOpen className="w-6 h-6" />,
  'scroll': <Scroll className="w-6 h-6" />,
  'crown': <Crown className="w-6 h-6" />,
  'trophy': <Trophy className="w-6 h-6" />,
  'medal': <Medal className="w-6 h-6" />,
  'utensils': <Utensils className="w-6 h-6" />,
  'columns': <Columns className="w-6 h-6" />,
};

export default function AchievementsScreen({ team, achievements, onBack }: AchievementsScreenProps) {
  const earnedCount = team.earnedAchievements.length;
  const totalCount = achievements.length;

  // Group achievements by tier
  const groupedAchievements = {
    platinum: achievements.filter(a => a.tier === 'platinum'),
    gold: achievements.filter(a => a.tier === 'gold'),
    silver: achievements.filter(a => a.tier === 'silver'),
    bronze: achievements.filter(a => a.tier === 'bronze'),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="font-display text-xl font-bold text-foreground">Achievements</h1>
              <p className="text-sm text-muted-foreground">
                {earnedCount} of {totalCount} unlocked
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Your Progress</h2>
            <span className="text-2xl font-bold text-primary">
              {Math.round((earnedCount / totalCount) * 100)}%
            </span>
          </div>
          <div className="progress-bar h-3">
            <motion.div 
              className="progress-bar-fill h-full"
              initial={{ width: 0 }}
              animate={{ width: `${(earnedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Achievements by Tier */}
        {(['gold', 'silver', 'bronze'] as const).map(tier => {
          const tierAchievements = groupedAchievements[tier];
          if (tierAchievements.length === 0) return null;

          return (
            <section key={tier} className="mb-8">
              <h2 
                className="font-display text-lg font-semibold mb-4 flex items-center gap-2"
                style={{ color: getTierColor(tier) }}
              >
                <Trophy className="w-5 h-5" />
                {getTierLabel(tier)} Achievements
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {tierAchievements.map((achievement, index) => {
                  const isEarned = team.earnedAchievements.includes(achievement.id);

                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-lg border ${
                        isEarned 
                          ? 'bg-card border-border' 
                          : 'bg-secondary/50 border-border/50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isEarned ? '' : 'opacity-40'
                          }`}
                          style={{ 
                            backgroundColor: `${getTierColor(tier)}20`,
                            color: getTierColor(tier)
                          }}
                        >
                          {isEarned ? iconMap[achievement.icon] : <Lock className="w-6 h-6" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold mb-1 ${
                            isEarned ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {achievement.name}
                          </h3>
                          <p className={`text-sm ${
                            isEarned ? 'text-muted-foreground' : 'text-muted-foreground/60'
                          }`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
