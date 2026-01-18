'use client';

import { RoleManagementSection } from './RoleManagementSection';
import { SupportSection } from './SupportSection';
import { ReportsSection } from './ReportsSection';

const CustomizationPage = () => {
  return (
    <div className="min-h-screen bg-white py-8 pb-[80px] sm:py-12 md:py-16 lg:pt-0  lg:pb-[128px] px-4 sm:px-6 md:px-12 lg:px-[64px] font-sans"
    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" 
    }}>
      <div className="max-w-8xl mx-auto">
        
        <h1 className="text-[30px] sm:text-[32px] md:text-[42px] lg:text-[50px] font-medium text-[#000000] text-center mb-8 sm:mb-12 md:mb-16 leading-[34px]  lg:leading-[50px] tracking-[0.0003em]">
          Customization that keeps you in control.
        </h1>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          
          
          <RoleManagementSection />

          
          <SupportSection />

          
          <ReportsSection />

        </div>
      </div>
    </div>
  );
};

export default CustomizationPage;
