"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Success
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-8xl w-full mx-auto px-[15px] sm:px-6 md:px-12  lg:px-[112px] py-12 pb-[64px] sm:pb-auto sm:py-16 md:py-20 lg:py-20 lg:pt-0">
      <div className="flex flex-col lg:flex-row gap-[80px]  sm:gap-8 md:gap-10 lg:gap-[159px] lg:items-end lg:justify-between w-full">
        {/* Left Side: Content and Input */}
        <div className="flex flex-col w-full lg:max-w-8xl mx-auto  items-start ">
          <h2 className="text-[30px] leading-[36px] tracking-[0.0003em] font-medium text-[#000000] mb-4 sm:mb-5 md:mb-[22px]">
            Stay in the loop
          </h2>
          <p className="text-[#8F8E8E] text-[16px]  max-w-[593px] sm:max-w-[450px] md:max-w-[676px] leading-[20px] tracking-[0.006em]  mb-6 sm:mb-8 md:mb-[48px]">
            Join our newsletter and stay connected with the latest product updates, expert advice,
            to boost your productivity. Be the first to access exclusive content and tips that help you
            work smarter every day!
          </p>

          <form onSubmit={handleSubmit} className="relative flex items-center w-full lg:w-[398px] bg-[#F2F2F2] rounded-[12px] pr-[7px] ">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              maxLength={254}
              disabled={isSubmitting}
              className="grow bg-transparent cursor-pointer hover:placeholder:text-[#000000] border-none outline-none text-[16px] sm:text-[17px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[24px] tracking-[0.0002em] font-medium text-[#111827] placeholder:text-[#C9C9C9] disabled:opacity-50 disabled:cursor-not-allowed px-[15px] py-[13px]"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#303030] cursor-pointer my-[7px] hover:bg-[#000000] text-white px-3 sm:px-[10px] md:px-[12px] py-2 sm:py-[8px] md:py-[10px] rounded-[7px] sm:rounded-[8px] md:rounded-[9px] flex items-center gap-1.5 sm:gap-2  transition-all active:scale-95 whitespace-nowrap text-[18px] leading-[20px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2D2D2D]"
            >
              {isSubmitting ? 'Subscribing...' : 'Sign Up'}
              {!isSubmitting && <ArrowRight weight="bold" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFFFFF]" />}
            </button>

            <AnimatePresence>
              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-12 left-0 text-green-600 font-medium bg-green-50 px-4 py-2 rounded-lg text-sm sm:text-base"
                >
                  Thanks for subscribing! Check your inbox.
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-12 left-0 text-red-600 font-medium bg-red-50 px-4 py-2 rounded-lg text-sm sm:text-base"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Right Side: Legal Info */}
        <div className="flex flex-col text-[#8F8E8E] text-[14px] tracking-[0.006em] leading-[20px] ">
          <p className='flex flex-wrap gap-1 '>
            You agree to the{' '}
            <a href="#" className="text-[#000000] underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity">
              terms of service.
            </a>
          </p>
          <p className='sm:whitespace-nowrap'>
            You'll receive the latest updates and tips. <span className="text-[#000000] font-normal">Unsubscribe anytime.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
