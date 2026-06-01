import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, ChevronRight, Trophy, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Quest } from '../data/quests';

interface QuestChallengeProps {
  quest: Quest;
  onComplete: (score: number, totalPossible: number) => void;
  onBack: () => void;
}

export default function QuestChallenge({ quest, onComplete, onBack }: QuestChallengeProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const questions = quest.triviaQuestions;
  const question = questions[currentQuestion];
  const totalQuestions = questions.length;

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === question.correctIndex;
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Challenge complete
      setIsComplete(true);
      const finalScore = correctAnswers + (selectedAnswer === question.correctIndex ? 1 : 0);
      if (finalScore === totalQuestions) {
        // Perfect score - trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#C17F59', '#22C55E']
        });
      }
    }
  };

  const handleFinish = () => {
    const finalScore = correctAnswers;
    const pointsPerQuestion = quest.points / totalQuestions;
    const earnedPoints = Math.round(finalScore * pointsPerQuestion);
    onComplete(earnedPoints, quest.points);
  };

  if (isComplete) {
    const finalScore = correctAnswers;
    const percentage = Math.round((finalScore / totalQuestions) * 100);
    const pointsPerQuestion = quest.points / totalQuestions;
    const earnedPoints = Math.round(finalScore * pointsPerQuestion);

    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Challenge Complete!
          </h1>
          <p className="text-muted-foreground mb-8">{quest.name}</p>

          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="text-5xl font-bold text-primary mb-2">{percentage}%</div>
            <p className="text-muted-foreground mb-4">
              {finalScore} of {totalQuestions} questions correct
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <span className="text-foreground font-semibold">+{earnedPoints}</span>
              <span className="text-muted-foreground">points earned</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleFinish}
              className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Continue Exploring
            </button>
            <button
              onClick={onBack}
              className="w-full py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Review Quest Details
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{quest.name}</p>
              <p className="text-xs text-muted-foreground">
                Question {currentQuestion + 1} of {totalQuestions}
              </p>
            </div>
            <div className="w-9" />
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 progress-bar h-1">
            <motion.div 
              className="progress-bar-fill h-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Question */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-balance">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctIndex;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      showCorrect
                        ? 'border-green-500 bg-green-500/10'
                        : showIncorrect
                        ? 'border-red-500 bg-red-500/10'
                        : isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-secondary'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${
                        showCorrect ? 'text-green-500' 
                        : showIncorrect ? 'text-red-500'
                        : 'text-foreground'
                      }`}>
                        {option}
                      </span>
                      {showCorrect && <Check className="w-5 h-5 text-green-500" />}
                      {showIncorrect && <X className="w-5 h-5 text-red-500" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8"
                >
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Explanation</p>
                        <p className="text-sm text-muted-foreground">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Button */}
            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
