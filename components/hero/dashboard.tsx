import DashboardChatContainer from './DashboardChatContainer';

const EdulumeDashboard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto   relative font-sans">
      
      <div className="bg-[#FFFBF5] rounded-[12px] sm:rounded-[14px] md:rounded-[16px] lg:rounded-[18px] border border-[#EBD5C2] overflow-hidden h-[417px] sm:h-[617px] flex flex-col">
        <div className="h-10 sm:h-11 md:h-12 flex items-end px-2 sm:px-3 md:px-4 bg-[#FFFFFF] border-b border-[#EBD5C2] relative">
            
            <div className="flex gap-1.5 sm:gap-2  pb-[12px] md:pb-[10px] md:mb-3 mr-2 sm:mr-3 md:mr-4">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#FFFBF5] border border-[#EBD5C2]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#FFFBF5] border border-[#EBD5C2]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#FFFBF5] border border-[#EBD5C2]" />
            </div>

            {/* --- TAB START --- */}
            <div className="relative z-10 -mb-px bg-[#FFFBF5] border-t border-l border-r border-[#EBD5C2] rounded-t-[6px] sm:rounded-t-[7px] md:rounded-t-[8px] lg:rounded-t-[9px] px-2 sm:px-3 md:px-4 py-1.5 sm:py-1.5 md:py-2 flex items-center gap-2 sm:gap-2.5 md:gap-3 h-8 sm:h-8 md:h-9 self-end group">
                
                {/* Left Bottom Corner Curve (Ear) */}
                <svg className="absolute bottom-0 -left-2 sm:-left-2.5 md:-left-3 w-2.5 h-2.5 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Fill the corner gap */}
                    <path d="M12 0L12 12L0 12Q12 12 12 0Z" fill="#FFFBF5"/>
                    {/* Draw the curved border line */}
                    <path d="M0 12Q12 12 12 0" stroke="#EBD5C2" strokeWidth="1"/>
                </svg>

                {/* Right Bottom Corner Curve (Ear) */}
                <svg className="absolute bottom-0 -right-2 sm:-right-2.5 md:-right-3 w-2.5 h-2.5 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Fill the corner gap */}
                    <path d="M0 0L0 12L12 12Q0 12 0 0Z" fill="#FFFBF5"/>
                    {/* Draw the curved border line */}
                    <path d="M12 12Q0 12 0 0" stroke="#EBD5C2" strokeWidth="1"/>
                </svg>

                <img src="/favicon2.svg" alt="" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                <span className="text-xs sm:text-sm md:text-[15px] text-[#323232] font-medium leading-[14px] sm:leading-[15px] md:leading-[16px]">edulume.com</span>
            </div>
            {/* --- TAB END --- */}

            <div className="flex gap-2 sm:gap-3 md:gap-4 ml-auto mb-2 sm:mb-2.5 md:mb-3 text-gray-400">
                <img src="/bookmark.svg" alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                <img src="/filter.svg" alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
        </div>

        <div className="flex-1  pb-[18px] sm:pb-6 md:pb-8 lg:pb-12 flex flex-col relative bg-[#FFFBF5] overflow-hidden h-full">
          <DashboardChatContainer />
        </div>
      </div>
    </div>
  );
};

export default EdulumeDashboard;