'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from '@phosphor-icons/react';
import EdulumeDashboard from './dashboard';
import Image from 'next/image';

const Hero = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const validateEmail = (value: string): boolean => {
    if (value.trim() === '') {
      setIsEmailInvalid(false);
      return false;
    }
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    setIsEmailInvalid(!isValid);
    return isValid;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Clear error state when user starts typing again
    if (isEmailInvalid) {
      setIsEmailInvalid(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 ">
      <main className="pt-[164px] sm:pt-[132px] md:pt-[132px] lg:pt-[132px] pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-[15px] sm:px-6 md:px-8 lg:px-4 flex flex-col items-center">
        
        <div className="max-w-4xl mx-auto text-center mb-[89px] md:mb-[140px]">
          <h1 className="text-[36px]  md:text-5xl lg:text-[60px] font-normal max-w-[400px] md:max-w-[500px] lg:max-w-full text-center text-slate-900 leading-[35px]  lg:leading-[52px] tracking-[0px] mb-[48px] sm:mb-6 md:mb-8" style={{ fontFamily: '"EB Garamond", serif' }}>
            AI platform that <span className="whitespace-nowrap block sm:inline"> transforms <br className="hidden sm:block" />
            how you learn</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[550px] mx-auto">
            <input 
              type="text" 
              placeholder="Email or Phone Number" 
              value={email}
              onChange={handleEmailChange}
              className={`w-full sm:w-auto md:w-[300px] cursor-pointer hover:placeholder:text-[#000000] flex-1 bg-[#F2F2F2] border-none rounded-[9px] px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 outline-none text-sm sm:text-base leading-[20px] sm:leading-[24px] tracking-[-0.3px] text-black font-medium placeholder:text-[#C9C9C9] placeholder:font-medium placeholder:text-sm sm:placeholder:text-[16px] placeholder:leading-[20px] sm:placeholder:leading-[24px] placeholder:tracking-[-0.3px] ${isEmailInvalid ? 'ring-2 ring-[#FF5C64]' : ''} placeholder:text-center sm:placeholder:text-left`}
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", "SF Pro Text", "SF Pro Display", system-ui, sans-serif'
              }}
            />
            
           
            <button 
              className="group relative flex items-center justify-center gap-2 bg-[#254F46] hover:bg-[#15352E] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-medium w-full sm:w-auto cursor-pointer transition-colors"
              onClick={() => {
                const trimmedEmail = email.trim();
                // Check if it looks like an email (contains @)
                if (trimmedEmail.includes('@')) {
                  const isValid = validateEmail(trimmedEmail);
                  if (isValid) {
                    // Navigate to contact page with email parameter
                    const emailParam = encodeURIComponent(trimmedEmail);
                    router.push(`/contact?email=${emailParam}`);
                  }
                } else {
                  // If it doesn't look like an email, just validate to show error
                  validateEmail(trimmedEmail);
                }
              }}
            >
              <span className='text-sm sm:text-[16px]'>Contact Sales</span>
              <Image src="/arrow.svg" alt="Arrow Right" className="hidden sm:block w-5 h-5 sm:w-6 sm:h-6" width={13} height={13} />
            </button>
          </div>
        </div>

        <div className="w-full max-w-8xl mx-auto  relative px-2 sm:px-4">
          <EdulumeDashboard />
        </div>
      </main>
    </div>
  );
};

export { Hero };
