import React from 'react';
import { Check, Plus,  ArrowUp } from 'lucide-react';

export const LumeIntelligenceMockup: React.FC = () => (
  <div className="w-full relative h-full flex flex-col items-center justify-center p-2">
    {/* Base UI Layer (Course Creation Background) */}
    <div className="w-full absolute  sm:top-6 md:top-12 -right-2 sm:-right-4 md:-right-12 h-[224px] sm:h-[200px] md:h-[224px] max-w-[312px] sm:max-w-[320px] md:max-w-md bg-white p-1.5 rounded-xl sm:rounded-2xl transition-all  opacity-43 duration-200 ease-out group-[.in-view]:opacity-43% group-[.in-view]:-translate-x-22 md:group-[.in-view]:-translate-x-4 lg:group-hover:opacity-74% lg:group-hover:-translate-x-4">
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-2 px-1.5 pt-1.5">
        <div className="flex items-center justify-center w-5 h-5 bg-[#58B271] rounded-full">
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </div>
        <span className="text-[#56B56F] font-normal leading-[22px] tracking-[-0.0002em] text-[16px]">
          Creating course...
        </span>
      </div>

      {/* Inner Skeleton Container */}
      <div className="border border-[#E1E1E1] rounded-[8px] mx-[12px] p-[10px]  pb-5 ">
        {/* Skeleton Bars - Using animate-pulse for loading effect */}
        <div className="flex flex-col space-y-2 animate-pulse">
          <div className="h-[12px] bg-[#F4F2F0] rounded-full w-[95%]"></div>
          <div className="h-[12px] bg-[#F4F2F0] rounded-full w-[85%]"></div>
          <div className="h-[12px] bg-[#F4F2F0] rounded-full w-[45%]"></div>
          <div className="h-[12px] bg-[#F4F2F0] rounded-full w-[88%]"></div>
          <div className="h-[12px] bg-[#F4F2F0] rounded-full w-[65%]"></div>
          <div className="h-[12px] bg-[#F4F2F0] rounded-full w-[65%]"></div>
          <div className="h-[12px] bg-[#F4F2F0] rounded-full w-[65%]"></div>
        </div>
      </div>
    </div>

    {/* Floating Prompt Box */}
    <div className="absolute min-h-[70px] space-y-[16px] sm:min-h-[80px] md:min-h-[89px] max-w-[390px]  md:max-w-[450px] top-36 md:top-34 -right-16 sm:-right-24 md:-right-32 bg-white p-2 sm:p-2.5 rounded-[10px] sm:rounded-[12px] border border-gray-100 z-20 transition-all duration-200 ease-out group-[.in-view]:-translate-x-18 sm:group-[.in-view]:-translate-x-24 md:group-[.in-view]:-translate-x-36 lg:group-hover:-translate-x-36" style={{ boxShadow: '0px 0px 15px 0px #00000008, 0px 2px 30px 0px #00000014' }}>
      {/* Input Area */}
      <div className="">
        <div
          className="w-full text-[16px] leading-[22px] text-black bg-transparent min-h-[28px] sm:min-h-[30px] md:min-h-[32px] transition-colors cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
        >
          create an advanced course on artificial intelligence
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="flex items-center justify-between">
        {/* Left: Modes Group */}
        <div className="flex items-center bg-[#F1F1F0] p-0.5 max-h-[30px] rounded-[7px] ">
          {/* Plus Button */}
          <button className="flex items-center justify-center w-7 h-7 bg-white rounded-[5px]  transition-colors" style={{ boxShadow: '0px 1px 2px 0px #0A0D1408' }}>
            <Plus className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
          </button>
          
          {/* Modes Button */}
          <button className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-1.5 pr-1.5 sm:pr-2 py-0.5 text-gray-600 hover:text-gray-800 transition-colors">
            <img src="filter.svg" alt="filter" className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-normal tracking-[-0.0002em] text-[13px] sm:text-[14px] md:text-[16px] leading-[18px] sm:leading-[20px] md:leading-[22px] text-[#656565]">Modes</span>
          </button>
        </div>

        {/* Right: Submit Button */}
        <button className="flex items-center justify-center w-8 h-8 bg-[#9CA3AF] sm:bg-[#171717] rounded-lg hover:bg-[#7D8491] transition-colors">
          <ArrowUp className="w-4 h-4 text-white" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  </div>
);

