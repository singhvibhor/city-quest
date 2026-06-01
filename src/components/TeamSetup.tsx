import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, ChevronRight, Trash2, User } from 'lucide-react';
import type { Team, TeamMember } from '../App';

interface TeamSetupProps {
  existingTeams: Team[];
  onTeamCreated: (team: Team) => void;
  onSelectTeam: (team: Team) => void;
}

const AVATARS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const AVATAR_COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
];

export default function TeamSetup({ existingTeams, onTeamCreated, onSelectTeam }: TeamSetupProps) {
  const [mode, setMode] = useState<'select' | 'create'>(existingTeams.length > 0 ? 'select' : 'create');
  const [teamName, setTeamName] = useState('The Eternal Explorers');
  const [members, setMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Explorer 1', avatar: 'A' }
  ]);

  const addMember = () => {
    if (members.length < 6) {
      setMembers([
        ...members,
        { id: Date.now().toString(), name: '', avatar: AVATARS[members.length % AVATARS.length] }
      ]);
    }
  };

  const removeMember = (id: string) => {
    if (members.length > 1) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const updateMember = (id: string, field: keyof TeamMember, value: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleCreateTeam = () => {
    if (!teamName.trim() || members.some(m => !m.name.trim())) return;

    const team: Team = {
      id: Date.now().toString(),
      name: teamName.trim(),
      members: members.map(m => ({ ...m, name: m.name.trim() })),
      points: 0,
      completedQuests: [],
      questScores: {},
      earnedAchievements: [],
      createdAt: Date.now(),
    };

    onTeamCreated(team);
  };

  const isValid = teamName.trim() && members.every(m => m.name.trim());

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {mode === 'select' ? 'Choose Your Team' : 'Create Your Team'}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'select' 
                ? 'Continue with an existing team or create a new one'
                : 'Set up your exploration group to begin the adventure'}
            </p>
          </div>

          {/* Mode Toggle */}
          {existingTeams.length > 0 && (
            <div className="flex gap-2 mb-8 p-1 bg-secondary rounded-lg">
              <button
                onClick={() => setMode('select')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  mode === 'select' 
                    ? 'bg-card text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Existing Teams
              </button>
              <button
                onClick={() => setMode('create')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  mode === 'create' 
                    ? 'bg-card text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                New Team
              </button>
            </div>
          )}

          {mode === 'select' ? (
            <div className="space-y-3">
              {existingTeams.map(team => (
                <motion.button
                  key={team.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onSelectTeam(team)}
                  className="w-full p-4 bg-card border border-border rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">
                        {team.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{team.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {team.members.length} member{team.members.length !== 1 ? 's' : ''} &middot; {team.points} points
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Team Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="The Eternal Explorers"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              {/* Team Members */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Team Members
                </label>
                <div className="space-y-3">
                  {members.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-10 h-10 rounded-full ${AVATAR_COLORS[index % AVATAR_COLORS.length]} flex items-center justify-center`}>
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                        placeholder={`Explorer ${index + 1}`}
                        className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      />
                      {members.length > 1 && (
                        <button
                          onClick={() => removeMember(member.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {members.length < 6 && (
                  <button
                    onClick={addMember}
                    className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Team Member
                  </button>
                )}
              </div>

              {/* Create Button */}
              <button
                onClick={handleCreateTeam}
                disabled={!isValid}
                className="w-full py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Exploring
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
