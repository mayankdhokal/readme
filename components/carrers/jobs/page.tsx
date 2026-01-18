import React from 'react';

const jobCategories = [
  {
    category: "Engineer",
    roles: [
      { title: "Design Engineer", location: "San Francisco (On-site)" },
      { title: "Security Engineer", location: "San Francisco (On-site)" },
      { title: "Applied AI Engineer", location: "San Francisco (On-site)" },
      { title: "Product Engineer", location: "San Francisco (On-site)" },
    ]
  },
  {
    category: "Product & Design",
    roles: [
      { title: "Product Designer", location: "San Francisco (On-site)" },
      { title: "Product Manager", location: "San Francisco (On-site)" },
    ]
  },
  {
    category: "GTM",
    roles: [
      { title: "Growth Marketing Manager", location: "San Francisco (On-site)" },
    ]
  },
  {
    category: "Recruiting",
    roles: [
      { title: "Founding Recruiter", location: "San Francisco (On-site)" },
    ]
  }
];

const CareersJobs = () => {
  return (
    <div className="w-full max-w-8xl mx-auto px-4 sm:px-[64px] py-12 sm:py-16 md:py-20 lg:py-[120px] lg:pb-[134px]">
      <h2 
        className="text-3xl sm:text-4xl md:text-[48px] leading-[1.1] sm:leading-[1.2] md:leading-[52px] tracking-[0px] mb-8 sm:mb-12 md:mb-16 lg:mb-[74px] text-black"
        style={{ fontFamily: '"EB Garamond", serif' }}
      >
        Open Roles
      </h2>
      
      <div className="space-y-10 sm:space-y-12 md:space-y-14 lg:space-y-16">
        {jobCategories.map((section, index) => (
          <div key={index} className="space-y-4 sm:space-y-5 md:space-y-[20px]">
            <h3 
              className="text-2xl sm:text-3xl md:text-[40px] leading-[1.2] sm:leading-[1.3] md:leading-[52px] tracking-[0px] text-black"
              style={{ fontFamily: '"EB Garamond", serif' }}
            >
              {section.category}
            </h3>
            
            <div className="space-y-0">
              {section.roles.map((role, roleIndex) => (
                <div 
                  key={roleIndex} 
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-5 md:py-[24px] px-2 sm:px-[10px] border-b border-[#D2CECB] hover:border-black transition-colors duration-100 ease-out cursor-pointer group gap-2 sm:gap-0"
                >
                  <span className="text-base sm:text-[18px] leading-[22px] sm:leading-[24px] tracking-[-0.03em] text-black">
                    {role.title}
                  </span>
                  <span className="text-sm sm:text-[18px] leading-[20px] sm:leading-[24px] tracking-[-0.03em] text-black text-left sm:text-right">
                    {role.location}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareersJobs;

