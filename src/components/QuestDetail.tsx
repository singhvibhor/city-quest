import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Star, MapPin, ExternalLink, BookOpen, Video, Headphones, Play } from 'lucide-react';
import type { Team } from '../App';
import type { Quest } from '../data/quests';
import { getChallengeTypeLabel, getDifficultyColor } from '../data/quests';

interface QuestDetailProps {
  quest: Quest;
  team: Team;
  onStartChallenge: () => void;
  onBack: () => void;
}

export default function QuestDetail({ quest, team, onStartChallenge, onBack }: QuestDetailProps) {
  const isCompleted = team.completedQuests.includes(quest.id);
  const score = team.questScores[quest.id];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen className="w-4 h-4" />;
      case 'book': return <BookOpen className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'podcast': return <Headphones className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[40vh] min-h-[300px]">
        <img
          src={quest.imageUrl}
          alt={quest.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 rounded-full glass hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Quest Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span 
                className="px-2 py-1 rounded text-xs font-medium"
                style={{ 
                  backgroundColor: `${getDifficultyColor(quest.difficulty)}20`,
                  color: getDifficultyColor(quest.difficulty)
                }}
              >
                {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
              </span>
              <span className="text-sm text-muted-foreground">{quest.era}</span>
              {isCompleted && (
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                  Completed
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {quest.name}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {quest.estimatedTime}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {quest.points} points
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {getChallengeTypeLabel(quest.challengeType)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Historical Context */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-3 gold-accent pb-2">
                Historical Context
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {quest.historicalContext}
              </p>
            </motion.section>

            {/* Cultural Significance */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-3 gold-accent pb-2">
                Cultural Significance
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {quest.culturalSignificance}
              </p>
            </motion.section>

            {/* Architectural Notes */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-3 gold-accent pb-2">
                Architectural Notes
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {quest.architecturalNotes}
              </p>
            </motion.section>

            {/* Local Tip */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h2 className="font-display text-lg font-semibold text-primary mb-2">
                Insider Tip
              </h2>
              <p className="text-muted-foreground leading-relaxed italic">
                {quest.localTip}
              </p>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Start Challenge Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-lg p-6 sticky top-24"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                {isCompleted ? 'Challenge Completed' : 'Ready for the Challenge?'}
              </h3>
              
              {isCompleted && score !== undefined ? (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Your best score</span>
                    <span className="font-semibold text-primary">{score} pts</span>
                  </div>
                  <div className="progress-bar h-2">
                    <div 
                      className="progress-bar-fill h-full"
                      style={{ width: `${(score / quest.points) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">
                  Test your knowledge and earn up to {quest.points} points for your team.
                </p>
              )}

              <button
                onClick={onStartChallenge}
                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                {isCompleted ? 'Try Again' : 'Start Challenge'}
              </button>
            </motion.div>

            {/* Further Reading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Further Reading
              </h3>
              <div className="space-y-3">
                {quest.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {resource.title}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{resource.type}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
