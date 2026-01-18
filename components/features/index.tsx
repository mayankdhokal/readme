import React from 'react';
import { FeatureCard } from './FeatureCard';
import {
  LumeIntelligenceMockup,
  PersonalizeMockup,
  AutogradingMockup,
  ContentManagementMockup,
  ProgressMockup,
  RoleManagementMockup,
  GamificationMockup,
  ReportsMockup,
} from './mockups';

export const Features: React.FC = () => {
  return (
    <main id="features" className="min-h-screen py-[148px]  lg:py-[148px] pb-[124px] lg:pb-0 px-[15px] sm:px-6 md:px-12 lg:px-[64px]">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <header className="mb-[56px] sm:mb-12 md:mb-16 text-center sm:text-left ">
          <span className="inline-block text-[14px] font-medium leading-[20px] tracking-[0.0028em] text-[#6D6C6B] mb-[12px] sm:mb-4">
            Edulume Features Suite
          </span>
          <h1 className="text-[36px] md:text-[42px] lg:text-[50px] font-medium leading-[36px] sm:leading-[40px] md:leading-[46px] lg:leading-[50px] tracking-[0em] text-[#000000] mb-[12px] sm:mb-5 md:mb-6 whitespace-nowrap ">
            Get to know Edulume
          </h1>
          <p className=" max-w-full sm:max-w-[530px] text-[15px] sm:text-[16px] md:text-[17px] text-[#6D6C6B] leading-[22px] font-medium sm:leading-[21px] mx-auto sm:mx-0 md:leading-[22px] tracking-[-0.003em]">
            Replace multiple tools with EDULUME, the only platform designed to make your learning management faster and smarter.
          </p>
        </header>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          <FeatureCard 
            title="Lume Intelligence" 
            description="Intelligence that drives outcomes."
          >
            <LumeIntelligenceMockup />
          </FeatureCard>

          <FeatureCard 
            title="Personalize Experience" 
            description="Let AI determine the right path."
            isHighlighted={true}
          >
            <PersonalizeMockup />
          </FeatureCard>

          <FeatureCard 
            title="Autograding" 
            description="Instant feedback, detailed diagnostics."
          >
            <AutogradingMockup />
          </FeatureCard>

          <FeatureCard 
            title="Content Management" 
            description="Create, organize, publish instantly."
          >
            <ContentManagementMockup />
          </FeatureCard>

          <FeatureCard 
            title="Progress" 
            description="Track growth, spot gaps early."
          >
            <ProgressMockup />
          </FeatureCard>

          <FeatureCard 
            title="Role Management" 
            description="Permissions designed for your workflow."
          >
            <RoleManagementMockup />
          </FeatureCard>

          <FeatureCard 
            title="Gamification" 
            description="Engagement through recognition."
          >
            <GamificationMockup />
          </FeatureCard>

          <FeatureCard 
            title="Reports" 
            description="Data transformed into actionable direction."
          >
            <ReportsMockup />
          </FeatureCard>
        </div>
      </div>
    </main>
  );
};

