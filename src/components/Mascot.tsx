import { motion } from 'framer-motion';

interface MascotProps {
  size?: 'small' | 'medium' | 'large';
  animate?: boolean;
  className?: string;
}

export default function Mascot({ size = 'medium', animate = true, className = '' }: MascotProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      animate={animate ? { y: [0, -8, 0] } : undefined}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" role="img" aria-label="Marco the Map Mouse mascot">
        {/* Body */}
        <ellipse cx="50" cy="60" rx="25" ry="28" fill="#A8896C" />
        
        {/* Belly */}
        <ellipse cx="50" cy="65" rx="18" ry="20" fill="#D4C4A8" />
        
        {/* Head */}
        <circle cx="50" cy="35" r="22" fill="#A8896C" />
        
        {/* Ears */}
        <circle cx="32" cy="20" r="10" fill="#A8896C" />
        <circle cx="32" cy="20" r="6" fill="#E8B4A0" />
        <circle cx="68" cy="20" r="10" fill="#A8896C" />
        <circle cx="68" cy="20" r="6" fill="#E8B4A0" />
        
        {/* Eyes */}
        <circle cx="42" cy="32" r="5" fill="#3D2914" />
        <circle cx="58" cy="32" r="5" fill="#3D2914" />
        <circle cx="43" cy="30" r="2" fill="white" />
        <circle cx="59" cy="30" r="2" fill="white" />
        
        {/* Nose */}
        <ellipse cx="50" cy="40" rx="4" ry="3" fill="#E25822" />
        
        {/* Whiskers */}
        <line x1="30" y1="38" x2="42" y2="40" stroke="#3D2914" strokeWidth="1" />
        <line x1="30" y1="42" x2="42" y2="42" stroke="#3D2914" strokeWidth="1" />
        <line x1="70" y1="38" x2="58" y2="40" stroke="#3D2914" strokeWidth="1" />
        <line x1="70" y1="42" x2="58" y2="42" stroke="#3D2914" strokeWidth="1" />
        
        {/* Little explorer hat */}
        <path d="M30 25 L50 10 L70 25 Z" fill="#C4A052" />
        <rect x="35" y="25" width="30" height="4" fill="#C4A052" rx="2" />
        
        {/* Map scroll in hand */}
        <rect x="70" y="50" width="15" height="25" fill="#FDF6E8" rx="2" transform="rotate(15 77 62)" />
        <line x1="73" y1="55" x2="82" y2="52" stroke="#C17F59" strokeWidth="1" transform="rotate(15 77 62)" />
        <line x1="73" y1="60" x2="82" y2="57" stroke="#C17F59" strokeWidth="1" transform="rotate(15 77 62)" />
        <line x1="73" y1="65" x2="82" y2="62" stroke="#C17F59" strokeWidth="1" transform="rotate(15 77 62)" />
        
        {/* Smile */}
        <path d="M44 46 Q50 52 56 46" fill="none" stroke="#3D2914" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
