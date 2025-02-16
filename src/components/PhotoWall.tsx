import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  photos: string[];
}

const PhotoWall: React.FC<Props> = ({ photos }) => {
  // Função para gerar uma rotação aleatória entre -15 e 15 graus
  const getRandomRotation = () => {
    return Math.floor(Math.random() * 30) - 15; // -15° a +15°
  };

  // Função para gerar posições aleatórias na tela, evitando sobreposição
  const getRandomPosition = (index: number, total: number) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Margem para garantir que as fotos não fiquem muito próximas das bordas
    const margin = 100;

    // Espaçamento mínimo entre as fotos
    const minSpacing = 200;

    // Tentativas para evitar sobreposição
    let x, y;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      x = Math.floor(Math.random() * (viewportWidth - margin * 2)) + margin;
      y = Math.floor(Math.random() * (viewportHeight - margin * 2)) + margin;
      attempts++;
    } while (
      // Verifica se a nova posição está muito próxima de outras fotos
      photos.slice(0, index).some((_, i) => {
        const prevX = (i + 1) * (viewportWidth / total) - minSpacing;
        const prevY = (i + 1) * (viewportHeight / total) - minSpacing;
        return Math.abs(x - prevX) < minSpacing && Math.abs(y - prevY) < minSpacing;
      }) &&
      attempts < maxAttempts
    );

    return { x, y };
  };

  return (
    <div className="fixed inset-0 -z-10 opacity-30 overflow-hidden">
      {photos.map((photo, index) => {
        const rotation = getRandomRotation();
        const position = getRandomPosition(index, photos.length);

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: rotation }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="absolute transform hover:scale-105 transition-transform duration-300"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              rotate: `${rotation}deg`,
            }}
          >
            <img
              src={photo}
              alt="Memory"
              className="w-48 rounded-lg shadow-lg border-4 border-white/50 bg-white p-2"
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default PhotoWall;
