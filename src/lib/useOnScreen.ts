import { useEffect, useState, RefObject } from 'react'

/**
 * True while the referenced element intersects the viewport (plus rootMargin).
 * Used to pause timers / infinite animations when a section is off-screen.
 */
export function useOnScreen<T extends Element>(ref: RefObject<T | null>, rootMargin = '100px'): boolean {
  const [onScreen, setOnScreen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setOnScreen(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return onScreen
}
