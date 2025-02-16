import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Question as QuestionType } from '../types';

interface Props {
  question: QuestionType;
  onCorrectAnswer: () => void;
}

const Question: React.FC<Props> = ({ question, onCorrectAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === question.correctAnswer) {
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        onCorrectAnswer();
      }, 1000);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl border border-red-100"
    >
      <h2 className="text-2xl font-bold mb-6 text-green-800 font-serif">{question.question}</h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => !showFeedback && handleAnswer(option)}
            disabled={showFeedback}
            whileHover={!showFeedback ? { scale: 1.02 } : {}}
            whileTap={!showFeedback ? { scale: 0.98 } : {}}
            className={`w-full p-4 text-left rounded-lg transition-all ${
              selectedAnswer === option
                ? option === question.correctAnswer
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-white hover:bg-green-50'
            } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Question;