'use client';
import React from 'react';
import { Sun, Moon } from '@phosphor-icons/react';

// --- Sub-components ---
const ThemeToggle: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-[#F7F6F6] rounded-[36px] p-[2px] gap-1 shadow-inner border border-gray-100 group-[.in-view]:bg-[#373737] group-[.in-view]:border-[#373737] lg:group-hover:bg-[#373737] lg:group-hover:border-[#373737] transition-all" style={{ boxShadow: '0px 0px 2px 0px #00000008' }}>
      <div
        className="relative flex items-center justify-center px-[8px] py-[11px] rounded-[38px] transition-all duration-300 ease-out bg-white group-[.in-view]:bg-[#373737] lg:group-hover:bg-[#373737]"
      >
        <Sun className="w-5 h-5 text-[#181818] group-[.in-view]:text-white lg:group-hover:text-white transition-colors" weight="fill" />
      </div>
      <div
        className="relative flex items-center  justify-center px-[8px] py-[11px] rounded-[38px] transition-all duration-300 ease-out group-[.in-view]:bg-[#181818] lg:group-hover:bg-[#181818]"
      >
        <Moon className="w-5 h-5 text-[#181818] group-[.in-view]:text-white lg:group-hover:text-white transition-colors" weight="regular" />
      </div>
    </div>
  );
};

const AccountCard: React.FC = () => {
  return (
    <div className="group bg-white rounded-[18px] pl-[24px] w-[345px] max-w-lg h-[116px] py-[14px] flex items-center gap-6 border border-[#F0F0F0] ease-out  transition-all duration-200 group-[.in-view]:bg-[#181818] group-[.in-view]:border-[#373737] lg:group-hover:bg-[#181818] lg:group-hover:border-[#373737]"
    style={{ boxShadow: '0px 1px 0px 0px #0A0D1403' }}
    >
      {/* Vertical Toggle Section */}
      <ThemeToggle />

      {/* Account Info Section */}
      <div className="flex-1 bg-[#F7F6F6] rounded-4xl p-[16px]  flex items-center gap-4 border border-transparent transition-all group-[.in-view]:bg-[#373737] group-[.in-view]:border-[#373737] lg:group-hover:bg-[#373737] lg:group-hover:border-[#373737]">
        
          <img 
            src="/tomato.svg" 
            alt="Tomato Avatar" 
            className="w-[56px] h-[56px] object-contain "
          />
        <div className="flex flex-col">
          <h2 className="text-[17.34px] leading-[24px] font-semibold text-gray-900 group-[.in-view]:text-white lg:group-hover:text-white tracking-[0.003em] whitespace-nowrap transition-colors">Account</h2>
          <p className="text-[#898989] group-[.in-view]:text-[#B0B0B0] lg:group-hover:text-[#B0B0B0] text-[16.67px] leading-[24px] font-medium tracking-[0.003em] whitespace-nowrap transition-colors">Manage your Edulume</p>
        </div>
      </div>
    </div>
  );
};

export const PersonalizeMockup: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center  relative overflow-hidden group">
      <div 
        className="absolute inset-0 left-[64px] md:left-[28px] -top-[10px] w-[312px] h-[324px] bg-center bg-no-repeat transition-all duration-300 ease-in-out group-[.in-view]:-translate-x-2 group-[.in-view]:-translate-y-2 lg:group-hover:-translate-x-2 lg:group-hover:-translate-y-2"
        style={{
          backgroundImage: 'url(/dash.svg)',
        }}
      >
        <div 
          className="absolute inset-0  bg-center bg-no-repeat opacity-0 group-[.in-view]:opacity-60 lg:group-hover:opacity-60 transition-opacity duration-300"
          style={{
            backgroundImage: 'url(/dash-dark.svg)',
          }}
        />
      </div>
      {/* AccountCard positioned on top of the dash image */}
      <div className="absolute top-[180px] left-[96px] z-10">
        <AccountCard />
      </div>
    </div>
  );
};
