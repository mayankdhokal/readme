'use client';

import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import InputAnimator from './InputAnimator';
import ModuleCard from './ModuleCard';

enum DemoStep {
  IDLE = 0,
  R1_INPUT = 1,
  R1_USER_BUBBLE = 2,
  R1_AI_BUBBLE = 3,
  R1_AI_TYPING_COMPLETE = 4,
  R2_INPUT = 5,
  R2_USER_BUBBLE = 6,
  R2_AI_BUBBLE = 7,
  R2_AI_TYPING_COMPLETE = 8,
  CARDS_START = 9,
  CARD_1_FRAME = 10,
  CARD_1_PULSE = 11,
  CARD_1_CONTENT = 12,
  CARD_1_COMPLETE = 13,
  CARD_2_FRAME = 14,
  CARD_2_PULSE = 15,
  CARD_2_CONTENT = 16,
  CARD_2_COMPLETE = 17,
  CARD_3_FRAME = 18,
  CARD_3_PULSE = 19,
  CARD_3_CONTENT = 20,
  CARD_3_COMPLETE = 21,
  LOOP_RESET = 22,
  FINISHED = 23
}

const DashboardChatContainer: React.FC = () => {
  const [step, setStep] = useState<DemoStep>(DemoStep.IDLE);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startTimeline();
        }
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startTimeline = () => {
    
    setTimeout(() => setStep(DemoStep.R1_INPUT), 500);
  };

  useEffect(() => {
    const next = (nextStep: DemoStep, delay: number) => {
      setTimeout(() => setStep(nextStep), delay);
    };

    switch (step) {
      case DemoStep.R1_INPUT:
        next(DemoStep.R1_USER_BUBBLE, 2500);
        break;
      case DemoStep.R1_USER_BUBBLE:
        next(DemoStep.R1_AI_BUBBLE, 1200);
        break;
      case DemoStep.R1_AI_BUBBLE:
        
        break;
      case DemoStep.R1_AI_TYPING_COMPLETE:
        next(DemoStep.R2_INPUT, 1200);
        break;
      case DemoStep.R2_INPUT:
        next(DemoStep.R2_USER_BUBBLE, 1200);
        break;
      case DemoStep.R2_USER_BUBBLE:
        next(DemoStep.R2_AI_BUBBLE, 1200);
        break;
      case DemoStep.R2_AI_BUBBLE:
        
        break;
      case DemoStep.R2_AI_TYPING_COMPLETE:
        next(DemoStep.CARDS_START, 1200);
        break;
      case DemoStep.CARDS_START:
        setStep(DemoStep.CARD_1_FRAME);
        break;
      case DemoStep.CARD_1_FRAME:
        next(DemoStep.CARD_1_PULSE, 400);
        break;
      case DemoStep.CARD_1_PULSE:
        next(DemoStep.CARD_1_CONTENT, 1000);
        break;
      case DemoStep.CARD_1_CONTENT:
        
        break;
      case DemoStep.CARD_1_COMPLETE:
        next(DemoStep.CARD_2_FRAME, 300);
        break;
      case DemoStep.CARD_2_FRAME:
        next(DemoStep.CARD_2_PULSE, 400);
        break;
      case DemoStep.CARD_2_PULSE:
        next(DemoStep.CARD_2_CONTENT, 1000);
        break;
      case DemoStep.CARD_2_CONTENT:
        
        break;
      case DemoStep.CARD_2_COMPLETE:
        next(DemoStep.CARD_3_FRAME, 300);
        break;
      case DemoStep.CARD_3_FRAME:
        next(DemoStep.CARD_3_PULSE, 400);
        break;
      case DemoStep.CARD_3_PULSE:
        next(DemoStep.CARD_3_CONTENT, 1000);
        break;
      case DemoStep.CARD_3_CONTENT:
        
        break;
      case DemoStep.CARD_3_COMPLETE:
        
        next(DemoStep.LOOP_RESET, 2000);
        break;
      case DemoStep.LOOP_RESET:
        
        setStep(DemoStep.IDLE);
        
        setTimeout(() => {
          setStep(DemoStep.R1_INPUT);
        }, 500);
        break;
      default:
        break;
    }
  }, [step]);

  
  useEffect(() => {
    if (scrollAreaRef.current && (step >= DemoStep.R1_USER_BUBBLE && step < DemoStep.LOOP_RESET)) {
      const scrollToBottom = () => {
        if (scrollAreaRef.current) {
          // Use smooth scroll when cards are appearing
          if (step >= DemoStep.CARDS_START) {
            scrollAreaRef.current.scrollTo({
              top: scrollAreaRef.current.scrollHeight,
              behavior: 'smooth'
            });
          } else {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
          }
        }
      };
      
      // Small delay to ensure DOM has updated, especially for typing animation
      // Longer delay when cards are appearing to let them render first
      const delay = step >= DemoStep.CARDS_START ? 300 : (step >= DemoStep.R2_AI_BUBBLE ? 150 : 100);
      setTimeout(scrollToBottom, delay);
    }
    
    if (step === DemoStep.LOOP_RESET || step === DemoStep.IDLE) {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
    }
  }, [step]);

  // Additional scroll updates during typing animation for third message
  useEffect(() => {
    if (step === DemoStep.R2_AI_BUBBLE && scrollAreaRef.current) {
      const interval = setInterval(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
      }, 200); // Update scroll every 200ms during typing

      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const preventWheel = (e: WheelEvent) => {
      
      if (step >= DemoStep.CARDS_START) {
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = scrollArea;
      const isAtTop = scrollTop <= 1;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      
      
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        
        return;
      }
      
      
      e.preventDefault();
      e.stopPropagation();
    };

    const preventTouchMove = (e: TouchEvent) => {
      
      if (step >= DemoStep.CARDS_START) {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollArea;
      const isAtTop = scrollTop <= 1;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      
      
      if (isAtTop || isAtBottom) {
        return;
      }
      
      e.preventDefault();
      e.stopPropagation();
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      
      if (step >= DemoStep.CARDS_START) {
        return;
      }

      
      if (scrollArea.contains(document.activeElement)) {
        const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
        if (scrollKeys.includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    scrollArea.addEventListener('wheel', preventWheel, { passive: false });
    scrollArea.addEventListener('touchmove', preventTouchMove, { passive: false });
    scrollArea.addEventListener('keydown', preventKeyScroll, { passive: false });

    return () => {
      scrollArea.removeEventListener('wheel', preventWheel);
      scrollArea.removeEventListener('touchmove', preventTouchMove);
      scrollArea.removeEventListener('keydown', preventKeyScroll);
    };
  }, [step]);

  return (
    <div ref={containerRef} className="flex flex-col h-full relative w-full">
      {/* Scrollable Content Area */}
      <div 
        ref={scrollAreaRef} 
        className={`flex-1 overflow-y-auto pt-4 overflow-x-hidden max-w-[585px] mx-auto w-full flex flex-col gap-8 px-[19px] lg:px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
          step >= DemoStep.R2_AI_BUBBLE && step < DemoStep.LOOP_RESET 
            ? 'pb-[120px] sm:pb-[100px]' 
            : 'pb-[84px]'
        }`}
      >
        {/* Chat Messages Area */}
        <div className="flex flex-col gap-[18px]">
          {step >= DemoStep.R1_USER_BUBBLE && step < DemoStep.LOOP_RESET && (
            <ChatMessage 
              role="user" 
              content="Create a course on quantum physics" 
              isVisible={true}
            />
          )}
          
          {step >= DemoStep.R1_AI_BUBBLE && step < DemoStep.LOOP_RESET && (
            <ChatMessage 
              role="ai" 
              content={`Great choice! Quantum physics is a fascinating topic. Before I start building your course, I'll need a few quick details to tailor it perfectly.
            
First, how many questions would you like the quiz to include?`} 
              isVisible={true}
              shouldAnimate={step === DemoStep.R1_AI_BUBBLE}
              onTypingComplete={() => {
                if (step === DemoStep.R1_AI_BUBBLE) {
                  setStep(DemoStep.R1_AI_TYPING_COMPLETE);
                }
              }}
            />
          )}

          {step >= DemoStep.R2_USER_BUBBLE && step < DemoStep.LOOP_RESET && (
            <ChatMessage 
              role="user" 
              content="Add 10 questions" 
              isVisible={true}
            />
          )}

          {step >= DemoStep.R2_AI_BUBBLE && step < DemoStep.LOOP_RESET && (
            <ChatMessage 
              role="ai" 
              content={`Got it! Based on what you've shared, I'll create:
• A course on Quantum Physics
• 2 modules covering the fundamentals to advanced concepts
• A 10-question quiz for assessment
• Text + example-based lessons

Let's get started building your course!`} 
              isVisible={true}
              shouldAnimate={step === DemoStep.R2_AI_BUBBLE}
              onTypingComplete={() => {
                if (step === DemoStep.R2_AI_BUBBLE) {
                  setStep(DemoStep.R2_AI_TYPING_COMPLETE);
                }
              }}
            />
          )}
        </div>

        {/* Cards Phase Area */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[12px]   -mx-6 px-6">
          {step >= DemoStep.CARD_1_FRAME && step < DemoStep.LOOP_RESET && (
            <ModuleCard 
              isVisible={true} 
             
              showContent={step >= DemoStep.CARD_1_CONTENT} 
              title="Module"
              onAnimationComplete={() => {
                if (step === DemoStep.CARD_1_CONTENT) {
                  setStep(DemoStep.CARD_1_COMPLETE);
                }
              }}
            />
          )}
          {step >= DemoStep.CARD_2_FRAME && step < DemoStep.LOOP_RESET && (
            <ModuleCard 
              isVisible={true} 
              showContent={step >= DemoStep.CARD_2_CONTENT} 
              title="Module"
              onAnimationComplete={() => {
                if (step === DemoStep.CARD_2_CONTENT) {
                  setStep(DemoStep.CARD_2_COMPLETE);
                }
              }}
            />
          )}
          {step >= DemoStep.CARD_3_FRAME && step < DemoStep.LOOP_RESET && (
            <div className="hidden md:block">
              <ModuleCard 
                isVisible={true} 
               
                showContent={step >= DemoStep.CARD_3_CONTENT} 
                title="Assignment"
                onAnimationComplete={() => {
                  if (step === DemoStep.CARD_3_CONTENT) {
                    setStep(DemoStep.CARD_3_COMPLETE);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Fixed Animated Input */}
      <div className="absolute   bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[90%] sm:max-w-[535px]  z-10 pointer-events-none">
        <InputAnimator 
          step={step} 
          r1InputText="Create a course on quantum physics"
          r2InputText="Add 10 questions"
        />
      </div>
    </div>
  );
};

export default DashboardChatContainer;
