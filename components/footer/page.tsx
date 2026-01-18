'use client';
import Image from 'next/image';
import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Footer: React.FC = () => {
  const footerLinks = {
    Product: ['Features', 'Resources', 'Try now'],
    Company: ['Career', 'Contact', 'Blog'],
    Legal: ['Term of Services', 'Privacy Policy', 'Security'],
    Connect: ['X', 'LinkedIn', 'Facebook']
  };

  const complianceBadges = [
    { name: 'AICPA SOC 2 TYPE I', image: '/soc2-type1.svg' },
    { name: 'AICPA SOC 2 TYPE II', image: '/soc2-type2.svg' },
    { name: 'ISO 27001', image: '/iso27001.svg' },
    { name: 'GDPR', image: '/gdpr.svg' },
    { name: 'CCPA COMPLIANT', image: '/ccpa.svg' },
    { name: 'HIPAA', image: '/hipaa.svg' }
  ];

  const socialMediaIcons = [
    {
      name: 'X',
      href: 'https://x.com/edulumeinc',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/61585817864026',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    // {
    //   name: 'Instagram',
    //   href: '#',
    //   svg: (
    //     <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    //       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    //     </svg>
    //   )
    // },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/edulume',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    // {
    //   name: 'Threads',
    //   href: '#',
    //   svg: (
    //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    //       <path d="M12.1835 1.41016L12.1822 1.41016C9.09012 1.43158 6.70036 2.47326 5.09369 4.51569C3.66581 6.33087 2.93472 8.86436 2.91016 12.0068V12.0082C2.93472 15.1508 3.66586 17.6696 5.09369 19.4847C6.70043 21.5271 9.10257 22.5688 12.1946 22.5902H12.1958C14.944 22.5711 16.8929 21.8504 18.4985 20.2463C20.6034 18.1434 20.5408 15.5048 19.8456 13.8832C19.3163 12.6493 18.2709 11.6618 16.8701 11.0477C16.6891 8.06345 15.0097 6.32178 12.2496 6.30415C10.6191 6.29409 9.14792 7.02378 8.24685 8.39104L9.90238 9.5267C10.4353 8.71818 11.2789 8.32815 12.2371 8.33701C13.6244 8.34586 14.5362 9.11128 14.7921 10.4541C14.02 10.3333 13.1902 10.2982 12.3076 10.3488C9.66843 10.5008 7.9399 12.061 8.05516 14.2244C8.17571 16.4862 10.367 17.7186 12.4476 17.605C14.9399 17.4684 16.4209 15.6292 16.7722 13.2836C17.3493 13.6575 17.7751 14.1344 18.0163 14.6969C18.4559 15.7222 18.4838 17.4132 17.1006 18.7952C15.8838 20.0108 14.4211 20.5407 12.1891 20.5572C9.71428 20.5388 7.85698 19.746 6.65154 18.2136C5.51973 16.7748 4.92843 14.6882 4.90627 12.0002C4.92843 9.31211 5.51973 7.22549 6.65154 5.78673C7.85698 4.25433 9.71424 3.46156 12.189 3.44303C14.6819 3.4617 16.5728 4.25837 17.8254 5.79937C18.5162 6.64934 18.949 7.66539 19.2379 8.71407L21.1776 8.19656C20.8148 6.85917 20.2414 5.58371 19.363 4.50305C17.7098 2.46918 15.2816 1.43166 12.1835 1.41016ZM12.4204 12.3782C13.3044 12.3272 14.1239 12.3834 14.8521 12.5345C14.7114 14.1116 14.0589 15.4806 12.3401 15.575C11.2282 15.6376 10.1031 15.1413 10.0484 14.114C10.0077 13.3503 10.5726 12.4847 12.4204 12.3782Z"/>
    //     </svg>
    //   )
    // }
  ];

  return (
    <footer className="">
      <div className="max-w-8xl mx-auto p-[24px]  lg:px-[48px] lg:pt-[48px]    bg-[#F4F2F0] rounded-[10px] sm:rounded-[11px] md:rounded-[12px] lg:rounded-[13px]">
        <div className="flex flex-col lg:flex-row justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-[166px] mb-[36px] sm:mb-[14px] md:mb-[16px] lg:mb-[18px]">
          
          {/* Logo and Disclaimer Column - First on mobile, first on desktop */}
          <div className="flex flex-col w-full lg:w-[430px] lg:shrink-0 order-1">    
            <div className='flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-[32px] mb-[23px] sm:mb-0 md:mb-0 lg:mb-[176px]'>
                <div className="flex items-center ">
                <img src="/footer-logo.svg" alt="" className="w-auto h-6 sm:h-7 md:h-8 lg:h-auto hover:brightness-0 transition-all duration-200 cursor-pointer" />
                </div>
                <p className="text-[11px] text-justify leading-[12px]  tracking-[0.03em] text-[#B6B6B6]">
                Edulume is a technology provider and does not operate as an educational institution, accrediting body, or certification authority. AI-generated content and analytics are provided for informational and assistive purposes only and should not be relied upon as a substitute for professional judgment or instructional oversight. All trademarks and service marks belong to their respective owners.
                </p>
            </div>
            {/* Status Badge and Compliance Badges Container - Desktop only */}
            <div className="hidden lg:flex flex-col bg-b gap-4 sm:gap-5 md:gap-6">
              {/* Status Badge */}
              <div
                className="inline-flex items-center gap-[7px] px-2 sm:px-[7px] md:px-[9px] py-2 sm:py-[9px] md:py-[9.5px] border border-[#D2CECB] bg-white rounded-[6px] sm:rounded-[7px] md:rounded-[8px] min-w-[190px] w-fit"
                style={{
                  boxShadow: '0px 1px 2px 0px #0A0D1408',
                  boxSizing: 'border-box',
                  border: '1.5px solid #D2CECB',
                  outline: '1.5px solid white',
                  outlineOffset: '-2.5px'
                }}
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#2DB463] rounded-full animate-status-pulse"></span>
                <span className="text-[16px] leading-[12px] tracking-[-0.01em]!  text-[#000000] whitespace-nowrap">All systems operational</span>
              </div>

              {/* Compliance Badges */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Image src="/company.svg" alt="compliance badge" width={382} height={52} className="max-w-full h-auto w-full sm:w-auto" />
              </div>
            </div>
          </div>

          {/* Link Columns Container - Second on mobile, second on desktop */}
          <div className={`grid grid-cols-2 sm:flex sm:flex-row gap-y-[40px] gap-x-6 sm:gap-8 md:gap-10 lg:gap-[90px] flex-1 lg:min-w-0 lg:shrink order-2 ${inter.className}`}>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="flex flex-col">
                <h4 className="text-[14px] leading-[20px] tracking-[-0.02em] font-medium text-[#808183] mb-[12px] sm:mb-2.5 md:mb-3">
                  {title}
                </h4>
                <ul className="flex flex-col gap-2 sm:gap-2.5 md:gap-[12px]">
                  {links.map((link) => {
                    // Map link text to actual routes
                    const getHref = (linkText: string, sectionTitle: string) => {
                      if (linkText === 'Privacy Policy') return '/privacy-policy';
                      if (linkText === 'Term of Services') return '/privacy-policy';
                      if (linkText === 'Security') return '/privacy-policy';
                      if (linkText === 'Career') return '/carrers';
                      if (linkText === 'Contact') return 'mailto:support@edulume.com';
                      if (linkText === 'Blog') return '/blog';
                      if (linkText === 'Features') return '/#features';
                      if (linkText === 'Resources') return '/#blog';
                      if (linkText === 'Try now') return '/contact';
                      if (linkText === 'X') return 'https://x.com/edulumeinc';
                      if (linkText === 'LinkedIn') return 'https://www.linkedin.com/company/edulume';
                      if (linkText === 'Facebook') return 'https://www.facebook.com/61585817864026';
                      return '#';
                    };
                    
                    const href = getHref(link, title);
                    const isMailto = href.startsWith('mailto:');
                    const isExternal = href.startsWith('https://');
                    // Show arrow only for links that actually redirect somewhere (not '#')
                    const shouldShowIcon = href !== '#';
                    
                    return (
                      <li key={link}>
                        <motion.a
                          href={href}
                          {...((isMailto || isExternal) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="inline-flex items-center gap-1 text-[14px] leading-[20px] tracking-[-0.02em] font-medium text-[#000000] hover:text-[#808183] transition-opacity group"
                          whileHover="hover"
                          initial="initial"
                        >
                          {link}
                          {shouldShowIcon && (
                            <motion.span
                              variants={{
                                initial: { opacity: 0, x: -4, y: 4 },
                                hover: { opacity: 1, x: 0, y: 0 }
                              }}
                              transition={{ 
                                duration: 0.1, 
                                ease: 'easeOut' 
                              }}
                              className="inline-flex items-center"
                            >
                              <ArrowUpRight  
                              weight="bold"
                                className="w-3 h-3 sm:w-[12px] text-[#808183] sm:h-[12px] " 
                              />
                            </motion.span>
                          )}
                        </motion.a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Status Badge and Compliance Badges Container - Mobile only, shown at bottom */}
          <div className="flex mt-[14px] lg:hidden flex-col gap-4 sm:gap-5 md:gap-6 order-3 ">
            {/* Status Badge */}
            <div
              className="inline-flex items-center gap-2 px-[9px] sm:px-[7px] md:px-[9px] py-[10px] sm:py-[9px] md:py-[9.5px] border border-[#D2CECB] bg-white rounded-[8px] sm:rounded-[7px] md:rounded-[8px] w-fit"
              style={{ boxShadow: '0px 1px 2px 0px #0A0D1408' }}
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#438A7A] rounded-full animate-status-pulse"></span>
              <span className="text-[16px] sm:text-[13px] leading-[12px] tracking-[-0.01em] md:text-[14px] font-medium text-[#111827]">All systems operational</span>
            </div>

            {/* Compliance Badges */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Image src="/company.svg" alt="compliance badge" width={285} height={40} className=" w-[285px] h-[40px] sm:h-auto sm:w-auto" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr
          className="border-t border-[#E1E1E1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] "
          style={{ boxShadow: '0px 1px 0px 0px #FFFFFF5E' }}
        />
        <div className="pt-4 sm:pt-[14px]  md:pt-[16px] lg:pt-[20px] flex flex-col md:flex-row justify-between items-start sm:items-center gap-4 sm:gap-5 md:gap-6" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}>
          <p className="text-[13px] md:text-[14px] leading-[20px] tracking-[-0.006em] font-medium text-[#808183] text-center md:text-left">
            © 2026 Edulume | All Rights Reserved
          </p>
          
          <div className="hidden  sm:flex items-center gap-4 sm:gap-4.5 md:gap-[24px]">
            {socialMediaIcons.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black  text-[#8F8E8E]"
              >
                <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 inline-block">
                  {social.svg}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
