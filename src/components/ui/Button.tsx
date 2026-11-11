import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'white' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  asLink?: boolean
  href?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  asLink = false,
  href,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-[12px] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 min-h-[44px] active:scale-[0.98]'

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }[size]

  const variantStyles = {
    primary:
      'bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-[0_8px_20px_-8px_rgba(109,40,217,0.6)] hover:shadow-[0_12px_24px_-8px_rgba(109,40,217,0.7)] border border-transparent',
    secondary:
      'bg-[#1E124A]/60 hover:bg-[#1E124A] text-white border border-white/10 hover:border-white/20',
    ghost:
      'bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-white/40',
    white:
      'bg-white text-[#3B1E78] hover:bg-slate-50 border border-transparent shadow-sm',
    outline:
      'bg-white text-[#0F172A] hover:bg-slate-50 border border-[#E2E8F0] hover:border-slate-300 text-slate-800',
  }[variant]

  const combinedClass = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`

  if (asLink && href) {
    return (
      <a href={href} className={combinedClass}>
        {children}
      </a>
    )
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  )
}

export default Button
