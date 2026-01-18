'use client';

import { X, Sun, Spinner, Check } from '@phosphor-icons/react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export const StudentReportCard = () => {
  const [statusText, setStatusText] = useState('Getting MST report');
  const [isCompleted, setIsCompleted] = useState(false);
  const [fadeOpacity, setFadeOpacity] = useState(1);
  const [spinnerKey, setSpinnerKey] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const runCycle = () => {
      // Reset to initial state
      setStatusText('Getting MST report');
      setIsCompleted(false);
      setFadeOpacity(1);
      setSpinnerKey(0);
      
      // Clear any existing timers
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];

      // Animation constants matching @app/globals.css
      // CSS: 100ms delay + 1000ms duration per spin, 3 iterations
      // Component restarts spinner at each transition point
      const SPIN_DELAY = 100;
      const SPIN_DURATION = 1000;
      const FADE_DURATION = 300;
      const SINGLE_SPIN_TIME = SPIN_DELAY + SPIN_DURATION; // 1100ms per individual spin
      const TOTAL_DURATION = SPIN_DELAY + (SPIN_DURATION * 3); // 3100ms total

      // Phase 1: First spin (0ms - 1100ms)
      // Text: "Getting MST report" (already set, opacity: 1)

      // Phase 2: Transition to second text (at 1100ms)
      // Start fade out before second spin begins
      const t2FadeOut = setTimeout(() => {
        setFadeOpacity(0);
      }, SINGLE_SPIN_TIME - FADE_DURATION);
      timersRef.current.push(t2FadeOut);

      // At start of second spin: restart spinner, set new text, fade in
      const t2Transition = setTimeout(() => {
        setSpinnerKey(1);
        setStatusText('Analyzing semester performance');
        // Use requestAnimationFrame to ensure text is rendered before fade in
        requestAnimationFrame(() => {
          setFadeOpacity(1);
        });
      }, SINGLE_SPIN_TIME);
      timersRef.current.push(t2Transition);

      // Phase 3: Transition to third text (at 2200ms)
      // Start fade out before third spin begins
      const t3FadeOut = setTimeout(() => {
        setFadeOpacity(0);
      }, (SINGLE_SPIN_TIME * 2) - FADE_DURATION);
      timersRef.current.push(t3FadeOut);

      // At start of third spin: restart spinner, set new text, fade in
      const t3Transition = setTimeout(() => {
        setSpinnerKey(2);
        setStatusText('Merging semester results');
        requestAnimationFrame(() => {
          setFadeOpacity(1);
        });
      }, SINGLE_SPIN_TIME * 2);
      timersRef.current.push(t3Transition);

      // Phase 4: Completion state (at 3100ms - end of all spins)
      
      // Start fade out before completion
      const tCompleteFadeOut = setTimeout(() => {
        setFadeOpacity(0);
      }, TOTAL_DURATION - FADE_DURATION);
      timersRef.current.push(tCompleteFadeOut);

      // At completion time: show check icon and text together
      const tCompleteShow = setTimeout(() => {
        setStatusText('Report completed');
        setIsCompleted(true);
        setFadeOpacity(1);
      }, TOTAL_DURATION);
      timersRef.current.push(tCompleteShow);

      // Phase 5: Restart cycle after pause
      const RESTART_PAUSE = 3000;
      const restartTime = TOTAL_DURATION + RESTART_PAUSE;

      // Fade out and hide checkmark before restart
      const tRestartFadeOut = setTimeout(() => {
        setFadeOpacity(0);
        setIsCompleted(false);
        // Reset to initial text when hiding checkmark
        setStatusText('Getting MST report');
      }, restartTime - FADE_DURATION);
      timersRef.current.push(tRestartFadeOut);

      // Restart cycle
      const tRestart = setTimeout(() => {
        runCycle();
      }, restartTime);
      timersRef.current.push(tRestart);
    };

    runCycle();

    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
    };
  }, []); 

  return (
    
    <div className="flex items-center justify-center p-2 sm:p-3 md:p-4">
      
      {/* Main Card */}
      <div className="w-full max-w-[316px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[340px] bg-[#F8E8D2] rounded-[9px] sm:rounded-[10px] md:rounded-[11px] border border-[#D2CECBAD] overflow-hidden">
        
        <div className="p-4 sm:p-5 md:p-6 bg-white rounded-b-[9px] sm:rounded-b-[10px] md:rounded-b-[11px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
            <span className="text-[12px] sm:text-[13px] md:text-[14px] leading-[18px] sm:leading-[19px] md:leading-[20px] font-medium text-[#000000]">Personal Info</span>
            <button className="">
              <X size={16} weight="bold" className='sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px] text-[#606060]' />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-start justify-between mb-4 sm:mb-5 md:mb-6">
            <div className="">
              <h4 className="text-[12px] sm:text-[12.5px] md:text-[13px] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0003em] font-medium">Katie Ben</h4>
              <p className="text-[12px] sm:text-[12.5px] md:text-[13px] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0003em] font-medium">katieBen@gmail.com</p>
              <p className="text-[12px] sm:text-[12.5px] md:text-[13px] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0003em] font-medium">+1 555-372-9481</p>
            </div>
            
            {/* Avatar with shadow styling */}
            <div 
              className="p-0.5 sm:p-[3px] md:p-1 bg-white rounded-[12px] sm:rounded-[13px] md:rounded-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
              style={{ boxShadow: "0px 3px 2px 0px #00000008" }}
            >
              <div className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] md:w-[48px] md:h-[48px] rounded-[8px] sm:rounded-[9px] md:rounded-[10px] overflow-hidden">
                <Image 
                  width={48}
                  height={48}
                  src="/kaleen.svg" 
                  alt="Katie Ben" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-[#F1EFEB] mb-4 sm:mb-[18px] md:mb-5"></div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-[4px] sm:gap-y-[4.5px] md:gap-y-[5px]">
            <span className="text-[12px] sm:text-[12.5px] md:text-[13px] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0003em] font-medium">Degree</span>
            <span className="text-[12px] sm:text-[12.5px] md:text-[13px] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0003em] font-noraml">CSE</span>

            <span className="text-[12px] sm:text-[12.5px] md:text-[13px] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0003em] font-medium">Semester:</span>
            <span className="text-[12px] sm:text-[12.5px] md:text-[13px] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0003em] font-noraml">4th</span>

            <span className="text-[12px] sm:text-[12.5px] md:text-[13px] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0003em] font-medium">Valid till:</span>
            <span className="text-[12px] sm:text-[12.5px] md:text-[13px] leading-[18px] sm:leading-[19px] md:leading-[20px] tracking-[0.0003em] font-noraml">Aug, 2026</span>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-[#F8E8D2] p-3 sm:p-[14px] md:p-4 flex items-center justify-start space-x-2 sm:space-x-[10px] md:space-x-3">
          {isCompleted ? (
            <div className="size-[18px] sm:size-[19.5px] md:size-[21px] rounded-full bg-[#3B7F70] flex items-center justify-center shrink-0">
              <Check size={12} weight="bold" className="sm:w-[13px] sm:h-[13px] md:w-[14px] md:h-[14px] text-white" />
            </div>
          ) : (
            <img 
              key={spinnerKey}
              src="/spinner.svg" 
              alt="" 
              className="w-[18px] h-[18px] sm:w-[19.5px] sm:h-[19.5px] md:w-[21px] md:h-[21px] animate-spin-delayed shrink-0" 
            />
          )}
          <span 
            className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-[#4A4A4A] transition-opacity duration-300"
            style={{ opacity: fadeOpacity }}
          >
            {/* Only show "Report completed" when checkmark is visible */}
            {statusText === 'Report completed' ? (isCompleted ? statusText : '') : statusText}
          </span>
        </div>
      </div>
      
    </div>
  );
};
