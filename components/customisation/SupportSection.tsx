'use client';

import React from 'react';
import { SectionCard, SectionHeading } from './shared';
import { ChatMockup } from './ChatMockup';

export const SupportSection = () => {
  return (
    <SectionCard className="group flex flex-col justify-between min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
      <SectionHeading 
        title="Real help. Anytime." 
        description="Connect with a real person, not an automated system. Our global support team is available 24/7 to help you whenever you need assistance."
      />
      <ChatMockup />
    </SectionCard>
  );
};

