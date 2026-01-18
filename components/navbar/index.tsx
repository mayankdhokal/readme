'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
} from "lucide-react";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryLink } from "./primary-link";
import Image from "next/image";

interface NavbarProps {
  variant?: 'light' | 'dark';
  isScrolled?: boolean;
}

export const Navbar = ({ variant = 'light', isScrolled: propIsScrolled = false }: NavbarProps) => {
  const links = [
    { 
      name: "Products", 
      href: undefined,
      dropdownItems: [
        { label: "Edulume Learn", href: "/" },
        { label: "Edulume CRM", href: "/" },
      ]
    },
    { 
      name: "Solutions", 
      href: undefined,
      dropdownItems: [
        { label: "K-12 Schools", href: "/" },
        { label: "Higher education", href: "/" },
        { label: "Corporate Training", href: "/" },
      ]
    },
    { 
      name: "Resources", 
      href: undefined,
      dropdownItems: [
        { label: "Careers", href: "/carrers" },
        { label: "Security", href: "/" },
      ]
    },
    { name: "Careers", href: "/carrers" },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = variant === 'dark';
  const bgColor = isDark ? 'bg-[#1A1919]' : 'bg-white';
  // Border: white initially, show border-[#F4F4F4] when scrolled (unless dark variant)
  const borderColor = isDark 
    ? 'border-[#2E2E2E]' 
    : (isScrolled || propIsScrolled ? 'border-[#F4F4F4]' : 'border-white');
  const textColor = isDark ? 'text-white' : 'text-black';
  const logoFilter = isDark ? 'brightness-0 invert' : 'hover:brightness-0';

  return (
    <div className={`sticky top-0 left-0 right-0 w-full z-999 h-[56px] lg:h-[62px] ${bgColor} border-b ${borderColor} transition-colors duration-300`}>
      <div className="max-w-8xl mx-auto px-4 md:px-[64px]">
        <header className="container relative lg:top-[22px] py-[8px] lg:py-0">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center justify-center gap-2 shrink-0">
            <Link href="/">
              <img src="/nav-logo.svg" alt="" className={`h-8 sm:h-[18px] w-[98px] ${logoFilter} transition-all duration-200 cursor-pointer`} />
            </Link>
          </div>

          <nav className="hidden fixed left-1/2 -translate-x-1/2 lg:flex items-center space-x-1">
            {links.map((link) => {
              return (
                <PrimaryLink
                  key={link.name}
                  link={link.name}
                  href={link.href}
                  textColor={isDark ? 'white' : 'black'}
                  dropdownItems={link.dropdownItems}
                />
              );
            })}
          </nav>

          <div className="flex items-center relative top-0 lg:right-32 2xl:right-[-100px] gap-3">
            <Link
              href="/contact"
              className={`
                group
                absolute
                flex
                items-center
                justify-start
                overflow-hidden
                rounded-full
                bg-[#527B72] text-white hover:bg-[#15352E]
                px-6
                sm:px-[18px]
                py-3
                sm:py-[5px]
                font-medium
                transition-all
                duration-140
                ease-out
                hidden
                lg:flex
              `}
              style={{
                fontFamily: 'SF Pro Display, sans-serif',
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0.6px',
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
                  group-hover:ml-1
                  group-hover:max-w-[20px]
                  sm:group-hover:max-w-[24px]
                  group-hover:opacity-100
                "
              >
                <Image src="/arrow.svg" alt="Arrow Right" className="size-[20px] shrink-0" width={13} height={13} />
                
              </div>
            </Link>
            {/* DESKTOP BUTTON END */}

            <button
              type="button"
              className={`lg:hidden focus:outline-none rounded-[6px] ${isDark ? 'bg-white/10 border-white/20' : 'bg-[#F2F2F2] border-[#EBEBEB00]'} border-2 p-[6px] cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={`h-[24px] w-[24px] ${isDark ? 'text-white' : 'text-[#171717]'}`} />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`h-6 w-6 ${isDark ? 'text-white' : 'text-[#B6B6B5]'}`}>
                  <path d="M3 7H21V9H3V7ZM3 15H21V17H3V15Z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Backdrop Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-[56px] left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
      
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-[56px] lg:top-[62px] left-0 right-0 w-full border-t border-[#F4F4F4] bg-white lg:hidden z-50"
              style={{
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
              }}
            >
              {/* Menu Items */}
              <div className="flex flex-col">
                {links.map((link, index) => (
                  <div key={link.name}>
                    <Link
                      href={link.href || "#"}
                      className="block px-[16px] py-[19px] tracking-[-0.003em] text-gray-900 font-medium hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        fontFamily: 'SF Pro Display, sans-serif',
                        fontSize: '15px',
                        lineHeight: '22px',
                      }}
                    >
                      {link.name}
                    </Link>
                    {index < links.length - 1 && (
                      <div className="border-b border-[#F4F4F4]" />
                    )}
                  </div>
                ))}
              </div>

              {/* Book a call button */}
              <div className="px-4 py-4">
                <Link
                  href="/contact"
                  className="
                    flex
                    items-center
                    justify-center
                    w-full
                    rounded-full
                    bg-[#527B72]
                    px-6
                    py-[6px]
                    font-medium
                    text-white
                    transition-all
                    duration-140
                    ease-out
                    hover:bg-[#15352E]
                  "
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'SF Pro Display, sans-serif',
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0.6px',
                  }}
                >
                  <span className="whitespace-nowrap">Book a call</span>
                  <div 
                    className="
                      flex
                      ml-1
                      max-w-[20px]
                      opacity-100
                    "
                  >
                    <Image src="/arrow.svg" alt="Arrow Right" className="size-[20px] shrink-0" width={13} height={13} />
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      </div>
    </div>
  );
};