'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Link as LinkIcon, FileText } from 'lucide-react';

const activities = [
  {
    type: 'assignment',
    title: 'Chemical Kinetics',
    time: '10min ago',
    file: 'assignment pt-1.pdf',
    icon: (
      <div className="flex items-center justify-center rounded-[6px] leading-[20px] text-[14px] font-normal bg-[#AABCA3] text-[#17332D] w-8 h-8">
        DO
      </div>
    )
  },
  {
    type: 'material',
    title: 'Relations and Functions',
    time: '1 days ago',
    icon: (
      <div className="w-full h-full bg-[#E4EBF6] text-[#5683D2] flex items-center justify-center rounded-[6px]">
        <BookOpen className="w-4 h-4" />
      </div>
    )
  },
  {
    type: 'assignment_link',
    title: 'Contemporary World Politics',
    time: '20hrs ago',
    links: ['assignment.pdf', 'assignment.pdf'],
    icon: (
      <div className="w-full h-full bg-[#D2CECB] text-black flex items-center justify-center rounded-[6px]">
        <FileText className="w-4 h-4" />
      </div>
    )
  }
];

export const  ProgressMockup: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor parent in-view class for mobile
  useEffect(() => {
    const checkInView = () => {
      if (!containerRef.current) return false;
      const parent = containerRef.current.closest('.in-view');
      return parent !== null && window.innerWidth < 1024;
    };

    const interval = setInterval(() => {
      if (window.innerWidth < 1024) {
        const inView = checkInView();
        setIsHovered(inView);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-end px-4 overflow-hidden group"
      onMouseEnter={() => {
        if (window.innerWidth >= 1024) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 1024) setIsHovered(false);
      }}
    >
      <div className="w-full flex flex-col gap-6 pb-2 -translate-y-24 translate-x-12">
        <motion.div
          className="relative"
        >
          <div className="flex flex-col items-start ">
            <div className="flex items-center gap-2">
              <motion.div
                layoutId="avatar-1"
                className="w-8 h-8 flex items-center justify-center rounded-[6px] leading-[20px] text-[14px] font-normal bg-[#AABCA3] text-[#17332D]"
              >
                DO
              </motion.div>
              <motion.div
                layoutId="name-1"
                className="bg-white px-3 py-1.5 rounded-[8px] leading-[20px] text-black text-sm font-normal"
              >
                Wei Chen
              </motion.div>
            </div>
          </div>
        </motion.div>
        <motion.div
          layout
          className={`relative transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="flex flex-col items-start ">
            <div className="flex items-center gap-2 ml-16">
              <motion.div
                className="w-8 h-8 flex items-center justify-center rounded-[6px] leading-[20px] text-[14px] font-normal bg-gray-300 text-[#171717]"
              >
                KB
              </motion.div>
              <motion.div
                className="bg-white px-3 py-1.5 rounded-[8px] leading-[20px] text-black text-sm font-normal"
              >
                Kaleen Ben
              </motion.div>
            </div>
          </div>
        </motion.div>
        <motion.div
          layout
          className={`relative transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="flex flex-col items-start ">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-8 h-8 flex items-center justify-center rounded-[6px] leading-[20px] text-[14px] font-normal bg-[#AABCA3] text-[#17332D]"
              >
                SH
              </motion.div>
              <motion.div
                className="bg-white px-3 py-1.5 rounded-[8px] leading-[20px] text-black text-sm font-normal"
              >
                Shawn Hong
              </motion.div>
            </div>
          </div>
        </motion.div>
        <motion.div
          layout
          className={`relative transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="flex flex-col items-start ">
            <div className="flex items-center gap-2 ml-16">
              <motion.div
                className="w-8 h-8 flex items-center justify-center rounded-[6px] leading-[20px] text-[14px] font-normal bg-gray-300 text-[#171717]"
              >
                MS
              </motion.div>
              <motion.div
                className="bg-white px-3 py-1.5 rounded-[8px] leading-[20px] text-black text-sm font-normal"
              >
                Maya Sen
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="detailed-view"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3, ease: 'easeInOut'}}
            className="h-full absolute top-[45px] left-[24px] right-0 flex flex-col items-center justify-center overflow-hidden">
            <div className="flex flex-col items-start w-full max-w-[320px]">
              
              <div className="flex items-center gap-3 mb-[27px]">
                
                <motion.div
                  layoutId="avatar-1"
                  className="w-8 h-8 flex items-center justify-center rounded-[6px] leading-[20px] text-[14px] font-normal bg-[#AABCA3] text-[#17332D]">
                  DO
                </motion.div>
                
                <motion.div
                  layoutId="name-1"
                  className="bg-white px-3 py-1.5 rounded-[8px] leading-[20px] text-black text-[14px] font-medium border border-gray-100">
                  Wei Chen
                </motion.div>
              </div>

              
                <div className="pl-4 w-full">
                  <div className="relative space-y-8">
                    {activities.map((item, idx) => (
                      <div key={idx} className="relative pl-8">
                        
                        {idx < activities.length - 1 && (
                          <div 
                            className="absolute left-0 w-0.5 bg-[#948B88]"
                            style={{
                              top: '2rem',
                              height: 'calc(100% - 2rem + 1.75rem - 0.5rem)', 
                              boxShadow: '-1px 0px 0px 0px #FFFFFF57'
                            }}
                          ></div>
                        )}
                        <div className={`absolute w-8 h-8 -left-[17px] ${idx === activities.length - 1 ? 'top-3' : 'top-0'} bg-[#F4F2F0] flex items-center justify-center z-10`}>
                          {item.icon}
                        </div>

                        
                        <div className="flex flex-col items-start gap-1.5 pt-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-medium text-gray-900 text-[14px] leading-[22px] whitespace-nowrap">{item.title}</h4>
                            <span className="text-[12px] text-[#D9D9D9]">●</span>
                            <span className="text-[12px] leading-[22px] text-[#6D6C6B] font-normal whitespace-nowrap">{item.time}</span>
                          </div>

                          
                          {(item.file || item.links) && (
                            <div className="flex gap-2 mt-0.5 overflow-hidden">
                              {(item.links ? item.links : [item.file]).map((link, i) => (
                                <div key={i} className="flex items-center gap-2 bg-white px-[10px] py-[5px] rounded-[8px] shrink-0 whitespace-nowrap">
                                  <LinkIcon size={14} className="w-[14px] h-[14px] text-black shrink-0" />
                                  <span className="text-[12px] font-medium text-gray-900">{link}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};