import React from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';

interface Props {
  photos: string[];
}

const PhotoWall: React.FC<Props> = ({ photos }) => {
  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-4 transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={photo}
              alt="Memory"
              className="w-full rounded-lg shadow-lg border-4 border-white/50"
            />
          </motion.div>
        ))}
      </Masonry>
    </div>
  );
}

export default PhotoWall;