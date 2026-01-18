'use client';

import React from 'react';
import { SectionCard, SectionHeading } from './shared';
import { StudentReportCard } from './StudentReportCard';

export const ReportsSection = () => {
  return (
    <SectionCard className="flex flex-col justify-between min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
      <SectionHeading 
        title="Actionable Report. Ever Student." 
        description="Analyze student progress and recommends approvals while flagging items that need attention, so teams can act quickly and confidently."
      />
      <StudentReportCard />
    </SectionCard>
  );
};

