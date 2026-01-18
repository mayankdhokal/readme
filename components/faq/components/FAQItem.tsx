'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQItemData } from '../types';

interface FAQItemProps {
  item: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ item, isOpen, onToggle }) => {
  return (
    <div className="mb-4 w-full lg:w-[630px] bg-[#F4F2F0] rounded-[12px] cursor-pointer transition-colors duration-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-[24px] py-[16px] lg:py-[24px] cursor-pointer text-left"
      >
        <span className="text-[18.34px] leading-[24px] tracking-[-0.003em] font-medium text-[#111827] pr-2 sm:pr-3 md:pr-4">
          {item.question}
        </span>
        <div className="flex items-center justify-center relative w-5 h-5 sm:w-6 sm:h-6 shrink-0">
          {/* Plus icon - rotates to right and fades out when opening */}
          <motion.div
            initial={false}
            animate={{
              opacity: isOpen ? 0 : 1,
              rotate: isOpen ? 90 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute"
          >
            <Image
              src="/plus.svg"
              alt="plus"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </motion.div>
          {/* Minus icon - fades in when opening */}
          <motion.div
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              rotate: 0,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute"
          >
            <Image
              src="/minus.svg"
              alt="minus"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 sm:px-5 md:px-6 lg:px-[24px] pb-4 sm:pb-5 md:pb-6 lg:pb-[24px] text-[#7C7C7B] text-[15px] sm:text-[16px] md:text-[17.34px] leading-[22px] sm:leading-[23px] md:leading-[24px] tracking-[0.003em] font-normal">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;

