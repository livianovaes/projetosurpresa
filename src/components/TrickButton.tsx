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

    // Dimensões atuais da viewport
    const viewportWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
    const viewportHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);

    // Tamanho do botão
    const buttonWidth = 200;
    const buttonHeight = 50;

    // Limites da viewport (garantindo que o botão não saia da tela)
    const minX = 0;
    const maxX = viewportWidth - buttonWidth;
    const minY = 0;
    const maxY = viewportHeight - buttonHeight;

    // Área de movimento ao redor da posição atual
    const movementRadius = 200; // Raio de movimento máximo (em pixels)

    // Gerar nova posição dentro da área de movimento
    const offsetX = (Math.random() - 0.5) * movementRadius; // Movimento aleatório no eixo X
    const offsetY = (Math.random() - 0.5) * movementRadius; // Movimento aleatório no eixo Y

    // Calcular nova posição, garantindo que o botão não saia da tela
    const newX = Math.max(minX, Math.min(position.x + offsetX, maxX));
    const newY = Math.max(minY, Math.min(position.y + offsetY, maxY));

    setPosition({ x: newX, y: newY });
    setAttempts(prev => prev + 1);
  }, [attempts, onFinalCatch, position]);

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
