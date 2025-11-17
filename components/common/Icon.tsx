
import React from 'react';

interface IconProps {
  platform: string;
  className?: string;
}

const LeetCodeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M13.483 0a1.5 1.5 0 0 0-1.288.584L3.6 9.324a1.5 1.5 0 0 0-.212 1.95l8.595 12.162a1.5 1.5 0 0 0 2.576 0l8.595-12.162a1.5 1.5 0 0 0-.212-1.95L14.77.584A1.5 1.5 0 0 0 13.483 0zM11.6 15.867H6.556v2.133h9.888v-2.133h-5.056l4.889-6.867h-2.145z"></path>
    </svg>
)

const HackerRankIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 1024 1024" fill="currentColor" className={className}>
        <path d="M384 1024h256V0H384v1024zM0 640h256V384H0v256zm768 0h256V384H768v256z"></path>
    </svg>
)

const GenericIcon: React.FC<{className?: string}> = ({className}) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
    </svg>
)

export const YouTubeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
    </svg>
)

export const Icon: React.FC<IconProps> = ({ platform, className = 'w-6 h-6' }) => {
  if (typeof platform !== 'string' || !platform) {
    return <GenericIcon className={className + ' text-gray-500'} />;
  }
  
  const normalizedPlatform = platform.toLowerCase();

  if (normalizedPlatform.includes('leetcode')) {
    return <LeetCodeIcon className={className + ' text-yellow-500'}/>;
  }
  if (normalizedPlatform.includes('hackerrank')) {
    return <HackerRankIcon className={className + ' text-green-500'} />;
  }
  
  return <GenericIcon className={className + ' text-gray-500'} />;
};
