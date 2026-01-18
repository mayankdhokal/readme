import Image from 'next/image';
import React from 'react';

const leaderboard = [
  { name: 'Aisha Patel', rank: 'Advanced', img: 'aisha.svg', badge: 'b1.svg' },
  { name: 'Shawn Hong', rank: 'Intermediate II', img: 'shawn.svg', badge: 'b2.svg' },
  { name: 'Sofia Martinez', rank: 'Beginner II', img: 'sofia.svg', badge: 'b3.svg' },
  { name: 'Daniel Wong', rank: 'Beginner', img: 'daniel.svg', badge: 'b4.svg' },
];

export const GamificationMockup: React.FC = () => (
  <div className="w-full h-full flex items-end px-8 sm:px-4 -translate-y-20 group">
    <div className="w-full bg-white  p-4 rounded-[17px] space-y-4">
      <p className="text-[12.5px] text-[#686868] leading-[10px] font-medium tracking-[-0.0001em]">Top Learners</p>
      {leaderboard.map((user, i) => (
        <div 
          key={i} 
          className="flex items-center gap-3 opacity-68 max-lg:group-[.in-view]:opacity-100 lg:hover:opacity-100 transition-opacity duration-200 ease-out"
        >
          <Image src={user.img} alt={user.name} className="w-8 h-8 rounded-full border border-[#E5E5E5]" width={32} height={32} />
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <p className="text-[14px] leading-[10px] tracking-[0.0001em] font-medium text-[#000000] truncate">{user.name}</p>
            <p className="text-[12px] leading-[10px] font-normal tracking-[-0.0001em] text-[#B2B2B2] truncate">{user.rank}</p>
          </div>
          <div className="flex gap-1 shrink-0">
            <img src={user.badge} alt="badge" className="w-auto h-auto" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

