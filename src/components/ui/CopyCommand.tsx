import React, { useState, useRef, useEffect } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'

export interface CopyCommandProps {
  command?: string
  className?: string
  variant?: 'light' | 'dark'
}

export const CopyCommand: React.FC<CopyCommandProps> = ({
  command = 'npx launchpad deploy',
  className = '',
  variant = 'dark',
}) => {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleCopy = () => {
    navigator.clipboard?.writeText(command)
    setCopied(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const isDark = variant === 'dark'

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-[12px] font-mono text-sm border transition-all ${
        isDark
          ? 'bg-[#0F0C20] border-[#6D28D9]/40 text-slate-200'
          : 'bg-white border-[#E2E8F0] text-slate-800 shadow-xs'
      } ${className}`}
    >
      <div className="flex items-center gap-2 select-all">
        <Terminal className="w-4 h-4 text-[#22D3EE] shrink-0" strokeWidth={1.5} />
        <span className="text-[#6D28D9] font-bold select-none">$</span>
        <span className="font-semibold tracking-tight">{command}</span>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Command copied to clipboard' : 'Copy command to clipboard'}
        className={`p-2 rounded-lg transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] ${
          isDark
            ? 'hover:bg-white/10 text-slate-400 hover:text-white'
            : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
        }`}
      >
        {copied ? (
          <Check className="w-4 h-4 text-[#10B981]" strokeWidth={1.5} />
        ) : (
          <Copy className="w-4 h-4" strokeWidth={1.5} />
        )}
      </button>
    </div>
  )
}

export default CopyCommand
