import React from 'react';

interface OdooIconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function OdooIcon({ size = 'md', className = '' }: OdooIconProps) {
  const sizeClasses = {
    sm: 'w-12 h-8',
    md: 'w-16 h-10', 
    lg: 'w-20 h-12'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`${sizeClasses[size]} bg-[#31363F] rounded-lg flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} bg-[#1D1616] rounded-md flex items-center justify-center`}>
        <span className={`text-[#EEEEEE] font-bold ${textSizes[size]} tracking-wide`}>odoo</span>
      </div>
    </div>
  );
}
