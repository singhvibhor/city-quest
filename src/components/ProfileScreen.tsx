import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Star, MapPin, RefreshCw, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import type { Team } from '../App';
import type { Quest } from '../data/quests';

interface ProfileScreenProps {
  team: Team;
  quests: Quest[];
  onBack: () => void;
  onResetProgress: () => void;
  onSwitchTeam: () => void;
}

export default function ProfileScreen({ team, quests, onBack, onResetProgress, onSwitchTeam }: ProfileScreenProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  const completedQuests = quests.filter(q => team.completedQuests.includes(q.id));
  const totalPossiblePoints = quests.reduce((sum, q) => sum + q.points, 0);

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
            <h1 className="font-display text-xl font-bold text-foreground">Team Profile</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Team Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-primary">
              {team.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">{team.name}</h2>
          <p className="text-muted-foreground">
            Exploring Rome since {new Date(team.createdAt).toLocaleDateString()}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Star className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{team.points}</p>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{team.completedQuests.length}</p>
            <p className="text-xs text-muted-foreground">Quests Done</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{team.members.length}</p>
            <p className="text-xs text-muted-foreground">Members</p>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 mb-6"
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Quests Completed</span>
                <span className="text-foreground font-medium">
                  {team.completedQuests.length} / {quests.length}
                </span>
              </div>
              <div className="progress-bar h-2">
                <div 
                  className="progress-bar-fill h-full"
                  style={{ width: `${(team.completedQuests.length / quests.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Points Earned</span>
                <span className="text-foreground font-medium">
                  {team.points} / {totalPossiblePoints}
                </span>
              </div>
              <div className="progress-bar h-2">
                <div 
                  className="progress-bar-fill h-full"
                  style={{ width: `${(team.points / totalPossiblePoints) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg mb-6"
        >
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="w-full p-4 flex items-center justify-between"
          >
            <h3 className="font-display text-lg font-semibold text-foreground">Team Members</h3>
            {showMembers ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
          {showMembers && (
            <div className="px-4 pb-4 space-y-3">
              {team.members.map((member, index) => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'][index % 6]
                  }`}>
                    <span className="text-white font-medium">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-foreground">{member.name}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Completed Quests */}
        {completedQuests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-lg p-6 mb-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Completed Quests
            </h3>
            <div className="space-y-3">
              {completedQuests.map(quest => (
                <div key={quest.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={quest.imageUrl} 
                      alt={quest.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span className="text-foreground">{quest.name}</span>
                  </div>
                  <span className="text-primary font-medium">
                    +{team.questScores[quest.id] || 0}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <button
            onClick={onSwitchTeam}
            className="w-full p-4 bg-secondary border border-border rounded-lg flex items-center justify-center gap-2 text-foreground hover:bg-secondary/80 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Switch Team
          </button>
          
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full p-4 bg-secondary border border-border rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Reset Progress
            </button>
          ) : (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-sm text-foreground mb-3">
                Are you sure? This will reset all points and completed quests for this team.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onResetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="flex-1 py-2 bg-destructive text-white rounded-lg font-medium hover:bg-destructive/90 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
