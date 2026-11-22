import { useEffect, useState } from 'react';

interface PointerCapabilityState {
  canHover: boolean;
  prefersReducedMotion: boolean;
}

const PRIMARY_FINE_HOVER = '(hover: hover) and (pointer: fine)';
const ANY_FINE_HOVER = '(any-hover: hover) and (any-pointer: fine)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

const getInitialCanHover = (): boolean => {
  if (typeof window === 'undefined') return true;
  if (window.innerWidth < 768) return false;
  return (
    window.matchMedia(PRIMARY_FINE_HOVER).matches ||
    window.matchMedia(ANY_FINE_HOVER).matches
  );
};

const getInitialReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(REDUCED_MOTION).matches;
};

/**
 * Dynamically detects whether a hover-capable fine pointer (mouse or trackpad)
 * is available across desktop, tablet, and mobile viewports.
 * - Mobile (< 768px): always returns `canHover: false` to preserve mobile behaviour.
 * - Tablet (>= 768px): dynamically switches between touch mode and mouse/trackpad
 *   hover mode as peripherals are connected or disconnected.
 * - Desktop: stays hover-enabled when a fine pointer is present.
 */
export const usePointerCapability = (): PointerCapabilityState => {
  const [canHover, setCanHover] = useState<boolean>(getInitialCanHover);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    getInitialReducedMotion
  );

  useEffect(() => {
    const primaryFineQuery = window.matchMedia(PRIMARY_FINE_HOVER);
    const anyFineQuery = window.matchMedia(ANY_FINE_HOVER);
    const motionQuery = window.matchMedia(REDUCED_MOTION);

    let mousePointerActive = false;

    const recompute = () => {
      const isMobileViewport = window.innerWidth < 768;
      const hasFineHoverMedia =
        primaryFineQuery.matches || anyFineQuery.matches;

      setCanHover(!isMobileViewport && (hasFineHoverMedia || mousePointerActive));
      setPrefersReducedMotion(motionQuery.matches);
    };

    const handleMediaChange = () => {
      if (!primaryFineQuery.matches && !anyFineQuery.matches) {
        mousePointerActive = false;
      }
      recompute();
    };

    const handlePointerDetect = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && !mousePointerActive) {
        mousePointerActive = true;
        recompute();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' && mousePointerActive) {
        mousePointerActive = false;
        recompute();
      }
    };

    recompute();

    window.addEventListener('resize', recompute);
    window.addEventListener('pointermove', handlePointerDetect, { passive: true });
    window.addEventListener('pointerover', handlePointerDetect, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    primaryFineQuery.addEventListener('change', handleMediaChange);
    anyFineQuery.addEventListener('change', handleMediaChange);
    motionQuery.addEventListener('change', handleMediaChange);

    return () => {
      window.removeEventListener('resize', recompute);
      window.removeEventListener('pointermove', handlePointerDetect);
      window.removeEventListener('pointerover', handlePointerDetect);
      window.removeEventListener('pointerdown', handlePointerDown);
      primaryFineQuery.removeEventListener('change', handleMediaChange);
      anyFineQuery.removeEventListener('change', handleMediaChange);
      motionQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return { canHover, prefersReducedMotion };
};
