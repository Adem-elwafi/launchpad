import { useSyncExternalStore } from 'react'

export type Breakpoint = 'desktop' | 'tablet' | 'mobile'

// Mirrors the CSS breakpoints in index.css: desktop >= 1025px, tablet 768-1024px, mobile < 768px.
const DESKTOP_QUERY = '(min-width: 1025px)'
const TABLET_QUERY = '(min-width: 768px)'

function subscribe(callback: () => void) {
  const desktop = window.matchMedia(DESKTOP_QUERY)
  const tablet = window.matchMedia(TABLET_QUERY)
  desktop.addEventListener('change', callback)
  tablet.addEventListener('change', callback)
  return () => {
    desktop.removeEventListener('change', callback)
    tablet.removeEventListener('change', callback)
  }
}

function getSnapshot(): Breakpoint {
  if (window.matchMedia(DESKTOP_QUERY).matches) return 'desktop'
  if (window.matchMedia(TABLET_QUERY).matches) return 'tablet'
  return 'mobile'
}

function getServerSnapshot(): Breakpoint {
  return 'desktop'
}

export function useBreakpoint(): Breakpoint {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
