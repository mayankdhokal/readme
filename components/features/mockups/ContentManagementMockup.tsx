'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FileText } from 'lucide-react';

export const ContentManagementMockup: React.FC = () => {
  const [status, setStatus] = useState<'none' | 'approved' | 'declined'>('none');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    
    if (status === 'approved' || status === 'declined') {
      timeoutRef.current = setTimeout(() => {
        setStatus('none');
      }, 3000);
    }

    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [status]);

  const handleApprove = () => {
    setStatus('approved');
  };

  const handleDecline = () => {
    setStatus('declined');
  };

  return (
    <div className="w-full h-full flex pl-4 flex-col justify-end px-4 gap-3 pb-2 -translate-y-6">
      {/* First Card - CourseList */}
      <div className="w-full max-w-sm flex flex-col gap-4">
        {/* Trigonometry Card */}
        <div className="flex items-center w-full max-w-[202px] gap-[14px] h-[56px] p-1.5 bg-white rounded-[11px]">
          <div className="flex items-center justify-center size-[46px] bg-[#FFE4DB] rounded-[5px]">
            <FileText className="size-[23px] text-[#DB5628]" strokeWidth={2.5} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[15.34px] font-medium text-black leading-[20px] tracking-[0.0002em] truncate">Trigonometry</h3>
            <p className="text-[#BCBCBC] font-medium text-[14px] leading-[20px] tracking-[0.0002em]">5hr 30mins</p>
          </div>
        </div>

        {/* Probability Card */}
        <div className="flex items-center w-full max-w-[202px] gap-[14px] h-[56px] p-1.5 bg-white rounded-[11px]">
          <div className="flex items-center justify-center size-[46px] bg-[#E8F1FF] rounded-[5px]">
            <FileText className="size-[23px] text-[#4B7BE5]" strokeWidth={2.5} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[15.34px] font-medium text-black leading-[20px] tracking-[0.0002em] truncate">Probability</h3>
            <p className="text-[#BCBCBC] font-medium text-[14px] leading-[20px] tracking-[0.0002em]">2hr 45mins</p>
          </div>
        </div>
      </div>

      {/* Second Card - RequestCard */}
      <div className="w-full max-w-[240px] translate-x-[90px] md:translate-x-6 translate-y-4 bg-white p-3 rounded-[11px]">
        {/* Header Item */}
        <div className="flex items-center gap-[14px] mb-4">
          <div className="flex items-center justify-center size-[46px] bg-[#DCCFDA] rounded-[5px]">
            <FileText className="size-[23px] text-[#674162]" strokeWidth={2.5} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[17px] font-medium text-black leading-[20px] tracking-[0.0002em] truncate">Organic Chemistry</h3>
            <p className="text-[#BCBCBC] font-medium text-[15px] leading-[20px] tracking-[0.0002em]">3hr</p>
          </div>
        </div>

        {/* Request Text */}
        <div className="mb-4">
          <p className="text-[16px] font-medium text-black leading-[20px] tracking-[0.0002em]">Collean requested:</p>
        </div>

        {/* Action Buttons */}
        <div 
          className="grid overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            gridTemplateColumns: status === 'approved' 
              ? '1fr 0fr' 
              : status === 'declined' 
              ? '0fr 1fr' 
              : '1fr 1fr',
            gap: status === 'none' ? '12px' : '0px'
          }}
        >
          {/* Approve Button */}
          <button
            onClick={handleApprove}
            className={`py-2 rounded-[11px] cursor-pointer text-[14px] font-medium leading-[20px] tracking-[0.0002em] text-center transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
              status === 'approved'
                ? 'bg-[#F5F5F5] text-[#229273]'
                : status === 'declined'
                ? 'opacity-0 pointer-events-none'
                : 'bg-[#DCCFDA] text-[#674162] hover:bg-[#BDADBA] hover:text-[#674162]'
            }`}
          >
            {status === 'approved' ? 'Approved' : 'Approve'}
          </button>
          
          {/* Decline Button */}
          <button
            onClick={handleDecline}
            className={`py-2 rounded-[11px] cursor-pointer text-[14px] font-medium leading-[20px] tracking-[0.0002em] text-center transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
              status === 'declined'
                ? 'bg-[#F5F5F5] text-[#C54C41]'
                : status === 'approved'
                ? 'opacity-0 pointer-events-none'
                : 'bg-[#F5F5F5] text-[#57534D] hover:bg-[#EBEBEB]'
            }`}
          >
            {status === 'declined' ? 'Declined' : 'Decline'}
          </button>
        </div>
      </div>
    </div>
  );
};


