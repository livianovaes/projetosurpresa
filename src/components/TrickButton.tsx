import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onFinalCatch: () => void;
}

const TrickButton: React.FC<Props> = ({ onFinalCatch }) => {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleHover = useCallback(() => {
    if (attempts >= 4) {
      onFinalCatch();
      return;
    }

    // Get viewport dimensions
    const viewportWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
    const viewportHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);

    // Calculate center point
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;

    // Define a smaller area around the center (30% of viewport)
    const areaWidth = viewportWidth * 0.3;
    const areaHeight = viewportHeight * 0.3;

    // Calculate boundaries relative to center
    const minX = centerX - areaWidth / 2;
    const maxX = centerX + areaWidth / 2;
    const minY = centerY - areaHeight / 2;
    const maxY = centerY + areaHeight / 2;

    // Button dimensions
    const buttonWidth = 200;
    const buttonHeight = 50;

    // Generate random position within central area
    const newX = Math.max(minX, Math.min(Math.random() * (maxX - minX - buttonWidth) + minX, maxX - buttonWidth));
    const newY = Math.max(minY, Math.min(Math.random() * (maxY - minY - buttonHeight) + minY, maxY - buttonHeight));
    
    setPosition({ x: newX, y: newY });
    setAttempts(prev => prev + 1);
  }, [attempts, onFinalCatch]);

  return (
    <motion.button
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", duration: 0.5 }}
      onHoverStart={handleHover}
      className="px-6 py-3 bg-gradient-to-r from-red-500 to-green-500 text-white rounded-lg shadow-lg hover:from-red-600 hover:to-green-600 transition-colors absolute"
      style={{ position: 'fixed' }}
    >
      EVERYTHING!
    </motion.button>
  );
};

export default TrickButton;