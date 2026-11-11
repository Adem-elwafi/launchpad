import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'glass' | 'dark'
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({
  variant = 'surface',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-[18px] transition-all duration-300'

  const variantStyles = {
    surface:
      'bg-white border border-[#EEF0F5] shadow-xs hover:border-[#6D28D9]/30 hover:shadow-md text-[#0F172A]',
    glass:
      'bg-white/80 backdrop-blur-md border border-[#E2E8F0] shadow-sm text-[#0F172A]',
    dark:
      'bg-[#0F0C20]/90 backdrop-blur-xl border border-[#6D28D9]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white',
  }[variant]

  return (
    <div className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card
