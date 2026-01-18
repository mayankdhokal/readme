'use client';

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import BlogGrid from "@/components/blog/page";
import Newsletter from "@/components/newsletter/page";
import Footer from "@/components/footer/page";

export default function BlogPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar variant="light" isScrolled={isScrolled} />
      <div className="flex flex-col min-h-screen pb-[72px] overflow-x-hidden">
        <BlogGrid isBlogPage={true} />
        <Newsletter />
        <div className="px-4 sm:px-6 md:px-8 lg:px-[65px]">
          <Footer />
        </div>
      </div>
    </>
  );
}
