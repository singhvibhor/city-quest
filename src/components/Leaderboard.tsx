import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import type { Team } from '../App';

interface LeaderboardProps {
  teams: Team[];
  currentTeamId?: string;
  onBack: () => void;
}

export default function Leaderboard({ teams, currentTeamId, onBack }: LeaderboardProps) {
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-medium">
            {rank}
          </span>
        );
    }
  };

  const getRankBg = (rank: number, isCurrentTeam: boolean) => {
    if (isCurrentTeam) return 'bg-primary/10 border-primary/30';
    switch (rank) {
      case 1:
        return 'bg-yellow-500/10 border-yellow-500/30';
      case 2:
        return 'bg-gray-400/10 border-gray-400/30';
      case 3:
        return 'bg-amber-600/10 border-amber-600/30';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">Leaderboard</h1>
              <p className="text-sm text-muted-foreground">Rome Explorers</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {sortedTeams.length === 0 ? (
          <div className="text-center py-16">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              No teams yet
            </h2>
            <p className="text-muted-foreground">
              Complete quests to see your team on the leaderboard.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedTeams.map((team, index) => {
              const rank = index + 1;
              const isCurrentTeam = team.id === currentTeamId;

              return (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-lg border ${getRankBg(rank, isCurrentTeam)} ${
                    isCurrentTeam ? 'ring-2 ring-primary/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      {getRankIcon(rank)}
                    </div>

                    {/* Team Avatar */}
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-foreground">
                        {team.name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    {/* Team Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">
                          {team.name}
                        </h3>
                        {isCurrentTeam && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {team.members.length} member{team.members.length !== 1 ? 's' : ''} &middot; {team.completedQuests.length} quests
                      </p>
                    </div>

                    {/* Points */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-xl font-bold text-foreground">{team.points}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
