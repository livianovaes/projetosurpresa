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

    // Button dimensions
    const buttonWidth = 200; // Largura do botão
    const buttonHeight = 50; // Altura do botão

    // Define a central area (30% of viewport)
    const areaWidth = viewportWidth * 0.3;
    const areaHeight = viewportHeight * 0.3;

    // Calculate boundaries for the button to stay within the viewport
    const minX = 0; // Não pode ser menor que 0 (lado esquerdo da tela)
    const maxX = viewportWidth - buttonWidth; // Não pode ser maior que a largura da tela menos a largura do botão
    const minY = 0; // Não pode ser menor que 0 (topo da tela)
    const maxY = viewportHeight - buttonHeight; // Não pode ser maior que a altura da tela menos a altura do botão

    // Calculate center point of the central area
    const centerX = (viewportWidth / 2) - (buttonWidth / 2); // Centralizado horizontalmente
    const centerY = (viewportHeight / 2) - (buttonHeight / 2); // Centralizado verticalmente

    // Generate random position within the central area, ensuring it stays within the viewport
    const newX = Math.max(minX, Math.min(centerX + (Math.random() - 0.5) * areaWidth, maxX));
    const newY = Math.max(minY, Math.min(centerY + (Math.random() - 0.5) * areaHeight, maxY));

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
