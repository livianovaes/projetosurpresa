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

    // Proporção da tela padrão (1920x1080)
    const standardWidth = 1920;
    const standardHeight = 1080;

    // Dimensões atuais da viewport
    const viewportWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
    const viewportHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);

    // Fator de escala para ajustar a proporção
    const scaleX = viewportWidth / standardWidth;
    const scaleY = viewportHeight / standardHeight;
    const scale = Math.min(scaleX, scaleY); // Manter a proporção

    // Área central (30% da tela padrão, ajustada para a viewport atual)
    const centralAreaWidth = standardWidth * 0.3 * scale;
    const centralAreaHeight = standardHeight * 0.3 * scale;

    // Tamanho do botão (ajustado para a proporção)
    const buttonWidth = 200 * scale;
    const buttonHeight = 50 * scale;

    // Limites da viewport (garantindo que o botão não saia da tela)
    const minX = 0;
    const maxX = viewportWidth - buttonWidth;
    const minY = 0;
    const maxY = viewportHeight - buttonHeight;

    // Centro da viewport (ajustado para a proporção)
    const centerX = (viewportWidth - buttonWidth) / 2;
    const centerY = (viewportHeight - buttonHeight) / 2;

    // Gerar nova posição dentro da área central, respeitando os limites
    const newX = Math.max(minX, Math.min(centerX + (Math.random() - 0.5) * centralAreaWidth, maxX));
    const newY = Math.max(minY, Math.min(centerY + (Math.random() - 0.5) * centralAreaHeight, maxY));

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
