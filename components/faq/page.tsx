'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import FAQItem from './components/FAQItem';
import { FAQItemData } from './types';
import Link from 'next/link';

const INITIAL_FAQS: FAQItemData[] = [
  {
    id: '1',
    question: 'Why choose edulume?',
    answer: 'Edulume combines AI-powered automation with an intuitive learning experience. Our built-in AI builder creates courses, quizzes, and assignments in minutes. Features like advanced auto-grading, live chat, real-time notifications, and a gamified rewards system make teaching effortless and learning engaging. With custom content, smart filters, and personalized themes, Edulume adapts to your needs making it more than just an LMS.'
  },
  {
    id: '2',
    question: 'How long does onboarding take?',
    answer: 'True to our FastestOnboarding.com promise, we typically onboard schools and institutes within 2 weeks. The exact timeline depends on the number of users, but our streamlined process ensures you\'re up and running quickly without compromising on quality setup and training.'
  },
  {
    id: '3',
    question: 'Can I import existing course content?',
    answer: 'Yes, you can import your existing course materials, so you don\'t have to start from scratch. Simply upload your content and seamlessly integrate it into your courses.'
  },
];

const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className=" bg-white">
      <main className="max-w-8xl mx-auto lg:min-h-[660px] px-4 sm:px-6 md:px-12 lg:px-[112px] py-12 sm:py-16 md:py-0 pt-0 lg:pt-[100px]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-20">
          
          <div className="flex flex-col items-start w-full lg:w-auto">
            <h1 className="flex flex-col gap-1 mb-4 sm:mb-5 md:mb-6">
              <span className="text-[#00000038] text-[36.38px]  lg:text-[44px] leading-[40px]  md:leading-[42px] lg:leading-[44px] tracking-[-0.03em] font-medium ">
                Frequently
              </span>
              <span className="text-[#000000] text-[32px] lg:text-[40px] leading-[40px] lg:leading-[44px] tracking-[-0.03em] font-medium ">
                asked questions
              </span>
            </h1>
            
            <Link
              href="/contact"
              className="
              hidden lg:flex
                group
                items-center
                justify-start
                overflow-hidden
                px-[18px]
                py-[5px]
                border
                hover:border-0
                border-[#EBEBEB]
                hover:border-[#F4F2F0]
                rounded-full
                text-[14px] sm:text-[15px] md:text-[16px]
                font-medium
                text-[#000000]
                hover:bg-[#F4F2F0]
                transition-all
                duration-140
                ease-out
                tracking-[0.0006em]
                leading-[20px] sm:leading-[22px] md:leading-[24px]
                active:scale-95
              "
              style={{ boxShadow: '0px 1px 2px 0px #0A0D1408' }}
            >
              <span className="whitespace-nowrap cursor-pointer">Get Started</span>
              
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
                  group-hover:opacity-100
                "
              >
                <ArrowRight size={13} weight="bold" className="size-[20px] shrink-0" />
              </div>
            </Link>
          </div>

          <div className="flex flex-col w-full lg:w-auto">
            {INITIAL_FAQS.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default FAQSection;

