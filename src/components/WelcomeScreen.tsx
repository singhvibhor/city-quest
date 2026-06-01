import { motion } from 'framer-motion';
import { MapPin, Users, Trophy, BookOpen } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  hasExistingTeam: boolean;
  teamName?: string;
}

export default function WelcomeScreen({ onStart, hasExistingTeam, teamName }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Cultural Exploration Reimagined
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
              City<span className="text-primary">Quest</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Embark on a sophisticated journey through Rome&apos;s rich tapestry of history, 
              art, and culture. Challenge your group with curated quests that transform 
              sightseeing into an intellectual adventure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={onStart}
              className="group px-8 py-4 bg-primary text-primary-foreground font-medium rounded-md transition-all hover:bg-primary/90 flex items-center gap-3"
            >
              {hasExistingTeam ? `Continue as ${teamName}` : 'Begin Your Journey'}
              <MapPin className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 border-t border-border bg-card/50"
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Team Competition"
              description="Form your group and compete against others exploring the same city. Track scores and unlock achievements together."
            />
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Deep Cultural Content"
              description="Go beyond surface-level facts with rich historical context, architectural insights, and curated reading recommendations."
            />
            <FeatureCard
              icon={<Trophy className="w-6 h-6" />}
              title="Gamified Discovery"
              description="Complete challenges, earn points, and unlock achievements as you explore. Learning has never been this engaging."
            />
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-6 px-6 text-center">
        <p className="text-muted-foreground text-sm">
          Currently featuring <span className="text-primary font-medium">Rome, Italy</span> 
          {' '}&middot;{' '}More cities coming soon
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
