'use client';
import React from 'react';
import { Check } from '@phosphor-icons/react';
import clsx from 'clsx';

export const SectionCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={clsx("bg-[#F4F2F0] rounded-[12px] sm:rounded-[13px] md:rounded-[15px] p-5 sm:p-6 md:p-8 lg:p-[40px]", className)}>
    {children}
  </div>
);

export const SectionHeading = ({ title, description }: { title: string, description: string }) => (
  <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-0 space-y-2 sm:space-y-[10px] md:space-y-3 max-w-md">
    <h3 className="text-[21px] md:text-[24px] lg:text-[28px] font-medium leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] tracking-[0.0003em] text-black">
      {title}
    </h3>
    <p className="text-[17px] font-medium text-[#6D6C6B] leading-[22px]  md:leading-[22px] -tracking-[0.0003em]">
      {description}
    </p>
  </div>
);

export const CustomCheckbox = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
  <div className="flex items-center space-x-2 sm:space-x-[10px] md:space-x-3 cursor-pointer group" onClick={onChange}>
    <div className={clsx(
      "h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5 rounded border flex items-center justify-center transition-colors duration-200 ease-in-out",
      checked ? "bg-[#4F7DF3] border-[#4F7DF3]" : "bg-white border-[#D1D5DB] group-hover:border-[#4F7DF3]"
    )}>
      {checked && <Check weight="bold" className="text-white w-3 h-3 sm:w-3.5 sm:h-3.5" />}
    </div>
    <span className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#000000] select-none">{label}</span>
  </div>
);

