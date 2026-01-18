"use client"

import React from 'react';
import FeatureCard from './FeatureCard';
import { FilmFrameShape, LeftRoundedCutoutShape, TopRoundedCutoutShape, RightBlockTwoArmsShape } from './Shapes';

interface BlogGridProps {
  isBlogPage?: boolean;
}

const BlogGrid: React.FC<BlogGridProps> = ({ isBlogPage = false }) => {
  const cardData = [
    {
      id: 1,
      Shape: FilmFrameShape,
      title: "Integrate and stay synced",
      description: "Seamlessly integrate with your accounting systems and consolidate your finance stack."
    },
    {
      id: 2,
      Shape: LeftRoundedCutoutShape,
      title: "Automate core workflows",
      description: "Design and implement custom automation that handles repetitive financial tasks with precision."
    },
    {
      id: 3,
      Shape: TopRoundedCutoutShape,
      title: "Unified data insights",
      description: "Get a clear, real-time picture of your organization's health with consolidated reporting tools."
    },
    {
      id: 4,
      Shape: RightBlockTwoArmsShape,
      title: "Secure by design",
      description: "Maintain the highest standards of financial security with built-in compliance and enterprise-grade encryption."
    }
  ];

  return (
    <main id={isBlogPage ? undefined : "blog"} className=" bg-white px-[4px] sm:px-6 md:px-12 lg:px-[64px]" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}>
      <div className="max-w-8xl mx-auto pt-[90px] sm:py-16 md:py-24 lg:py-[132px]">
        
        {isBlogPage ? (
          <div className="max-w-2xl px-[15px] md:px-0  flex flex-col items-start mb-8 sm:mb-12 md:mb-16 lg:mb-[56px]">
            <h1 className="text-[32px] md:text-[40px] lg:text-[46px] leading-[46px] md:leading-[44px] lg:leading-[46px]  text-left tracking-[-0.04em] sm:tracking-[0.001em] font-medium text-black mb-3 sm:mb-[22px]">
             Blogs
            </h1>
            <p className="text-[#8F8E8E]   text-[15px] sm:text-[15px] md:text-[20px] text-left leading-[20px] sm:leading-[21px] md:leading-[24px] tracking-[0.02em] min-w-[400px] md:max-w-[500px]">
              Stay informed with Edulume updates, ecosystem news and insights.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl flex flex-col items-center justify-center  mx-auto mb-8 sm:mb-12 md:mb-16 lg:mb-[64px]">
            <h1 
            className="text-[33px]  md:text-[40px] lg:text-[48px] leading-[36px] md:leading-[44px] lg:leading-[48px] text-center tracking-[0.02em] sm:tracking-[0.001em] font-medium text-black mb-[12px] sm:mb-4 ">
             For institutions, colleges, and organizations of all sizes.
            </h1>
            <p className="text-[#6D6C6B]  text-[15px] md:text-[16px] text-center leading-[22px] sm:leading-[21px] md:leading-[22px] tracking-[0.02em] md:tracking-[0.0002em] font-medium max-w-[350px] md:max-w-[450px] md:w-[450px]">
              Save time, reduce repetitive tasks, and create efficient learning experiences that scale with your needs.
            </p>
          </div>
        )}

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16 md:gap-y-20 lg:gap-y-24 blog-grid ">
          {cardData.map((card) => (
            <FeatureCard
              key={card.id}
              Shape={card.Shape}
              title={card.title}
              description={card.description}
              isFourthCard={card.id === 4}
              isThirdCard={card.id === 3}
            />
          ))}
        </div>

        {/* More Blogs Button - Only show on blog page */}
        {isBlogPage && (
          <div className="flex justify-center mt-12 sm:mt-16 md:mt-20 lg:mt-[64.4px]">
            <button className="bg-[#F4F2F0] text-black px-6 sm:px-8 md:px-[16px] md:py-[10px] py-3 sm:py-4 rounded-[8px] sm:rounded-[10px] md:rounded-[12px] text-[14px] sm:text-[15px] md:text-[17px] leading-[24px]  font-medium tracking-[0.02em] hover:bg-[#E5E5E5] transition-colors">
              More blogs coming soon..
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogGrid;
