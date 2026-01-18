import { SectionCard, SectionHeading } from './shared';
import { RolePermissionsAccordion } from './RolePermissionsAccordion';

export const RoleManagementSection = () => {
  return (
    <div className="md:col-span-2"
    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" 
    }}
    >
      <SectionCard className="flex flex-col md:flex-row md:items-center md:justify-between  gap-6 sm:gap-8 md:gap-10 relative">
        <div className="md:w-1/2 md:pr-6 lg:pr-10  sm:py-12 md:py-20 lg:py-[116px]">
          <SectionHeading 
            title="Built for Your Organization" 
            description="Create roles that fit your organization perfectly. Set unique permissions for each position, from full admin control to specific educator access."
          />
        </div>
        <div className="w-full md:w-auto lg:pr-[104px] flex justify-center md:justify-end relative md:static">
          <RolePermissionsAccordion />
        </div>
      </SectionCard>
    </div>
  );
};

