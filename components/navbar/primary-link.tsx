'use client';
import { CaretDown, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

interface DropdownItem {
  label: string;
  href: string;
}

interface PrimaryLinkProps {
  link: string;
  href?: string;
  textColor?: 'black' | 'white';
  dropdownItems?: DropdownItem[];
}

const PrimaryLink = ({
  link,
  href,
  textColor = 'black',
  dropdownItems,
}: PrimaryLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasDropdown = dropdownItems && dropdownItems.length > 0;
  const textColorClass = textColor === 'white' ? 'text-white' : 'text-black';
  const hoverBgClass = textColor === 'white' ? 'hover:bg-[#2F2F2F]' : 'hover:bg-[#F2F2F2]';
  const iconColorClass = textColor === 'white' ? 'text-white' : 'text-black';

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={hasDropdown ? "#" : (href || "/")}
        className={`${textColorClass} group font-medium ${hoverBgClass} text-[15px] leading-[20px] tracking-[0.01em] py-[7px] px-[12px] rounded-[11px] flex items-center gap-[4px] relative whitespace-nowrap transition-colors duration-200 ${hasDropdown ? 'cursor-pointer' : ''}`}
        style={{
          fontFamily: 'SF Pro Display, sans-serif',
        }}
        onClick={(e) => {
          if (hasDropdown) {
            e.preventDefault();
          }
        }}
      >
        <span className="font-medium text-[15px] leading-[20px] tracking-[0.03em]" style={{
          fontFamily: 'SF Pro Display, sans-serif',
        }}>
          {link}
        </span>
        {hasDropdown && (
          <div 
            className={`${iconColorClass}`}
            style={{
              perspective: '100px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              style={{
                transform: isHovered ? 'rotateX(180deg)' : 'rotateX(0deg)',
                transitionProperty: 'transform',
                transitionTimingFunction: 'ease-out',
                transitionDuration: '140ms',
                transformStyle: 'preserve-3d',
              }}
            >
              <CaretDown weight="bold" className={`h-4 w-4 ${iconColorClass}`} style={{
                fontFamily: 'SF Pro Display, sans-serif',
              }} />
            </div>
          </div>
        )}
      </Link>

      {/* Dropdown Menu */}
      {hasDropdown && isHovered && (
        <div
          className="absolute  left-0 bg-white min-[236px] rounded-[10px] border border-[#D2CECB] shadow-[0px_0px_15px_0px_#00000008] min-w-[200px] overflow-hidden z-50"
          style={{
            fontFamily: 'SF Pro Display, sans-serif',
            top: '100%',
            marginTop: 10,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {dropdownItems.map((item, index) => (
            <div key={item.label} className="px-[10px]">
              <Link
                href={item.href}
                className="text-black font-medium hover:text-[#8F8E8E] flex items-center justify-between tracking-[-0.03em]  py-[13px] transition-colors duration-150"
                style={{
                  fontFamily: 'SF Pro Text, sans-serif',
                  fontSize: '15px',
                  lineHeight: '24px',
                }}
              >
                <span>{item.label}</span>
                <ArrowRight weight="bold" className="h-4 w-4   " />
              </Link>
              {index < dropdownItems.length - 1 && (
                <div className="border-t border-[#D2CECBE0]" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { PrimaryLink };
