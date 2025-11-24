'use client';

import { AIAgent } from '@/data/mockData';

interface AgentImageProps {
  agent: AIAgent | { avatar?: string; logo?: string; id: string; name: string };
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'tiny';
  borderColor?: string;
  style?: React.CSSProperties;
}

export default function AgentImage({ 
  agent, 
  className = '', 
  size = 'small', 
  borderColor,
  style = {}
}: AgentImageProps) {
  const sizeClasses = {
    tiny: 'w-6 h-6 md:w-8 md:h-8',
    small: 'w-12 h-12 md:w-16 md:h-16',
    medium: 'w-16 h-16 md:w-20 md:h-20',
    large: 'w-20 h-20 md:w-24 md:h-24'
  };

  // Determine the image source
  let imageSrc = '/llm-logo/agent_placeholder.png'; // Default fallback

  if ('avatar' in agent && agent.avatar) {
    // User agent
    imageSrc = `/llm-logo/${agent.avatar}`;
  } else if ('logo' in agent && agent.logo) {
    // System agent
    imageSrc = `/llm-logo/${agent.logo}`;
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/llm-logo/agent_placeholder.png';
  };

  const borderStyle = borderColor ? { border: `2px solid ${borderColor}`, ...style } : style;

  return (
    <img
      src={imageSrc}
      alt={agent.name}
      className={`${sizeClasses[size]} rounded-full mx-auto bg-white ${className}`}
      style={borderStyle}
      onError={handleImageError}
    />
  );
}