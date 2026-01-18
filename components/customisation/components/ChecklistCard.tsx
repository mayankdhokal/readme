'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '../constants';

interface ChecklistCardProps {
  items: string[];
  checkedCount: number;
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({ items, checkedCount }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      // Exit is handled by parent AnimatePresence in App.tsx
      className="w-[320px] md:w-[353px] bg-white rounded-[9px] px-[24px] py-[16px] sm:py-[20px]"
    >
      <h3 className="text-[#6D6C6B] font-medium mb-[10px] text-[16px] leading-[22px] tracking-[0.01em] ">Require</h3>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-[10px]">
            <div 
              className={`
                w-8 h-8 rounded-[9px] border transition-colors duration-200 flex items-center justify-center shrink-0
                ${index < checkedCount ? 'bg-[#5683D2] border-0' : 'bg-transparent border-[#DBDBDB]'}
              `}
            >
              {index < checkedCount && <CheckIcon />}
            </div>
            <span className="text-[21px] sm:text-[23px] font-normal text-black leading-[24px]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ChecklistCard;

