'use client';

import React, { useState, useId, forwardRef } from "react";
import Oval from "./Oval";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface TestimonialCardProps {
  image: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  src: string;
  iconColor: string;
  ovalColor: string;
  ovalClassName: string;
  ovalStyle?: React.CSSProperties;
}

const TestimonialCard = ({ image, quote, name, role, company, src, iconColor, ovalColor, ovalClassName, ovalStyle }: TestimonialCardProps) => {
  // Calculate mobile top position (15px higher)
  const mobileTop = ovalStyle?.top ? (typeof ovalStyle.top === 'string' 
    ? `calc(${ovalStyle.top.replace('px', '')} - 15px)` 
    : `${ovalStyle.top - 15}px`) : ovalStyle?.top;
  
  // Generate stable unique ID for this card's oval to target with CSS
  const uniqueId = useId();
  const ovalId = `oval-${uniqueId.replace(/:/g, '-')}`;
  const companyId = `company-${uniqueId.replace(/:/g, '-')}`;
  
  // Extract hover color from iconColor and map to CSS color values
  const hoverColorMatch = iconColor.match(/group-hover:(\S+)/);
  let hoverColorCSS = '';
  if (hoverColorMatch) {
    const hoverClass = hoverColorMatch[1];
    // Map Tailwind color classes to CSS color values
    const colorMap: { [key: string]: string } = {
      'text-white': 'white',
      'text-blue-500': 'rgb(59 130 246)',
      'text-orange-500': 'rgb(249 115 22)',
    };
    hoverColorCSS = colorMap[hoverClass] || '';
  }
  // Remove group-hover classes from iconColor
  const baseIconColor = iconColor.replace(/group-hover:\S+\s*/g, '').trim();

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          #${ovalId} {
            top: ${ovalStyle?.top} !important;
          }
          .image-container:hover #${ovalId} {
            opacity: 1 !important;
          }
          ${hoverColorCSS ? `.group:has(.image-container:hover) #${companyId} span { color: ${hoverColorCSS} !important; }` : ''}
        }
      `}} />
      <div className="group relative flex flex-col max-w-[314px]  mx-auto sm:max-w-sm md:max-w-sm lg:max-w-sm cursor-pointer bg-[#474747] md:bg-transparent rounded-2xl md:rounded-none overflow-hidden">
      
      <div className="image-container relative flex justify-center items-end h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
        
        {/* Oval background that appears on hover - responsive sizing */}
        <Oval
          id={ovalId}
          color={ovalColor}
          className={`opacity-100 md:opacity-0 z-0 transition-opacity duration-500 ease-out ${ovalClassName}`}
          style={{
            ...ovalStyle,
            top: mobileTop,
          }}
        />

        <img
          src={image}
          alt={name}
          className="hidden md:block relative z-10 h-full w-full object-contain grayscale hover:translate-x-[5px] hover:translate-y-[10px] hover:scale-110 duration-400 ease-out"
        />
        
        <div 
          className="hidden md:block absolute -bottom-3 sm:-bottom-3 md:-bottom-3 lg:-bottom-4 left-1/2 transform -translate-x-1/2 bg-linear-to-b from-transparent via-[#393939] md:via-[#1A1919] to-[#393939] md:to-[#1A1919] w-[280px] sm:w-[320px] md:w-[360px] lg:w-[413px] h-[20px] sm:h-[24px] md:h-[26px] lg:h-[29px]"
          style={{
            backdropFilter: 'blur(0px)',
            zIndex: 60
          }}
        ></div>
      </div>

      
      <div className="flex flex-col gap-3 sm:gap-3 md:gap-4 relative lg:gap-4 z-50 p-5 sm:p-5 md:mt-2 md:bg-[#1A1919] md:rounded-lg md:p-3 lg:p-4">
      <img
          src={image}
          alt={name}
          className="block md:hidden absolute -top-55 right-0  z-10 md:h-full md:w-full w-[250px] h-[250px]  object-contain grayscale hover:translate-x-[5px] hover:translate-y-[10px] hover:scale-110 duration-400 ease-out"
        />

      <div 
          className="block md:hidden absolute bottom-[140px] sm:-bottom-3 md:-bottom-3 lg:-bottom-4 left-1/2 transform -translate-x-1/2 bg-linear-to-b from-transparent via-[#393939] md:via-[#1A1919] to-[#393939] md:to-[#1A1919] w-[336px] h-[20px] sm:h-[24px] md:h-[26px] lg:h-[29px]"
          style={{
            backdropFilter: 'blur(0px)',
            zIndex: 60
          }}
        ></div>
      <div 
          className="block md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-linear-to-b from-[#393939] via-[#393939] to-[#393939]  w-[336px]  h-[140px] "
          style={{
            backdropFilter: 'blur(0px)',
            zIndex: 50
          }}
        ></div>
        <p className="text-gray-300 text-[16.34px] leading-[20px] tracking-[-0.0001em] z-100 max-w-[257px] md:max-w-full">
          "{quote}"
        </p>

        <div className="z-100">
          <h3 className="text-white text-[16.34px] sm:text-[15px]  md:text-[15.5px] lg:text-[16px] leading-[18px] sm:leading-[19px] md:leading-[19.5px] lg:leading-[20px] tracking-[-0.0001em]">{name}</h3>
          <p className="text-white z-100 text-[16px] leading-[20px] tracking-[-0.02em] sm:tracking-[-0.0001em]">{role}</p>
        </div>
        
        <div id={companyId} className={`hidden md:flex items-center gap-2 z-100 font-semibold text-xs sm:text-xs md:text-sm lg:text-sm ${baseIconColor}`}>
          <span>{company}</span>
        </div>
      </div>
      </div>
    </>
  );
};

const TestimonialsSection = forwardRef<HTMLElement>((props, ref) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const testimonials = [
    {
      name: "Linda Darling-Hammond",
      role: "President & CEO",
      company: "Learning Policy Institute",
      src: "facebook.svg",
      iconColor: "text-gray-400 group-hover:text-white transition-colors",
      image: "linkda.svg",
      ovalColor: "#F88009",
      ovalClassName: "",
      ovalStyle: {
        width: "280px",
        height: "210px",
        top: "10px",
        left: "30px",
        transform: "rotate(28deg)"
      },
      quote: "A democratic education means that we educate people in a way that ensures they can think independently, that they can use information, knowledge, and technology, among other things, to draw their own conclusions."
    },
    {
      name: "Sir Ken Robinson",
      role: "Education Thought Leader",
      company: "TED Speaker",
      src: "facebook.svg",
      iconColor: "text-gray-400 group-hover:text-blue-500 transition-colors",
      image: "ken.svg",
      ovalColor: "#F8D009",
      ovalClassName: "",
      ovalStyle: {
        width: "270px",
        height: "200px",
        top: "35px",
        left: "40px",
        transform: "rotate(-29deg)"
      },
      quote: "The future for education is not in standardising but in customising; not in promoting groupthink and 'deindividuation' but in cultivating the real depth and dynamism of human abilities of every sort."
    },
    {
      name: "Malcolm Forbes",
      role: "American Publisher",
      company: "Forbes Magazine",
      src: "facebook.svg",
      iconColor: "text-gray-400 group-hover:text-orange-500 transition-colors",
      image: "Malcolm.svg",
      ovalColor: "#093BF8",
      ovalClassName: "",
      ovalStyle: {
        width: "260px",
        height: "195px",
        top: "20px",
        left: "30px",
        transform: "rotate(0deg)"
      },
      quote: "The purpose of education is to replace an empty mind with an open one."
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={ref} id="testimonials-section" className=" bg-[#1A1919] lg:min-h-screen flex flex-col items-center justify-center py-20 sm:py-10 md:py-10 lg:py-[78px] px-4 sm:px-6 md:px-12 lg:px-[64px] font-sans">
      <h2 className="text-white text-[36px] md:text-[42px] lg:text-[48px] leading-[36px] sm:leading-[40px] md:leading-[44px] lg:leading-[48px] tracking-[0.01em] font-medium mb-12 sm:mb-16 md:mb-18 lg:mb-20 text-center">
        Insights from top entrepreneurs
      </h2>
      
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-8xl mx-auto w-full">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden flex flex-col items-center w-full">
        <div className="relative w-full overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(50% - ${activeIndex * 330}px - 157px))`,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="shrink-0"
                style={{
                  width: '314px',
                  marginRight: i < testimonials.length - 1 ? '16px' : '0',
                }}
              >
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-end justify-end w-full pr-4 gap-4 mt-8">
          <button 
            onClick={handlePrev}
            className="p-3 rounded-full bg-[#393939] text-[#8F8E8E] hover:bg-[#3A3939] transition-colors"
            aria-label="Previous testimonial"
          >
            <CaretLeft size={24} weight="bold" />
          </button>
          <button 
            onClick={handleNext}
            className="p-3 rounded-full bg-[#393939] text-[#8F8E8E] hover:bg-[#3A3939] transition-colors"
            aria-label="Next testimonial"
          >
            <CaretRight size={24} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
