'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Role } from '../types';
import { ChevronDownIcon, ChevronUpIcon } from '../constants';

interface RoleCardProps {
  role: Role;
  isActive: boolean;
  isClicking: boolean;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, isActive, isClicking }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ 
        opacity: 1, 
        scale: isClicking ? 0.95 : 1,
        y: 0
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.98,
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 30 },
        scale: { type: "spring", stiffness: 400, damping: 20 },
        opacity: { duration: 0.25 },
        y: { type: "spring", stiffness: 300, damping: 30 }
      }}
      className={`
        w-[320px] md:w-[353px] bg-white rounded-[9px] px-[24px] py-[16px] sm:py-[20px] mb-[10px]
        flex items-center justify-between
        will-change-transform
      `}
    >
      <span className="text-[21px] sm:text-[23px] font-medium  text-black leading-[24px] select-none">
        {role}
      </span>
      <div className="bg-[#F4F2F0] p-2 rounded-[7px]">
        {isActive ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </div>
    </motion.div>
  );
};

export default RoleCard;

