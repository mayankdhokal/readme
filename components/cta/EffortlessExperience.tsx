'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CaretLeft } from '@phosphor-icons/react';
import { FileText, Plus, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const EffortlessExperience = () => {
  const [status, setStatus] = useState<'none' | 'approved' | 'declined'>('none');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (status === 'approved' || status === 'declined') {
      timeoutRef.current = setTimeout(() => {
        setStatus('none');
      }, 3000);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [status]);

  const handleApprove = () => {
    setStatus('approved');
  };

  const handleDecline = () => {
    setStatus('declined');
  };
  return (
    <div className="w-full bg-white py-[134px]  sm:py-16 md:py-20 lg:py-[149px] pt-[136px] md:pt-0 px-4 sm:px-6 md:px-12 lg:px-[64px] " style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" 
    }}>
      <div className="max-w-8xl mx-auto">
        <h2 className="text-[30px] sm:text-[32px] md:text-[38px] lg:text-[44px] leading-[30px] sm:leading-[36px] md:leading-[42px] lg:leading-[44px] tracking-[-0.003em] text-black font-medium mb-[40px] sm:mb-12 md:mb-16 lg:mb-[64px] " >
          Effortless experience. <br />
          <span className="whitespace-nowrap">Learn in your own workplace</span>
        </h2>

        <div className="bg-[#F4F2F0] group rounded-[12px] h-[632px] lg:max-h-[514px]  sm:h-full overflow-hidden flex flex-col lg:flex-row relative">
          {/* Left Content */}
          <div className=" lg:w-[45%] lg:max-h-[514px] flex flex-col p-[24px] sm:py-12 md:py-16 lg:py-[129px]  sm:px-6 md:px-8 lg:px-[40px] justify-center z-10">
            <h3 className="text-[21px] sm:text-[24px] md:text-[26px] lg:text-[28px] leading-[22px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px] lg:tracking-[0.002em] font-medium text-black mb-3 sm:mb-[12px] ">
              Get it ready,<br />
              for the future generation.
            </h3>
            <p className="text-[17px]  lg:text-[16px] leading-[22px] tracking-[-0.003em] lg:tracking-[0.02em] text-[#666666] max-w-[340px] mb-6 sm:mb-7 md:mb-[18px] font-medium">
              Access course materials directly in your learning platform, collaborate on assignments with integrated study tools, and sync your progress across all devices. It's that simple.
            </p>
            
            <Link
              href="https://cal.com/rahul-sain-ymqpsl/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group/button
                relative
                flex
                items-center
                justify-start
                overflow-hidden
                rounded-full
                bg-[#527B72]
                px-[18px]
                sm:px-6
                md:px-[18px]
                py-[5px]
                sm:py-3
                md:py-[5px]
                font-medium
                text-white
                transition-all
                duration-140
                ease-out
                hover:bg-[#15352E]
                w-fit
                text-[16px]
                leading-[24px]
                sm:leading-[22px]
                md:leading-[24px]
              "
              style={{
                fontFamily: 'SF Pro Display, sans-serif',
                letterSpacing: '0.6px',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              <span className="whitespace-nowrap">Book a demo</span>
              
              {/* The Icon Wrapper */}
              <div 
                className="
                  flex
                  max-w-0
                  overflow-hidden
                  opacity-0
                  transition-all
                  duration-140
                  ease-out
                  group-hover/button:ml-1
                  group-hover/button:max-w-[20px]
                  sm:group-hover/button:max-w-[24px]
                  group-hover/button:opacity-100
                "
              >
                <Image src="/arrow.svg" alt="Arrow Right" className="size-[20px] shrink-0" width={13} height={13} />
              </div>
            </Link>
          </div>

          {/* Right Visuals */}
          <div className="lg:w-[55%]  relative min-h-[400px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] lg:max-h-[514px] hidden lg:block">

            {/* Organic Chemistry Request Card */}
            <div className="absolute top-[2%] sm:top-[12%] md:top-[54px] left-[6%] md:left-[15%] z-20 bg-white p-2 sm:p-2.5 md:p-3 rounded-[11px] max-w-[200px] sm:max-w-[220px] md:max-w-[240px] transition-transform duration-300 ease-in-out group-hover:-translate-x-2" style={{ boxShadow: '0px 0px 15px 0px #00000008, 0px 2px 30px 0px #00000014' }}>
               <div className="flex items-center gap-2 sm:gap-3 md:gap-[14px] mb-3 sm:mb-4">
                 <div className="flex items-center justify-center size-[36px] sm:size-[40px] md:size-[46px] bg-[#DCCFDA] rounded-[5px]">
                   <FileText className="size-[18px] sm:size-[20px] md:size-[23px] text-[#674162]" strokeWidth={2.5} />
                 </div>
                 <div>
                   <h3 className="text-[14px] sm:text-[15px] md:text-[17px] font-medium text-[#000000B2] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0002em]">Organic Chemistry</h3>
                   <p className="text-[#BCBCBC] font-medium text-[13px] sm:text-[14px] md:text-[15px] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0002em]">3hr</p>
                 </div>
               </div>
               <div className="mb-3 sm:mb-4">
                 <p className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#000000B2] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0002em]">Collean requested:</p>
               </div>
               <div 
                 className="grid overflow-hidden transition-all duration-300 ease-in-out"
                 style={{
                   gridTemplateColumns: status === 'approved' 
                     ? '1fr 0fr' 
                     : status === 'declined' 
                     ? '0fr 1fr' 
                     : '1fr 1fr',
                   gap: status === 'none' ? '12px' : '0px'
                 }}
               >
                 <button 
                   onClick={handleApprove}
                   className={`py-1.5 sm:py-2 rounded-[11px] cursor-pointer text-[12px] sm:text-[13px] md:text-[14px] font-medium leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0002em] text-center transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                     status === 'approved'
                       ? 'bg-[#F5F5F5] text-[#229273]'
                       : status === 'declined'
                       ? 'opacity-0 pointer-events-none'
                       : 'bg-[#DCCFDA] text-[#674162] hover:bg-[#BDADBA] hover:text-[#674162]'
                   }`}
                 >
                   {status === 'approved' ? 'Approved' : 'Approve'}
                 </button>
                 <button 
                   onClick={handleDecline}
                   className={`py-1.5 sm:py-2 rounded-[11px] cursor-pointer text-[12px] sm:text-[13px] md:text-[14px] font-medium leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0002em] text-center transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                     status === 'declined'
                       ? 'bg-[#F5F5F5] text-[#C54C41]'
                       : status === 'approved'
                       ? 'opacity-0 pointer-events-none'
                       : 'bg-[#F5F5F5] text-[#57534D] hover:bg-[#EBEBEB]'
                   }`}
                 >
                   {status === 'declined' ? 'Declined' : 'Decline'}
                 </button>
               </div>
            </div>

            {/* Course Cards (Trigonometry/Probability) */}
            <div className="absolute top-[15%] sm:top-[28%] md:top-[126px] right-[-2%] sm:right-[-1%] md:right-[-1%] z-10 flex flex-col gap-4 sm:gap-6 md:gap-[28px] ">
              <div className="flex items-center w-[160px] sm:w-[180px] md:w-[202px] gap-2 sm:gap-3 md:gap-[14px] h-[48px] sm:h-[52px] md:h-[56px] p-1 sm:p-1.5 bg-white rounded-[11px] ml-8 sm:ml-12 md:ml-[54px]
              transition-transform duration-300 ease-in-out group-hover:-translate-x-[107px]
              " style={{ boxShadow: '0px 0px 15px 0px #00000008, 0px 2px 30px 0px #00000014' }}>
                <div className="flex items-center justify-center size-[36px] sm:size-[40px] md:size-[46px] bg-[#D2CECB] rounded-[5px]">
                  <FileText className="size-[18px] sm:size-[20px] md:size-[23px] text-[#6E6A68]" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[13px] sm:text-[14px] md:text-[15.34px] font-medium text-[#000000B2] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0002em]">Trigonometry</h3>
                  <p className="text-[#BCBCBC] font-medium text-[12px] sm:text-[13px] md:text-[14px] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0002em]">5hr 30mins</p>
                </div>
              </div>
              <div className="flex items-center w-[160px] sm:w-[180px] md:w-[202px] gap-2 sm:gap-3 md:gap-[14px] h-[48px] sm:h-[52px] md:h-[56px] p-1 sm:p-1.5 bg-white rounded-[11px] ml-0
              transition-transform duration-300 ease-in-out group-hover:-translate-x-[25px] group-hover:-translate-y-[20px]
              " style={{ boxShadow: '0px 0px 15px 0px #00000008, 0px 2px 30px 0px #00000014' }}>
                <div className="flex items-center justify-center size-[36px] sm:size-[40px] md:size-[46px] bg-[#AABCA3] rounded-[5px]">
                   <FileText className="size-[18px] sm:size-[20px] md:size-[23px] text-[#173330]" strokeWidth={2.5} />
                </div>
                <div>
                   <h3 className="text-[13px] sm:text-[14px] md:text-[15.34px] font-medium text-[#000000B2] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0002em]">Probability</h3>
                   <p className="text-[#BCBCBC] font-medium text-[12px] sm:text-[13px] md:text-[14px] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0002em]">2hr 45mins</p>
                </div>
              </div>
            </div>

            {/* AI Prompt Box */}
            <div className="absolute top-[45%] sm:top-[52%] md:top-[274px] left-[5%] sm:left-[6%] md:left-[2%] z-30 bg-white p-2 sm:p-2.5 rounded-[12px] border border-gray-100 max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] w-[90%] sm:w-auto transition-transform duration-300 ease-in-out group-hover:-translate-x-4 group-hover:-translate-y-[10px]" style={{ boxShadow: '0px 0px 15px 0px #00000008, 0px 2px 30px 0px #00000014' }}>
              <div className="w-full text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[18px] sm:leading-[20px] md:leading-[21px] lg:leading-[22px] text-[#000000B2] bg-transparent min-h-[28px] sm:min-h-[30px] md:min-h-[32px] transition-colors cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis mb-2 sm:mb-3 px-1">
                create an advanced course on artificial intelligence
              </div>
              <div className="flex items-center justify-between">
                {/* Left: Modes Group */}
                <div className="flex items-center bg-[#F1F1F0] p-0.5 max-h-[30px] rounded-[7px] gap-1 ">
                  {/* Plus Button */}
                  <button className="flex items-center justify-center w-7 h-7 bg-white rounded-[5px]  transition-colors" style={{ boxShadow: '0px 1px 2px 0px #0A0D1408' }}>
                    <Plus className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
                  </button>
                  
                  {/* Modes Button */}
                  <button className="flex items-center gap-1 sm:gap-1.5 px-1 rounded-[5px] hover:bg-[#FFFFFF] sm:px-1.5 pr-1.5 sm:pr-2 py-0.5 text-gray-600 hover:text-gray-800 transition-colors">
                    <img src="filter.svg" alt="filter" className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-normal tracking-[-0.0002em] text-[13px] sm:text-[14px] md:text-[16px] leading-[18px] sm:leading-[20px] md:leading-[22px] text-[#656565]">Modes</span>
                  </button>
                </div>

                {/* Right: Submit Button */}
                <button className="flex items-center justify-center w-8 h-8 bg-[#9CA3AF] hover:bg-[#254F46] rounded-lg  transition-colors">
                  <ArrowUp className="w-4 h-4 text-white" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="absolute bottom-[35%] sm:bottom-[36%] md:top-[287px] right-[3%] sm:right-[4%] md:right-[5%] min-w-[280px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[420px] h-[12px] sm:h-[14px] md:h-[16px] bg-[#C5C5C533] rounded-t-[14px] z-20"></div>

            {/* Chat Bubble */}
            <div className="absolute bottom-[2%] sm:bottom-[2.5%] md:top-[301px] right-[2%] sm:right-[2.5%] md:right-[3%] z-20">
              <div className="bg-white rounded-[19px] min-w-[280px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[442px] p-3 sm:p-[12px] md:p-[14px] relative z-10" style={{ boxShadow: '0px 0px 15px 0px #00000008, 0px 2px 30px 0px #00000014' }}>
                
                
                <div className="flex items-center text-[#000000] mb-4 sm:mb-6 md:mb-8 space-x-2">
                  <button className="text-[#C5C5C5] hover:text-[#000000B2] transition-colors">
                    <CaretLeft className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px] md:w-[20px] md:h-[20px]" weight="bold" />
                  </button>
                  <span className="font-medium leading-[20px] sm:leading-[21px] md:leading-[22px] tracking-[0.0004em] text-[16px] sm:text-[17px] md:text-[18px]">Support</span>
                </div>
                
                
                <div className="space-y-3 sm:space-y-4">
                  
                  
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <img src="/user.svg" alt="" className="w-6 h-6 sm:w-7 sm:h-7" />
                    <div className="bg-[#F4F2F0] text-[#000000B2] rounded-[12px] rounded-bl-[5px] px-3 sm:px-[12px] md:px-[14px] py-2 sm:py-[8px] md:py-[10px] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-[20px] sm:leading-[21px] md:leading-[22px] tracking-[0.0004em] ">
                      Good day Ben, how can I help?
                    </div>
                  </div>
                  
                  
                  <div className="flex justify-center pl-16 sm:pl-20 md:pl-24 -mt-2">
                     <span className="text-[12px] sm:text-[12.5px] md:text-[13.34px] text-[#C5C5C5] leading-[18px] sm:leading-[19px] md:leading-[20px] -tracking-[0.0003em] font-medium">5:03 PM</span>
                  </div>
                  
                  
                   <div className="flex justify-end">
                    <div className="bg-[#F7F7F7] rounded-[12px] rounded-br-[5px] p-3 sm:p-[12px] md:p-[14px] w-fit">
                      <div className="flex space-x-1 sm:space-x-1.5 items-center h-2">
                        {[0, 1, 2].map((dot) => (
                          <motion.div
                            key={dot}
                            className="size-[9px] sm:size-[10px] md:size-[11px] bg-[#C5C5C5] rounded-full"
                            animate={{
                              y: ["0%", "-50%", "0%"],
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: dot * 0.2
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Background Shape (Subtle) */}
            <div className="absolute top-[20%]  right-[20%] w-[300px] h-[300px] bg-[linear-to-br from-[#E4DEFF] to-[#F9F9F9]] rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>

            {/* Bottom-right corner shape */}
            <div className="absolute top-[96px] -right-[5px] z-0 hidden md:block">
              <div 
                className="bg-[#FAFAFA] "
                style={{
                  width: '505px',
                  height: '450px',
                  borderTopLeftRadius: '39px',
                  borderTopRightRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  borderBottomRightRadius: '0px',
                  border: '5px solid #EBEBEB',
                  boxShadow: '0px 0px 0px 1px #00000026'
                }}
              />
            </div>

          </div>

          {/* Mobile SVG Image */}
          <div className="lg:hidden absolute -bottom-2 -right-6 z-10">
            <img 
              src="/cta.svg" 
              alt="CTA illustration" 
              className="w-full h-auto max-w-[452px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffortlessExperience;

