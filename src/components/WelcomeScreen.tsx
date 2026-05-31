import { motion } from 'framer-motion';
import Mascot from './Mascot';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 parchment-bg">
      {/* Decorative columns */}
      <div className="fixed left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-muted to-transparent opacity-50" />
      <div className="fixed right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-muted to-transparent opacity-50" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Laurel wreath decoration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-4"
        >
          <svg viewBox="0 0 200 60" className="w-48 h-16 mx-auto" aria-hidden="true">
            <path
              d="M20 50 Q50 20 100 30 Q150 20 180 50"
              fill="none"
              stroke="#7B9E6B"
              strokeWidth="3"
            />
            <path
              d="M30 45 Q60 25 100 35 Q140 25 170 45"
              fill="none"
              stroke="#7B9E6B"
              strokeWidth="2"
            />
            {/* Left leaves */}
            {[0, 1, 2, 3, 4].map((i) => (
              <ellipse
                key={`left-${i}`}
                cx={25 + i * 15}
                cy={48 - i * 3}
                rx="8"
                ry="4"
                fill="#7B9E6B"
                transform={`rotate(${-30 + i * 5} ${25 + i * 15} ${48 - i * 3})`}
              />
            ))}
            {/* Right leaves */}
            {[0, 1, 2, 3, 4].map((i) => (
              <ellipse
                key={`right-${i}`}
                cx={175 - i * 15}
                cy={48 - i * 3}
                rx="8"
                ry="4"
                fill="#7B9E6B"
                transform={`rotate(${30 - i * 5} ${175 - i * 15} ${48 - i * 3})`}
              />
            ))}
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-2 text-shadow-sm"
        >
          Rome Quest
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-primary font-semibold mb-6"
        >
          Junior Explorer
        </motion.p>

        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="flex justify-center mb-6"
        >
          <Mascot size="large" />
        </motion.div>

        {/* Mascot speech */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card rounded-xl p-4 mb-8 roman-border relative"
        >
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-card" />
          <p className="text-lg text-card-foreground font-medium">
            Ciao! I&apos;m Marco the Map Mouse!
          </p>
          <p className="text-muted-foreground mt-2">
            Ready to explore ancient Rome? Collect badges, solve clues, and become a true Rome Explorer!
          </p>
        </motion.div>

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="btn btn-primary text-xl px-10 py-4 coin-shadow"
        >
          Start Your Adventure!
        </motion.button>

        {/* Decorative coins */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex justify-center gap-4 mt-8"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xs coin-shadow"
            >
              R
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
