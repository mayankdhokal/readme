'use client';

import { useState, useEffect, useRef } from "react";
import BlogGrid from "@/components/blog/page";
import CustomizationPage from "@/components/customisation";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import SubFeatures from "@/components/sub-feature";
import TestimonialsSection from "@/components/testimonials/page";
import FAQSection from '@/components/faq/page';
import Newsletter from "@/components/newsletter/page";
import Footer from "@/components/footer/page";
import CTAPage from "@/components/cta/page";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInTestimonials, setIsInTestimonials] = useState(false);
  const testimonialsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      if (testimonialsSectionRef.current) {
        const rect = testimonialsSectionRef.current.getBoundingClientRect();
        const navbarHeight = window.innerWidth >= 1024 ? 62 : 56;
        setIsInTestimonials(rect.top <= navbarHeight && rect.bottom > navbarHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar variant={isInTestimonials ? 'dark' : 'light'} isScrolled={isScrolled} />
      <div className="flex flex-col min-h-screen pb-[15px] md:pb-[64px] overflow-x-hidden ">
        <Hero />
        <Features />
        <SubFeatures />
        <CustomizationPage />
        <TestimonialsSection ref={testimonialsSectionRef} />
        <BlogGrid />
        <CTAPage />
        <FAQSection />
        <Newsletter />
        <div className="px-4 sm:px-6 md:px-8 lg:px-[65px]  ">
         <Footer />
        </div>
      </div>
    </>
  );
}
