import React from 'react';

interface SkeletonBlockProps {
  width?: string;
  height?: string;
  rounded?: string;
  bgcolor?: string;
  opacity?: number;
}

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ 
  width = "w-full", 
  height = "h-4", 
  rounded = "rounded-[24px]",
  bgcolor = "#EAE9E9",
  opacity = 1
}) => {
  return (
    <div 
      className={`${width} ${height} ${rounded} transition-all duration-300 ease-out`}
      style={{ 
        backgroundColor: bgcolor,
        opacity: opacity
      }}
    />
  );
};

export default SkeletonBlock;
