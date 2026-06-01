import { motion } from 'framer-motion';

export interface SavedPlayer {
  id: string;
  explorerName: string;
  avatar: string;
  coins: number;
  completedLandmarks: string[];
  earnedBadges: string[];
  stamps: string[];
  lastPlayed: number;
}

interface PlayerSelectProps {
  players: SavedPlayer[];
  onSelectPlayer: (player: SavedPlayer) => void;
  onCreateNew: () => void;
  onDeletePlayer: (playerId: string) => void;
  onBack: () => void;
}

const avatarIcons: Record<string, string> = {
  gladiator: '⚔️',
  mosaic: '🎨',
  detective: '🔍',
  traveler: '🧭',
  architect: '🏛️',
};

export default function PlayerSelect({
  players,
  onSelectPlayer,
  onCreateNew,
  onDeletePlayer,
  onBack,
}: PlayerSelectProps) {
  const sortedPlayers = [...players].sort((a, b) => b.lastPlayed - a.lastPlayed);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen parchment-bg flex flex-col"
    >
      {/* Header */}
      <div className="bg-primary/10 border-b border-primary/20 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="text-primary font-medium"
          >
            Cancel
          </motion.button>
          <h1 className="font-display text-xl text-foreground">Choose Explorer</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Create New Player Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCreateNew}
            className="w-full p-4 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-3 shadow-lg"
          >
            <span className="text-2xl">+</span>
            <span className="font-semibold text-lg">Create New Explorer</span>
          </motion.button>

          {/* Saved Players */}
          {sortedPlayers.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide px-1">
                Saved Explorers
              </h2>
              
              {sortedPlayers.map((player) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-xl shadow-md overflow-hidden border border-border"
                >
                  <button
                    onClick={() => onSelectPlayer(player)}
                    className="w-full p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors text-left"
                  >
                    {/* Avatar */}
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-inner"
                      style={{ backgroundColor: player.avatar === 'gladiator' ? '#C4A052' : 
                               player.avatar === 'mosaic' ? '#7B9E6B' :
                               player.avatar === 'detective' ? '#5B8FAF' :
                               player.avatar === 'traveler' ? '#E8B4A0' : '#A0856C' }}
                    >
                      {avatarIcons[player.avatar] || '🧭'}
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg truncate">
                        {player.explorerName}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <span>🪙</span> {player.coins}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>🏛️</span> {player.completedLandmarks.length}/12
                        </span>
                        <span className="flex items-center gap-1">
                          <span>🏅</span> {player.earnedBadges.length}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Delete Button */}
                  <div className="px-4 pb-3 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete ${player.explorerName}'s progress?`)) {
                          onDeletePlayer(player.id);
                        }
                      }}
                      className="text-xs text-destructive hover:text-destructive/80 transition-colors"
                    >
                      Delete Explorer
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {sortedPlayers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🏛️</div>
              <p className="text-muted-foreground">
                No saved explorers yet. Create your first one!
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
