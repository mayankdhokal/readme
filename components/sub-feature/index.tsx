'use client';
import  { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    id: 1,
    label: 'Today',
    title: 'Get started.',
    items: [
      'Create your account',
      'Import your data students & staff',
      'Configure your organization',
    ],
  },
  {
    id: 2,
    label: 'Day 2-4',
    title: 'Get use to it.',
    items: [
      '1-day Admin training',
      '1-day Educator training',
      'Video tutorials sent to all users',
    ],
  },
  {
    id: 3,
    label: 'Day 5-11',
    title: 'Get comfortable.',
    items: [
      'Create new content with Lume',
      'Will migrate your existing content',
      'Setup your classes & sections',
    ],
  },
  {
    id: 4,
    label: 'Day 12',
    title: 'Enjoy your time.',
    items: [
      'Your organization system is live',
      'Content and grading more efficient',
      'Get reports 70% faster',
    ],
  },
];

const SubFeatures = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [cardCenters, setCardCenters] = useState<number[]>([]);
  const [lineStart, setLineStart] = useState<number>(0);
  const [lineEnd, setLineEnd] = useState<number>(0);

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    // Check if element is already in view
    const checkInitialView = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const isVisible = rect.top < windowHeight && rect.bottom > 0 && rect.width > 0 && rect.height > 0;
      if (isVisible) {
        setIsInView(true);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      checkInitialView();
      
      // Also check after a short delay
      setTimeout(checkInitialView, 100);
    });

    // Set up Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0, // Trigger as soon as any part is visible
        rootMargin: '0px',
      }
    );

    observerRef.current = observer;
    observer.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  // Auto-cycle animation - only when section is in view
  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev === steps.length ? 1 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [isPaused, isInView]);

  // Calculate card center positions
  const calculatePositions = useCallback(() => {
    if (!cardsContainerRef.current || cardRefs.current.length === 0) return;

    const containerRect = cardsContainerRef.current.getBoundingClientRect();
    const centers: number[] = [];
    
    cardRefs.current.forEach((cardRef) => {
      if (cardRef) {
        const cardRect = cardRef.getBoundingClientRect();
        const cardCenterY = cardRect.top + cardRect.height / 2 - containerRect.top;
        centers.push(cardCenterY);
      }
    });

    if (centers.length > 0) {
      setCardCenters(centers);
      setLineStart(centers[0]);
      setLineEnd(centers[centers.length - 1]);
    }
  }, []);

  // Calculate positions on mount and when cards change
  useEffect(() => {
    calculatePositions();
    // Small delay to ensure DOM is fully rendered
    const timeout = setTimeout(calculatePositions, 100);
    return () => clearTimeout(timeout);
  }, [currentStep, calculatePositions]);

  // Handle window resize and use ResizeObserver for better performance
  useEffect(() => {
    const handleResize = () => {
      calculatePositions();
    };

    window.addEventListener('resize', handleResize);
    
    // Use ResizeObserver to watch for container size changes
    let resizeObserver: ResizeObserver | null = null;
    if (cardsContainerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        calculatePositions();
      });
      resizeObserver.observe(cardsContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver && cardsContainerRef.current) {
        resizeObserver.unobserve(cardsContainerRef.current);
      }
    };
  }, [calculatePositions]);

  // Calculate progress width for vertical line (mobile)
  const progressHeight = cardCenters.length > 0 && lineEnd > lineStart
    ? ((currentStep - 1) / (steps.length - 1)) * (lineEnd - lineStart)
    : 0;

  // Calculate progress width for horizontal line (desktop/tablet)
  const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div 
      ref={sectionRef}
      className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[64px] py-8 sm:py-12 md:py-[164px] lg:pb-[184px]  font-sans"
    >
      <div className="text-center mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-5 md:space-y-6">
        <p className="text-[#6D6C6B] text-[14px] sm:text-[15px] md:text-[16px] leading-[20px] sm:leading-[21px] md:leading-[22px] tracking-[0.028em] sm:tracking-[0.02em] font-medium">
          New software shouldn't take months to implement.
        </p>
        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-medium text-black leading-[32px] sm:leading-[38px] md:leading-[42px] lg:leading-[47px] tracking-[0.023em]">
          Here's what you can get done with <br className="hidden sm:block" />
          Edulume in just 2weeks.
        </h2>
        <Link href="/contact">
          <button className="group inline-flex cursor-pointer items-center gap-2 text-[16px] leading-[22px] tracking-[0.002em] font-medium text-[#696765]">
            Join us now
            <span className="">
              <ArrowRight  className="w-4 h-4 text-[#696765]" />
            </span>
          </button>
        </Link>
      </div>

      <div 
        className="relative mb-6 sm:mb-8 md:mb-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Mobile Layout: Day labels above cards, Timeline on left */}
        <div className="relative sm:hidden">
          {/* Timeline - Left Side (Mobile only) - Absolute positioned */}
          <div 
            className="absolute left-0 top-0 bottom-0 flex flex-col items-center"
            style={{ width: '12px' }}
          >
            {/* Vertical progress line background - from first to last card center */}
            {lineStart > 0 && lineEnd > lineStart && (
              <>
                <div 
                  className="absolute w-px bg-[#D2CECB] opacity-0 z-0"
                  style={{ 
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: `${lineStart}px`,
                    height: `${lineEnd - lineStart}px`
                  }}
                ></div>
                {/* Vertical progress line filled */}
                <div 
                  className="absolute w-px bg-[#D2CECB] transition-all ease-in-out z-0"
                  style={{ 
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: `${lineStart}px`,
                    height: `${progressHeight}px`,
                    transitionDuration: '400ms'
                  }}
                ></div>
              </>
            )}

            {steps.map((step, index) => {
              const isActive = index + 1 === currentStep;
              const isCompleted = index + 1 < currentStep;
              const centerY = cardCenters[index] || 0;
              
              return (
                <button
                  title={step.title}
                  key={step.id}
                  onClick={() => setCurrentStep(index + 1)}
                  className={`
                    absolute z-10 w-3 h-3 rounded-full border bg-white transition-colors duration-300
                    ${(isActive || isCompleted) ? 'border-[#D2CECB]' : 'border-[#D2CECB]'}
                  `}
                  style={{ 
                    left: '50%',
                    top: `${centerY}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                ></button>
              );
            })}
          </div>

          {/* Steps with day labels and cards */}
          <div 
            ref={cardsContainerRef}
            className="flex flex-col gap-[48px] pl-5"
          >
            {steps.map((step, index) => {
              const isActive = index + 1 === currentStep;
              return (
                <div key={step.id} className="flex flex-col ">
                  {/* Day Label - Above card */}
                  <button
                    onClick={() => setCurrentStep(index + 1)}
                    className={`
                      self-start mb-[16px] px-[9px] py-[5px] rounded-[5px] text-[14px] leading-[20px] -tracking-[0.003em] font-medium transition-all duration-300 ease-in-out whitespace-nowrap
                      ${isActive 
                        ? 'bg-[#F4F2F0] border border-[#F4F2F0] text-black' 
                        : 'bg-white border border-[#D2CECB] text-black hover:border-gray-300 shadow-[0px_1px_2px_0px_#0A0D1408]'
                      }
                    `}
                  >
                    {step.label}
                  </button>
                  
                  {/* Card */}
                  <div
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    onClick={() => setCurrentStep(index + 1)}
                    className={`
                      py-5 px-4 rounded-[11px] cursor-pointer transition-all duration-300 ease-in-out
                      ${isActive 
                        ? 'bg-[#F4F2F0] shadow-[0px_1px_2px_0px_#0A0D1408] border border-[#F4F2F0]' 
                        : 'bg-white border border-gray-200 shadow-[0px_1px_2px_0px_#0A0D1408] hover:border-gray-300'
                      }
                    `}
                  >
                    <h3 className="text-[15px] font-medium leading-[24px] -tracking-[0.003em] text-black mb-4 transition-colors">
                      {step.title}
                    </h3>
                    
                    <ul className="space-y-2">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white ${isActive ? 'bg-[#D9825A]' : 'bg-[#B6B6B5]'}`}>
                            <Check strokeWidth={4} className="w-[8px] h-[8px] text-white" />
                          </div>
                          <span className="text-[14px] leading-[20px] tracking-[0.002em] text-[#696765] font-normal whitespace-nowrap">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop/Tablet Layout: Timeline above, Cards below */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mb-6 sm:mb-7 md:mb-8 text-center relative z-10 gap-2 sm:gap-3 md:gap-0">
            {steps.map((step, index) => {
               const isActive = index + 1 === currentStep;
               return (
                <div key={step.id} className="flex justify-center px-1 sm:px-2">
                  <button
                    onClick={() => setCurrentStep(index + 1)}
                    className={`
                      px-3 sm:px-4 md:px-5 py-1.5 rounded-[5px] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] leading-[20px] sm:leading-[21px] md:leading-[22px] -tracking-[0.003em] font-medium transition-all duration-300 ease-in-out whitespace-nowrap
                      ${isActive 
                        ? 'bg-[#F4F2F0] border border-[#F4F2F0] text-gray-900' 
                        : 'bg-white border border-[#D2CECB] text-black hover:border-gray-300 shadow-[0px_1px_2px_0px_#0A0D1408]'
                      }
                    `}
                  >
                    {step.label}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 items-center justify-items-center mb-6 sm:mb-8 md:mb-10 gap-2 sm:gap-3 md:gap-0">
            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[12.5%] right-[12.5%] h-[2px] z-0">
              <div className="absolute w-full h-full bg-transparent"></div>
              <div 
                className="absolute h-px bg-[#D2CECB] transition-all ease-in-out"
                style={{ 
                  width: `${progressWidth}%`,
                  transitionDuration: '400ms'
                }}
              ></div>
            </div>

            {/* Tablet progress line */}
            <div className="md:hidden sm:block absolute top-1/2 -translate-y-1/2 left-[12.5%] right-[12.5%] h-[2px] z-0">
              <div className="absolute w-full h-full bg-transparent"></div>
              <div 
                className="absolute h-px bg-[#D2CECB] transition-all ease-in-out"
                style={{ 
                  width: `${progressWidth}%`,
                  transitionDuration: '400ms'
                }}
              ></div>
            </div>

            {steps.map((step, index) => {
              const isActive = index + 1 === currentStep;
              const isCompleted = index + 1 < currentStep;
              
              return (
                <button
                  title={step.title}
                  key={step.id}
                  onClick={() => setCurrentStep(index + 1)}
                  className={`
                    relative z-10 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full border bg-white transition-colors duration-300
                    ${(isActive || isCompleted) ? 'border-[#D2CECB]' : 'border-[#D2CECB]'}
                  `}
                ></button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-[14.67px]">
            {steps.map((step, index) => {
              const isActive = index + 1 === currentStep;
              return (
                <div
                  key={step.id}
                  onClick={() => setCurrentStep(index + 1)}
                  className={`
                    py-5 sm:py-6 md:py-[28px] px-4 sm:px-5 md:px-[24px] rounded-[11px] cursor-pointer transition-all duration-300 ease-in-out h-full
                    ${isActive 
                      ? 'bg-[#F4F2F0] shadow-[0px_1px_2px_0px_#0A0D1408] border border-[#F4F2F0]' 
                      : 'bg-white border border-gray-200 shadow-[0px_1px_2px_0px_#0A0D1408] hover:border-gray-300'
                    }
                  `}
                >
                  <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-medium leading-[24px] sm:leading-[26px] md:leading-[28px] -tracking-[0.003em] text-black mb-4 sm:mb-5 md:mb-6 transition-colors">
                    {step.title}
                  </h3>
                  
                  <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                        <div className={`mt-0.5 shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 rounded-full flex items-center justify-center text-white ${isActive ? 'bg-[#D9825A]' : 'bg-[#B6B6B5]'}`}>
                          <Check strokeWidth={4} className="w-[8px] h-[8px] sm:w-[9px] sm:h-[9px] md:w-[10px] md:h-[10px] text-white" />
                        </div>
                        <span className="text-[14px] sm:text-[15px] md:text-[16px] leading-[20px] sm:leading-[21px] md:leading-[22px] tracking-[0.002em] text-[#696765] font-normal whitespace-nowrap">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubFeatures;