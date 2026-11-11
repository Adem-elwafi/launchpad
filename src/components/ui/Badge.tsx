import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'pill' | 'subtle' | 'outline' | 'signal'
  className?: string
  icon?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'subtle',
  className = '',
  icon,
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 font-mono text-xs font-semibold rounded-[999px] transition-all'

  const variantStyles = {
    pill: 'px-3.5 py-1.5 bg-white text-[#3B1E78] border border-[rgba(139,92,246,0.35)] shadow-[0_0_0_4px_rgba(139,92,246,0.07),0_6px_20px_-8px_rgba(124,58,237,0.45)]',
    subtle: 'px-3 py-1 bg-[#6D28D9]/10 text-[#6D28D9] border border-[#6D28D9]/20',
    outline: 'px-2.5 py-0.5 bg-transparent text-slate-600 border border-slate-200',
    signal: 'px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200',
  }[variant]

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}

export default Badge
