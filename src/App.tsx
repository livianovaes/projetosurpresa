import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import PhotoWall from './components/PhotoWall';
import Question from './components/Question';
import TrickButton from './components/TrickButton';
import { photos, questions, loveReasons } from './data';

function FloatingHearts() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: Math.random() * window.innerWidth,
            y: -100
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute text-red-200"
        >
          <Heart size={Math.random() * 30 + 20} />
        </motion.div>
      ))}
    </div>
  );
}

function App() {
  const [stage, setStage] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleStart = () => {
    setStage(1);
  };

  const handleNextStage = () => {
    setStage(prev => prev + 1);
  };

  const handleCorrectAnswer = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setStage(4);
    }
  };

  const handleTrickButtonCaught = () => {
    setStage(5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-green-100 to-red-100">
      <div className="fixed inset-0 -z-10 bg-gradient-radial from-red-200/30 via-green-200/30 to-red-200/30" />
      <FloatingHearts />
      <PhotoWall photos={photos} />
      
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center"
          >
            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-green-500 text-white rounded-lg shadow-xl hover:from-red-600 hover:to-green-600 transition-all text-2xl font-bold flex items-center gap-2 relative overflow-hidden"
            >
              <span className="relative z-10">START</span>
              <Heart className="w-6 h-6 relative z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500 to-red-500 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="message1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <div className="max-w-2xl text-center bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-red-100">
              <p className="text-2xl text-green-800 font-serif italic">
                "I know that from afar we can't have everything that a normal couple has, 
                but I promise to make it as special as I can"
              </p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5 }}
                onClick={handleNextStage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-red-500 to-green-500 text-white rounded-lg shadow-lg hover:from-red-600 hover:to-green-600 transition-all"
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="message2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <div className="max-w-2xl text-center bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-red-100">
              <p className="text-2xl text-green-800 font-serif italic">
                "Now, it's time to test some things about us... are you ready?"
              </p>
              <motion.button
                onClick={handleNextStage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-red-500 to-green-500 text-white rounded-lg shadow-lg hover:from-red-600 hover:to-green-600 transition-all"
              >
                I'm Ready!
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="questions"
            className="min-h-screen flex items-center justify-center p-4"
          >
            <Question
              question={questions[currentQuestion]}
              onCorrectAnswer={handleCorrectAnswer}
            />
          </motion.div>
        )}

        {stage === 4 && (
          <motion.div
            key="trick-question"
            className="min-h-screen flex items-center justify-center p-4"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-8 text-green-800 font-serif">
                What do I hate about you?
              </h2>
              <TrickButton onFinalCatch={handleTrickButtonCaught} />
            </div>
          </motion.div>
        )}

        {stage === 5 && (
          <motion.div
            key="love-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <div className="max-w-2xl text-center bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-red-100">
              <h2 className="text-3xl font-bold mb-8 text-red-600 font-serif">
                ARE YOU CRAZY, HEATHER? I LOVE EVERYTHING ABOUT YOU!!!!!!!
              </h2>
              <motion.button
                onClick={handleNextStage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-red-500 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-red-600 transition-all"
              >
                DO YOU WANT TO KNOW WHY?
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === 6 && (
          <motion.div
            key="love-reasons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <div className="max-w-2xl text-center bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-red-100">
              {loveReasons.map((reason, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-xl mb-4 text-green-800 font-serif"
                >
                  {reason}
                </motion.p>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: loveReasons.length * 0.2 }}
                onClick={handleNextStage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-red-500 to-green-500 text-white rounded-lg shadow-lg hover:from-red-600 hover:to-green-600 transition-all"
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === 7 && (
          <motion.div
            key="final-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-red-900 to-green-900"
          >
            <div className="max-w-2xl text-center">
              <motion.div className="grid grid-cols-3 gap-4 mb-8">
                {photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="transform rotate-3 hover:rotate-0 transition-transform"
                  >
                    <img
                      src={photo}
                      alt="Memory"
                      className="w-full rounded-lg border-8 border-white shadow-xl"
                    />
                  </motion.div>
                ))}
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: photos.length * 0.2 }}
                className="text-2xl text-white font-serif italic"
              >
                "Thank you for being my foundation these days, you came out of nowhere and became everything in my life. 
                Thank you for every second with me, I love you and I'll take care of you forever! 
                With love, your beautiful, Lívia"
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;