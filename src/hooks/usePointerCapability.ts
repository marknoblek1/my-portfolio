import { useEffect, useState } from 'react';

interface PointerCapabilityState {
  canHover: boolean;
  isMobileViewport: boolean;
  prefersReducedMotion: boolean;
}

const PRIMARY_FINE_HOVER = '(hover: hover) and (pointer: fine)';
const ANY_FINE_HOVER = '(any-hover: hover) and (any-pointer: fine)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

const getInitialCanHover = (): boolean => {
  if (typeof window === 'undefined') return true;
  return (
    window.matchMedia(PRIMARY_FINE_HOVER).matches ||
    window.matchMedia(ANY_FINE_HOVER).matches
  );
};

const getInitialMobileViewport = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

const getInitialReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(REDUCED_MOTION).matches;
};

/**
 * Dynamically detects actual pointer & hover input capabilities using CSS
 * media queries (`(hover: hover) and (pointer: fine)`,
 * `(any-hover: hover) and (any-pointer: fine)`) and live PointerEvent signals,
 * without relying on screen width alone to determine hover availability.
 */
export const usePointerCapability = (): PointerCapabilityState => {
  const [canHover, setCanHover] = useState<boolean>(getInitialCanHover);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(
    getInitialMobileViewport
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    getInitialReducedMotion
  );

  useEffect(() => {
    const primaryFineQuery = window.matchMedia(PRIMARY_FINE_HOVER);
    const anyFineQuery = window.matchMedia(ANY_FINE_HOVER);
    const motionQuery = window.matchMedia(REDUCED_MOTION);

    let mousePointerActive = false;

    const recompute = () => {
      const hasFineHoverMedia =
        primaryFineQuery.matches || anyFineQuery.matches;
      const nextCanHover = hasFineHoverMedia || mousePointerActive;

      setCanHover(nextCanHover);
      setIsMobileViewport(window.innerWidth < 768);
      setPrefersReducedMotion(motionQuery.matches);
      document.documentElement.dataset.pointerHover = String(nextCanHover);
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

  return { canHover, isMobileViewport, prefersReducedMotion };
};
