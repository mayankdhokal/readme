'use client';
import { Navbar } from "@/components/navbar";
import {  ArrowUp, Plus } from "lucide-react";
import Image from "next/image";
import { CaretLeftIcon as CaretLeft, CheckCircleIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/footer/page";

function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: '',
    orgName: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [emailError, setEmailError] = useState<string>('');

  // Pre-fill email from URL parameter
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      const decodedEmail = decodeURIComponent(emailParam);
      setFormData(prev => ({ ...prev, email: decodedEmail }));
    }
  }, [searchParams]);

  // Remove Inter font from body when component mounts
  useEffect(() => {
    // Create and inject a style element to override Inter font
    const styleId = 'contact-page-font-override';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = `
        body {
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif !important;
        }
      `;
      document.head.appendChild(styleElement);
    }
    
    return () => {
      // Remove the style element on unmount
      const element = document.getElementById(styleId);
      if (element) {
        element.remove();
      }
    };
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let filteredValue = value;
    
    // Filter input based on field type
    if (id === 'phone') {
      // Only allow numbers
      filteredValue = value.replace(/[^0-9]/g, '');
    } else if (id === 'fullName') {
      // Only allow letters, spaces, hyphens, and apostrophes
      filteredValue = value.replace(/[^a-zA-Z\s'-]/g, '');
    }
    
    setFormData(prev => ({ ...prev, [id]: filteredValue }));
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
    // Clear email error when user starts typing
    if (id === 'email' && emailError) {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate email before submission - only show error on submit
    if (!formData.email) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    setEmailError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Success
      setSubmitStatus({
        type: 'success',
        message: data.message || 'Thank you! We\'ll get back to you within 24-48 hours.',
      });
      
      // Reset form
      setFormData({
        fullName: '',
        orgName: '',
        phone: '',
        email: '',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col max-h-screen overflow-y-hidden relative  bg-white">
      <Navbar />
      
      <main className="grow w-full  max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[64px] py-[90px] sm:py-12 lg:pt-[132px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-12 lg:gap-24">
          {/* Left Column */}
          <div className="flex flex-col  min-h-0 sm:min-h-[400px] lg:min-h-[600px]">
            <div className="z-10 mb-[48px] sm:mb-6 lg:mb-0">
              <span className="text-[32px] sm:text-[40px] font-medium sm:font-normal lg:text-[50px] leading-[48px] sm:leading-[46px] lg:leading-[54px] tracking-[-0.04em] md:tracking-normal  sm:mb-[12px] text-[#171717]">
                See Lume in Action
              </span>
              <p className="text-[15px] sm:text-[17px] lg:text-[18px] leading-[20px] sm:leading-[23px] lg:leading-[24px] tracking-[-0.01em] sm:tracking-[-0.03em] text-[#8F8E8E] max-w-[510px]" style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}>
                Get a 30-minute live demo and discover the value of Edulume for your organization and explore our custom plans and pricing.
              </p>
            </div>
            
            {/* Bottom left image - using the requested contact.svg - Hidden on mobile */}
            <div className="hidden lg:block absolute min-w-[505px] min-h-[465px] -left-10 bottom-0 z-0 pointer-events-none ">
              <Image 
                src="/contact.svg" 
                alt="Contact illustration" 
                fill
                className="object-contain object-bottom-left"
                priority
              />

              {/* AI Prompt Box */}
              <div className="absolute top-[35%] left-[65%] z-30 bg-white p-2.5 rounded-[12px] border border-gray-100 max-w-[450px] w-auto pointer-events-auto" style={{ boxShadow: '0px 0px 15px 0px #00000008, 0px 2px 30px 0px #00000014' }}>
                <div className="w-full text-[16px] leading-[22px] text-[#000000B2] bg-transparent min-h-[32px] cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis mb-3 px-1">
                  create an advanced course on artificial intelligence
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-[#F1F1F0] p-0.5 rounded-[7px] gap-1">
                    <button className="flex items-center justify-center w-7 h-7 bg-white rounded-[5px] transition-colors" style={{ boxShadow: '0px 1px 2px 0px #0A0D1408' }}>
                      <Plus className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
                    </button>
                    <button className="flex items-center gap-1.5 px-1.5 pr-2 py-0.5 text-gray-600 hover:text-gray-800 transition-colors">
                      <img src="/filter.svg" alt="" className="w-4 h-4" onError={(e) => e.currentTarget.style.display = 'none'} />
                       <span className="font-normal tracking-[-0.0002em] text-[16px] leading-[22px] text-[#656565]">Modes</span>
                    </button>
                  </div>
                  <button className="flex items-center justify-center w-8 h-8 bg-[#D5D5D5] rounded-[7px] transition-colors">
                    <ArrowUp className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Chat Bubble */}
              <div className="absolute bottom-[12%] right-[10%] z-20 pointer-events-auto">
                {/* Background card */}
                <div className="absolute -top-3 sm:-top-[14px] md:-top-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-[85%] md:min-w-[340px] lg:min-w-[360px] max-w-[380px] h-[12px] sm:h-[14px] md:h-[16px] bg-[#C5C5C533] rounded-t-[12px] sm:rounded-t-[13px] md:rounded-t-[14px]"></div>
                
                <div className="bg-white rounded-[19px] min-w-[380px] p-[12px] relative z-10" style={{ boxShadow: '0px 0px 15px 0px #00000008, 0px 2px 30px 0px #00000014' }}>
                  
                  <div className="flex items-center text-[#000000] mb-6 space-x-2">
                    <button className="text-[#C5C5C5] hover:text-[#000000B2] transition-colors">
                      <CaretLeft className="w-[18px] h-[18px]" weight="bold" />
                    </button>
                    <span className="font-medium leading-[20px] tracking-[0.0004em] text-[16px]">Support</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <img src="/user.svg" alt="" className="w-6 h-6" />
                      <div className="bg-[#F4F2F0] text-[#000000B2] rounded-[12px] rounded-bl-[5px] px-[12px] py-[8px] text-[16px] leading-[20px] tracking-[0.0004em] ">
                        Good day Ben, how can I help?
                      </div>
                    </div>
                    
                    <div className="flex justify-center pl-20 -mt-2">
                       <span className="text-[12px] text-[#C5C5C5] leading-[18px] -tracking-[0.0003em] font-medium">5:03 PM</span>
                    </div>
                    
                     <div className="flex justify-end">
                      <div className="bg-[#F7F7F7] rounded-[12px] rounded-br-[5px] p-[12px] w-fit">
                        <div className="flex space-x-1 items-center h-2">
                          {[0, 1, 2].map((dot) => (
                            <motion.div
                              key={dot}
                              className="size-[9px] bg-[#C5C5C5] rounded-full"
                              animate={{
                                y: ["0%", "-50%", "0%"],
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: dot * 0.2
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Form or Success Message */}
          <div className="lg:pl-12 pt-0 sm:pt-6 lg:pt-4">
            {submitStatus.type === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[380px] mx-auto lg:mx-0 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] text-center"
              >
                <h2 className="text-[20px] sm:text-[24px] leading-[26px] sm:leading-[28px] tracking-[-0.003em] font-medium text-[#000000] mb-[10px]">
                  Thank you for contacting us!
                </h2>
                <p className="text-[16px] sm:text-[19px] leading-[24px] sm:leading-[28px] font-medium text-[#8F8E8E]">
                  We'll reach you out immediately!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-[18px] w-full max-w-[380px] mx-auto lg:mx-0">

                <div className="space-y-[5px]">
                  <label htmlFor="fullName" className="block text-[14px] font-semibold leading-[20px] tracking-[-0.003em] text-[#000000]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter..."
                    required
                    maxLength={50}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEBBE] text-[14px] leading-[20px] tracking-[-0.3px] text-[#171717] placeholder:text-[14px] placeholder:leading-[20px] placeholder:tracking-[-0.3px] placeholder-[#C9C9C9] focus:outline-none transition-colors shadow-[0px_1px_2px_0px_#0A0D1408] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-[5px]">
                  <label htmlFor="orgName" className="block text-[14px] font-semibold leading-[20px] tracking-[-0.003em] text-[#000000]">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="orgName"
                    value={formData.orgName}
                    onChange={handleChange}
                    placeholder="Enter..."
                    required
                    maxLength={100}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEBBE] text-[14px] leading-[20px] tracking-[-0.3px] text-[#171717] placeholder:text-[14px] placeholder:leading-[20px] placeholder:tracking-[-0.3px] placeholder-[#C9C9C9] focus:outline-none transition-colors shadow-[0px_1px_2px_0px_#0A0D1408] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-[5px]">
                  <label htmlFor="phone" className="block text-[14px] font-semibold leading-[20px] tracking-[-0.003em] text-[#000000]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter..."
                    required
                    maxLength={10}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEBBE] text-[14px] leading-[20px] tracking-[-0.3px] text-[#171717] placeholder:text-[14px] placeholder:leading-[20px] placeholder:tracking-[-0.3px] placeholder-[#C9C9C9] focus:outline-none transition-colors shadow-[0px_1px_2px_0px_#0A0D1408] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-[5px]">
                  <label htmlFor="email" className="block text-[14px] font-semibold leading-[20px] tracking-[-0.003em] text-[#000000]">
                    What is your Email?
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      maxLength={100}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-[10px] border  text-[14px] leading-[20px] tracking-[-0.3px] placeholder:text-[14px] placeholder:leading-[20px] placeholder:tracking-[-0.3px] ${
                        emailError 
                          ? 'border-[#EBEBEBBE] bg-[#FCF0F0] text-[#C9C9C9] placeholder-[#C9C9C9]' 
                          : 'border-[#EBEBEBBE] text-[#171717] placeholder-[#C9C9C9]'
                      } focus:outline-none transition-colors shadow-[0px_1px_2px_0px_#0A0D1408] disabled:opacity-50 disabled:cursor-not-allowed pr-10`}
                    />
                    {emailError && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 group">
                        <Image src="/info.svg" alt="Error" width={16} height={16} />
                        <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-[#171717] text-white text-sm rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                          {emailError}
                          <div className="absolute -top-1 right-4 w-2 h-2 bg-[#171717] rotate-45"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {emailError && (
                    <div 
                      className="text-[#DE0604]"
                      style={{
                        fontStyle: 'normal',
                        fontSize: '14px',
                        lineHeight: '20px',
                        letterSpacing: '-0.3px',
                      }}
                    >
                      Email is required
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#EBEBEB] hover:bg-[#4E4A4A] hover:text-[#FFFFFF]  text-[#7E7E7E] text-[14px] leading-[20px] tracking-[-0.003em] font-medium py-[13px] px-4 rounded-[10px] transition-all duration-200 ease-out cursor-pointer"
                  style={{ 
                    boxShadow: '0px 0px 4px 1px #0A0D1405 inset',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.boxShadow = '0px 0px 4px 1px #0A0D1405 inset';
                    }
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>

                <div className="flex flex-row items-center gap-3 sm:gap-6 mt-[4px] justify-center">
                  <div className="flex items-center gap-2 text-[#7E7E7E]">
                    <CheckCircleIcon className="w-5 h-5 text-[#7E7E7E]" />
                    <span className="text-[13px] leading-[20px] tracking-[0.02em] font-medium">No spam calls</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#7E7E7E]">
                    <CheckCircleIcon className="w-5 h-5 text-[#7E7E7E]" />
                    <span className="text-[13px] leading-[20px] tracking-[0.02em] font-medium">Your decision matters</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[64px] py-12 lg:py-16">
          
        </main>
      </div>
    }>
      <ContactForm />
      <div className=" block sm:hidden px-[15px]  pb-[50px]">
      <Footer />
      </div>
    </Suspense>
  );
}
