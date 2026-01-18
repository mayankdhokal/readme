import React, { useState, useEffect, useRef } from 'react';
import SkeletonBlock from './SkeletonBlock';

interface ModuleCardProps {
  isVisible: boolean;
  showPulse?: boolean;
  showContent: boolean;
  title?: string;
  onAnimationComplete?: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ isVisible, showPulse = false, showContent, title = "Module", onAnimationComplete }) => {
  const [visibleSkeletons, setVisibleSkeletons] = useState<number>(0);
  const [shouldFadeIn, setShouldFadeIn] = useState<boolean>(false);
  const totalSkeletons = 11; // Total number of skeleton blocks
  const hasCompletedRef = useRef(false);
  const onAnimationCompleteRef = useRef(onAnimationComplete);
  const previousShowContentRef = useRef(showContent);
  const previousIsVisibleRef = useRef(isVisible);

  // Update ref when callback changes (but don't trigger re-render)
  useEffect(() => {
    onAnimationCompleteRef.current = onAnimationComplete;
  }, [onAnimationComplete]);

  // Delay fade-in animation to allow scroll to settle
  useEffect(() => {
    const wasFalseNowTrue = !previousIsVisibleRef.current && isVisible;
    previousIsVisibleRef.current = isVisible;

    if (!isVisible) {
      setShouldFadeIn(false);
      return;
    }

    // Only start fade-in animation if isVisible just changed from false to true
    if (wasFalseNowTrue) {
      // Small delay to let scroll settle before fading in
      const fadeInTimer = setTimeout(() => {
        setShouldFadeIn(true);
      }, 200); // 200ms delay to let scroll settle

      return () => clearTimeout(fadeInTimer);
    } else if (isVisible) {
      // If already visible, allow fade-in immediately
      setShouldFadeIn(true);
    }
  }, [isVisible]);

  useEffect(() => {
    const wasFalseNowTrue = !previousShowContentRef.current && showContent;
    previousShowContentRef.current = showContent;

    if (!showContent) {
      setVisibleSkeletons(0);
      hasCompletedRef.current = false;
      return;
    }

    // Only start animation if showContent just changed from false to true
    // If it was already true and animation completed, keep skeletons visible
    if (!wasFalseNowTrue && hasCompletedRef.current) {
      // Already completed, keep all skeletons visible
      setVisibleSkeletons(totalSkeletons);
      return;
    }

    // Reset and start animation when showContent becomes true
    setVisibleSkeletons(0);
    hasCompletedRef.current = false;
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex <= totalSkeletons) {
        setVisibleSkeletons(currentIndex);
      } else {
        clearInterval(interval);
        // Call callback when all skeletons are shown
        if (!hasCompletedRef.current && onAnimationCompleteRef.current) {
          hasCompletedRef.current = true;
          onAnimationCompleteRef.current();
        }
      }
    }, 80); // 80ms interval between each skeleton for smoother animation

    return () => clearInterval(interval);
  }, [showContent, totalSkeletons]);

  const getSkeletonColor = (index: number, finalColor: string = "#EAE9E9") => {
    // If skeleton hasn't been animated yet, use initial color
    if (visibleSkeletons <= index) {
      return "#ffffff";
    }
    // Otherwise, use the final color
    return finalColor;
  };

  const getSkeletonOpacity = (index: number) => {
    // If skeleton hasn't been animated yet, use lower opacity
    if (visibleSkeletons <= index) {
      return 0.3;
    }
    // Otherwise, use full opacity
    return 1;
  };

  return (
    <div 
      className={`bg-white rounded-[12px] sm:rounded-[16px] w-full max-w-[128px] md:max-w-[180px] lg:max-w-[222px] mx-auto sm:mx-0 p-[10px] sm:p-[14px] flex flex-col justify-between gap-[24px] sm:gap-[40px] md:gap-[62px]  border border-[#EFE9E1] transition-all duration-300
        ${shouldFadeIn ? 'fade-lift-active' : 'fade-lift-enter'}
        ${showPulse ? 'animate-pulse' : ''}`}
      style={{
        boxShadow: '0px 0px 15px 0px #00000008, 0px 2px 30px 0px #00000014'
      }}
    >
      <div className="flex flex-col gap-[24px] sm:gap-[40px] md:gap-[62px]">
        {/* Skeleton UI matching the design */}
        <div className="flex flex-col gap-[4px] sm:gap-[6px]">
          {/* Row 1: Single long bar (2/3 width) */}
          <SkeletonBlock 
            width="w-[81px] sm:w-[90px] md:w-[104px]" 
            height="h-[6px]" 
            bgcolor={getSkeletonColor(0)}
            opacity={getSkeletonOpacity(0)}
          />
          
          {/* Row 2: Medium bar + short bar */}
          <div className="flex gap-1.5 sm:gap-2 items-center">
            <SkeletonBlock 
              width="w-[67px] sm:w-[60px] md:w-[74px]" 
              height="h-[6px]" 
              bgcolor={getSkeletonColor(1)}
              opacity={getSkeletonOpacity(1)}
            />
            <SkeletonBlock 
              width="w-[30px] sm:w-[35px] md:w-[43px]" 
              bgcolor={getSkeletonColor(2, "#DADADA")} 
              height="h-[6px]"
              opacity={getSkeletonOpacity(2)}
            />
          </div>
          
          {/* Row 3: Medium bar + short bar */}
          <div className="flex gap-1.5 sm:gap-2 items-center">
            <SkeletonBlock 
              width="w-[75px] sm:w-[72px] md:w-[86px]" 
              height="h-[6px]" 
              bgcolor={getSkeletonColor(3)}
              opacity={getSkeletonOpacity(3)}
            />
            <SkeletonBlock 
              width="w-[27px]" 
              bgcolor={getSkeletonColor(4, "#DADADA")} 
              height="h-[6px]"
              opacity={getSkeletonOpacity(4)}
            />
          </div>
          
          {/* Row 4: Single long bar */}
          <SkeletonBlock 
            width="w-[95px] md:w-[109px]" 
            height="h-[6px]" 
            bgcolor={getSkeletonColor(5)}
            opacity={getSkeletonOpacity(5)}
          />
          
          {/* Row 5: Single medium bar (half width) */}
          <SkeletonBlock 
            width="w-[67px] md:w-[74px]" 
            height="h-[6px]" 
            bgcolor={getSkeletonColor(6)}
            opacity={getSkeletonOpacity(6)}
          />
          
          {/* Row 6: Single long bar */}
          <SkeletonBlock 
            width="w-[89px] md:w-[100px]" 
            height="h-[6px]" 
            bgcolor={getSkeletonColor(7)}
            opacity={getSkeletonOpacity(7)}
          />
          
          {/* Row 7: Short bar + very long bar */}
          <div className="flex gap-1.5 sm:gap-2 items-center">
            <SkeletonBlock 
              width="w-[20px]" 
              bgcolor={getSkeletonColor(8, "#DADADA")} 
              height="h-[6px]"
              opacity={getSkeletonOpacity(8)}
            />
            <SkeletonBlock 
              width="w-[78px] md:w-[97px]" 
              height="h-[6px]" 
              bgcolor={getSkeletonColor(9)}
              opacity={getSkeletonOpacity(9)}
            />
          </div>
          
          {/* Row 8: Single long bar */}
          <SkeletonBlock 
            width="w-[56px] sm:w-[70px] md:w-[84px]" 
            height="h-[6px]" 
            bgcolor={getSkeletonColor(10)}
            opacity={getSkeletonOpacity(10)}
          />
        </div>
      </div>

      <div className="transition-all duration-300 opacity-100">
         <h3 className="text-[#BCBBBB] text-[24px]  md:text-[27px] leading-[28px] md:leading-[28px] pr-[13px] tracking-[-0.02em] font-semibold" style={{ fontFamily: "'SF Pro Rounded', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}>{title}</h3>
      </div>
    </div>
  );
};

export default ModuleCard;
