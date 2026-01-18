import React, { useState, useEffect } from 'react';

interface ChatMessageProps {
  role: 'user' | 'ai';
  content: string;
  isVisible: boolean;
  shouldAnimate?: boolean;
  onTypingComplete?: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, isVisible, shouldAnimate = false, onTypingComplete }) => {
  const isUser = role === 'user';
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isVisible && shouldAnimate && !isUser) {
      // Only animate AI messages (left side)
      setDisplayedText("");
      setIsTyping(true);
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex < content.length) {
          setDisplayedText(content.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
          // Call the completion callback when typing finishes
          if (onTypingComplete) {
            onTypingComplete();
          }
        }
      }, 20); // Typing speed: 20ms per character

      return () => clearInterval(typingInterval);
    } else if (isVisible && !isUser && !shouldAnimate) {
      // AI message visible but animation not active - show full content
      setDisplayedText(content);
      setIsTyping(false);
    } else if (isVisible && isUser) {
      // User messages show immediately
      setDisplayedText(content);
      setIsTyping(false);
    } else if (!isVisible) {
      // Reset when not visible
      setDisplayedText("");
      setIsTyping(false);
    }
  }, [content, isVisible, shouldAnimate, isUser, onTypingComplete]);

  // For user messages or when not animating, show content directly
  // For AI messages with animation, show the typed text
  const displayContent = (isUser || !shouldAnimate) ? content : displayedText;
  
  return (
    <div 
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} ${isVisible ? 'fade-lift-active' : 'fade-lift-enter'}`}
    >
      <div 
        className={`max-w-[87%] font-medium font-sans px-[12px] py-[10px] text-[14px] sm:text-[15px] leading-[20px] tracking-[-0.006em] whitespace-pre-line
          ${isUser 
            ? 'bg-white rounded-[14px] rounded-br-[4px] text-[#1A1A1A] ' 
            : 'bg-white rounded-[14px] rounded-bl-[4px] text-[#1A1A1A] '
          }`}
        style={{
          boxShadow: '0px 0px 15px 0px #00000008',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {displayContent}
        {!isUser && shouldAnimate && isTyping && (
          <span className="inline-block w-[2px] h-[15px] bg-[#1A1A1A] ml-[2px] align-middle animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
