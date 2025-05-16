import React from 'react';

interface MobileIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const MobileIcon: React.FC<MobileIconProps> = ({ width = 273, height = 273, className }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 273 273" fill="none" xmlns="http://www.w3.org/2000/svg">
      <image
        href="/uploads/3dicons/3dicons-mobile.png"
        width="160"
        height="160"
        x="56.5"
        y="56.5"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}

export { MobileIcon } 