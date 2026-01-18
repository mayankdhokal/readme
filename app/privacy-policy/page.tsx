'use client';

import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";

export default function PrivacyPolicy() {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current) {
        const heroBottom = heroSectionRef.current.offsetTop + heroSectionRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        // Navbar height: 56px on mobile, 62px on desktop
        const navbarHeight = window.innerWidth >= 1024 ? 62 : 56;
        // Switch to light when white content reaches the bottom of navbar
        setIsScrolledPastHero(scrollPosition >= heroBottom - navbarHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Recalculate on resize
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: "'SF Compact Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}>
      <Navbar variant={isScrolledPastHero ? 'light' : 'dark'} />
      
      {/* Header Section */}
      <div ref={heroSectionRef} className="bg-[#1A1919] text-white  px-4 sm:px-6 lg:px-[264px]">
        <div className=" relative min-h-[200px] flex flex-col justify-center pt-[132px] pb-[168px]">
          <h1 className="text-[40px] sm:text-[50px] font-normal leading-[54px] mb-[16px]">
            Privacy Policy
          </h1>
          <a href="mailto:support@edulume.com" className="text-[#5683D2] text-[16.34px] leading-[24px] ">
            support@edulume.com
          </a>
          
          <div className=" sm:absolute sm:bottom-[11px] sm:right-0 text-[#5C5C5C] text-[16.34px] leading-[24px] tracking-[-0.003em]">
            Last modified: 09 January, 2026
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="grow w-full leading-none mx-auto px-4 sm:px-6 lg:px-[264px]  py-12 lg:py-[24px] lg:pb-[114px] text-[#000000]">
        <div className="space-y-6">
          
          {/* Introduction */}
          <div className="prose prose-lg max-w-none">
            <p className="text-[16.34px] leading-none  tracking-[-0.003em] font-medium">
              This Privacy Policy (the "Policy") explains how Edulume Inc. ("Edulume", "the Company", "we", "us" or "our") collects, uses, and shares data in connection with the Edulume web app (app.edulume.com), <a href="https://www.edulume.com" className="underline">www.edulume.com</a> website and all of our other properties, products, and services (the "Services"). Your use of the Services is subject to this Policy as well as our Terms of Service.
            </p>
          </div>

          {/* High Level Summary */}
          <section className="space-y-4">
            <h2 className="text-[16.34px] tracking-[-0.003em] font-bold">High Level Summary</h2>
            <ul className="font-medium text-[16.34px] tracking-[-0.003em] ">
              Edulume Inc. is a company that operates <a href="https://edulume.com/" className="underline">https://edulume.com/</a> and provides AI-powered Learning Management System services.<br/>
              We collect personal data necessary to provide educational services, including name, email address, learning activity, and assessment data.<br/>
              We use your data to recommend content, provide analytics to educators, and help learners improve over time through AI-powered insights.<br/>
              We implement industry-standard security measures including encryption, session management, and regular security audits to keep your data safe.<br/>
              Your data is retained as long as you or your organization uses our Services. Organizations may retain data as long as they require. After account deletion, personal data is removed within 30 days.<br/>
              You have full control over your data with rights to access, export, correct, and delete your information at any time.<br/>
              Any material changes to privacy will be reflected in an updated privacy policy.<br/>
            </ul>
          </section>

          {/* Data We Collect */}
          <section className="space-y-6">
            <h2 className="text-[16.34px] tracking-[-0.003em] font-bold">Data We Collect</h2>
            
            <div className="space-y-3">
              <div className="pl-0 ">
              <h3 className="text-[16.34px] tracking-[-0.003em] font-medium">Personal Information You Provide</h3>
                <p className="font-medium text-[16.34px] tracking-[-0.003em]">Account Information</p>
                <ul className="list-disc pl-5 font-medium text-[16.34px] tracking-[-0.003em] ">
                  <li>Name, email address, password (encrypted)</li>
                  <li>Username, profile photo or avatar</li>
                  <li>Preferred language and theme settings</li>
                </ul>
              </div>

              <div className="pl-0  mt-4">
                <p className="font-medium text-[16.34px] tracking-[-0.003em]">Educational Profile</p>
                <ul className="list-disc pl-5 font-medium text-[16.34px] tracking-[-0.003em] ">
                  <li>School, institution, or company name</li>
                  <li>Student or employee ID</li>
                  <li>Role (student, educator, administrator)</li>
                  <li>Grade level or department</li>
                </ul>
              </div>
              <p className="font-medium text-[16.34px] tracking-[-0.003em]">Information Collected Through Platform Use</p>
            </div>

            <div className="">
              <h3 className="text-[16.34px] tracking-[-0.003em] font-medium">Learning Data</h3>
              <ul className="list-disc pl-5 font-medium text-[16.34px] tracking-[-0.003em] ">
                <li>Course enrollments and progress</li>
                <li>Content viewed and time spent</li>
                <li>Assignment submissions and responses</li>
                <li>Quiz and test results</li>
                <li>Grades and completion status</li>
                <li>Learning patterns and pace</li>
              </ul>
            </div>

            <div className="">
              <h3 className="text-[16.34px] tracking-[-0.003em] font-medium">Interaction Data</h3>
              <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>Login times and session duration</li>
                <li>Pages visited and features used</li>
                <li>Discussion forum posts</li>
                <li>Live chat messages</li>
                <li>Favorites and bookmarks</li>
                <li>Notification preferences</li>
              </ul>
            </div>

            <div className="">
              <h3 className="text-[16.34px] tracking-[-0.003em] font-medium">Device and Technical Information</h3>
              <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>IP address (for security)</li>
                <li>Browser type and version</li>
                <li>Session logs across devices</li>
              </ul>
            </div>

            <div className="">
              <h3 className="text-[16.34px] tracking-[-0.003em] font-medium">From Your Organization</h3>
              <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>Student or employee rosters</li>
                <li>Enrollment data and class assignments</li>
                <li>Access permissions</li>
              </ul>
            </div>

            <div className="">
              <h3 className="text-[16.34px] tracking-[-0.003em] font-medium">From Authentication Services</h3>
              <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>Basic profile information if you use single sign-on (SSO)</li>
              </ul>
            </div>
          </section>

          {/* How We Use Data */}
          <section className="space-y-6">
            <h2 className="text-[16.34px] tracking-[-0.003em] font-bold">How We Use Data</h2>
            
            <div className="">
              <h3 className="text-[16.34px] tracking-[-0.003em] font-medium">Providing Educational Services</h3>
              <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>Create and maintain your account</li>
                <li>Provide access to courses and content</li>
                <li>Track learning progress</li>
                <li>Auto-grade assignments, quizzes, and tests</li>
                <li>Generate certificates and credentials</li>
                <li>Enable communication features</li>
              </ul>
            </div>

            <div className="">
              <h3 className="text-[16.34px] tracking-[-0.003em] font-medium">AI-Powered Personalization</h3>
              <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>Recommend relevant content</li>
                <li>Analyze learning patterns</li>
                <li>Identify strengths and improvement areas</li>
                <li>Suggest optimal learning paths</li>
                <li>Tailor content difficulty to your level</li>
              </ul>
            </div>

            <div className="">
              <h3 className="text-[16.34px] tracking-[-0.003em] font-medium">Analytics and Insights</h3>
              <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>Provide progress reports to learners</li>
                <li>Give educators class analytics and engagement metrics</li>
                <li>Offer administrators institutional dashboards</li>
                <li>Track learning outcomes</li>
              </ul>
            </div>

            <div className="">
              <h3 className="text-[16.34px] tracking-[-0.003em] font-medium">Safety and Security</h3>
              <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>Protect against unauthorized access</li>
                <li>Detect and prevent fraud</li>
                <li>Monitor for suspicious activity</li>
                <li>Enforce our Terms of Service</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="space-y-4">
            <h2 className="text-[16.34px] tracking-[-0.003em] font-bold">Third-Party Cookies</h2>
            
            <div className="">
            <p className="text-[16.34px] ">We use cookies and similar technologies. You can control these through your browser settings.</p>
              <p className="font-medium text-[16.34px]">How to opt out:</p>
              <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>Block cookies in your browser settings</li>
                <li>Use privacy-focused browsers or extensions</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Links and Sites */}
          <section className="space-y-4">
            <h2 className="text-[16.34px] tracking-[-0.003em] font-bold">Third-Party Links and Sites</h2>
            <div>
            <p className="text-[16.34px] ">
              Our platform may link to third-party websites or services not controlled by Edulume (e.g., external resources, video platforms, payment processors).<br/>
              We are not responsible for third-party privacy practices. Please review their privacy policies before providing them with information.
            </p>
             {/* Security */}
            <section className="">
                <h2 className="text-[16.34px] tracking-[-0.003em] font-medium">Security</h2>
                <p className="text-[16.34px] ">We implement comprehensive security measures:</p>
                <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication systems</li>
                <li>Multi-device session management</li>
                <li>Regular security audits</li>
                <li>Access controls and monitoring</li>
                <li>99.9% uptime with automated backups</li>
                </ul>
                <p className="text-[16.34px]  font-medium">Your responsibility:</p>
                <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>Choose strong passwords</li>
                <li>Never share your login credentials</li>
                <li>Enable two-factor authentication if available</li>
                <li>Log out from shared devices</li>
                <li>Report suspicious activity to <a href="mailto:security@edulume.com" className=" hover:underline">security@edulume.com</a></li>
                </ul>
                <p className="text-[16.34px]">No system is completely secure. We will notify you promptly of any data breaches as required by law.</p>
            </section>
          </div>
          </section>

         

          {/* Data Retention */}
          <section className="space-y-4">
            <h2 className="text-[16.34px] tracking-[-0.003em] font-bold">Data Retention</h2>
            <div className="space-y-3 text-[16.34px] ">
              <p>Active Users: We retain your data as long as you use our Services.</p>
              <p>Organizational Control: If you're part of an organization, they determine retention policies and may keep data as long as needed for educational records, compliance, or institutional purposes.</p>
              <p>After Deletion: When you or your organization deletes an account, personal data is removed within 30 days. Anonymized data may be retained for analytics. Backup systems may hold data for up to 90 days.</p>
              <p>Legal Requirements: We may retain data longer if required by law or necessary for legal defense.</p>
            </div>
          </section>

           {/* Age Requirements */}
           <section className="space-y-4">
            <h2 className="text-[16.34px] tracking-[-0.003em] font-bold">Age Requirements</h2>
            <div>
            <p className="text-[16.34px] ">Edulume may be used by minors through educational institutions. We comply with COPPA and FERPA.</p>
            <ul className="list-disc pl-5 font-medium text-[16.34px] ">
              <li>Users must have parental or school consent</li>
              <li>We collect only data necessary for educational purposes</li>
              <li>We do not use children's data for advertising</li>
              <li>Parents can review, correct, or delete their child's data</li>
            </ul>
            <p className="text-[16.34px]  ">If you believe we collected information from a child without proper consent, contact us immediately at <a href="mailto:privacy@edulume.com" className=" hover:underline">privacy@edulume.com</a></p>
            </div>
          </section>

          {/* Additional Privacy Rights */}
          <section className="space-y-6">
            <h2 className="text-[16.34px] tracking-[-0.003em] font-bold">Additional Privacy Rights</h2>
            
            <div className="">
              <h3 className="text-[16.34px] tracking-[-0.003em] font-medium">California Residents (CCPA/CPRA)</h3>
              <p className="text-[16.34px] ">You have the right to:</p>
              <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>Know what personal information we collect and how we use it</li>
                <li>Access and receive a copy of your data</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of the "sale" of personal information (we do not sell data)</li>
                <li>Non-discrimination for exercising your rights</li>
              </ul>
              <p className="text-[16.34px] ">To exercise: Email <a href="mailto:privacy@edulume.com" className=" hover:underline">privacy@edulume.com</a> with "California Privacy Rights" in the subject line.</p>
              <div>
              <div className="">
              <h3 className="text-[16.34px] font-medium">European Union, UK, and Swiss Residents (GDPR)</h3>
              <p className="text-[16.34px] ">You have the right to:</p>
              <ul className="list-disc pl-5 font-medium text-[16.34px] ">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request erasure</li>
                <li>Restrict processing</li>
                <li>Data portability</li>
                <li>Object to processing</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
              <p className="text-[16.34px]  mt-2">Legal basis for processing: Contractual necessity, legitimate interests, legal obligations, and consent.</p>
              <p className="text-[16.34px] ">To exercise: Email <a href="mailto:privacy@edulume.com" className=" hover:underline">privacy@edulume.com</a></p>
            </div>

            <div className="">
              <h3 className="text-[16.34px] font-medium">Other State Residents</h3>
              <p className="text-[16.34px] ">If you reside in Virginia, Colorado, Connecticut, Utah, or other states with privacy laws, you may have similar rights. Contact us to learn more.</p>
            </div>
              </div>
            </div>

          </section>

          {/* Changes to this Policy */}
          <section className="space-y-4">
            <h2 className="text-[16.34px] font-bold">Changes to this Policy</h2>
            <div>
            <p className="text-[16.34px] ">We may update this Privacy Policy from time to time.<br/>We will notify you via:</p>
            <ul className="list-disc pl-5 font-medium text-[16.34px] ">
              <li>Email (if you provided an email address)</li>
              <li>Prominent notice on the platform</li>
              <li>Updated "Last Updated" date</li>
            </ul>
            <p className="text-[16.34px] ">Your continued use after changes indicates acceptance of the updated policy.</p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="space-y-4">
            <h2 className="text-[16.34px] font-bold">Contact Us</h2>
            <div>
            <p className="text-[16.34px] ">If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
            <div className="space-y-1 text-[16.34px] ">
              <p>General Privacy Inquiries: <a href="mailto:privacy@edulume.com" className=" hover:underline">privacy@edulume.com</a></p>
              <p>Data Protection Officer: <a href="mailto:dpo@edulume.com" className=" hover:underline">dpo@edulume.com</a></p>
              <p>Support: <a href="mailto:support@edulume.com" className=" hover:underline">support@edulume.com</a></p>
              <p>Security Issues: <a href="mailto:security@edulume.com" className=" hover:underline">security@edulume.com</a></p>
            </div>
            <p className="text-[16.34px]  ">We respond to privacy inquiries within 48 hours and provide substantive responses within 30 days.</p>
            </div>
          </section>

        </div>

        {/* Navigation Footer */}
        <div className="mt-20 pt-8 border-t border-[#F4F4F4]">
          <div className="flex justify-between items-center gap-[16px]">
            <Link href="/" className="group flex flex-col w-[438px] bg-[#FCFBFB] hover:bg-[#F7F6F6] hover:scale-[1.02] transition-transform duration-200 items-start gap-1 p-[18px]  rounded-[13px]">
              <span className="flex items-center gap-2 text-[16.34px] leading-[24px] tracking-[-0.02em] text-[#979797] group-hover:text-[#979797]">
                <CaretLeft className="w-4 h-4" />
                Previous
              </span>
              <span className="text-lg font-medium text-[#171717]">Home Page</span>
            </Link>

            <a
              href="mailto:privacy@edulume.com"
              className="group flex flex-col w-[438px] bg-[#FCFBFB] hover:bg-[#F7F6F6] hover:scale-[1.02] transition-transform duration-200 items-end gap-1 p-[18px] rounded-[13px]"
            >
              <span className="flex items-center gap-2 text-[16.34px] leading-[24px] tracking-[-0.02em] text-[#979797] group-hover:text-[#979797]">
                Next
                <CaretRight className="w-4 h-4" />
              </span>
              <span className="text-lg font-medium text-[#171717]">Contact Us</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
