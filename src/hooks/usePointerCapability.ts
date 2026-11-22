import { useEffect, useState } from 'react';

interface PointerCapabilityState {
  canHover: boolean;
  isMobileViewport: boolean;
  prefersReducedMotion: boolean;
}

const PRIMARY_FINE_HOVER = '(hover: hover) and (pointer: fine)';
const ANY_FINE_HOVER = '(any-hover: hover) and (any-pointer: fine)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const TOUCH_COMPAT_COOLDOWN_MS = 350;

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
 * Dynamically detects actual pointer & hover input capabilities across desktop,
 * tablet, and mobile viewports using:
 * 1. CSS media queries (`(hover: hover) and (pointer: fine)` and
 *    `(any-hover: hover) and (any-pointer: fine)`) with live `change` listeners.
 * 2. Capture-phase `PointerEvent` tracking (`pointerType === 'mouse'` vs `'touch'`)
 *    so hybrid tablets that report touch as primary can still activate hover
 *    when a real external mouse or trackpad is used, without letting ordinary
 *    touch taps trigger mouse mode.
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
    let lastTouchTimestamp = -Infinity;

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

    const handlePointerEvent = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        lastTouchTimestamp = performance.now();
        if (mousePointerActive) {
          mousePointerActive = false;
          recompute();
        }
        return;
      }

      if (e.pointerType === 'mouse') {
        // Ignore synthetic mouse-compatibility events immediately following a touch tap
        if (performance.now() - lastTouchTimestamp < TOUCH_COMPAT_COOLDOWN_MS) {
          return;
        }
        if (!mousePointerActive) {
          mousePointerActive = true;
          recompute();
        }
      }
    };

    recompute();

    window.addEventListener('resize', recompute);
    window.addEventListener('pointermove', handlePointerEvent, {
      capture: true,
      passive: true,
    });
    window.addEventListener('pointerover', handlePointerEvent, {
      capture: true,
      passive: true,
    });
    window.addEventListener('pointerdown', handlePointerEvent, {
      capture: true,
      passive: true,
    });
    window.addEventListener('pointerup', handlePointerEvent, {
      capture: true,
      passive: true,
    });
    primaryFineQuery.addEventListener('change', handleMediaChange);
    anyFineQuery.addEventListener('change', handleMediaChange);
    motionQuery.addEventListener('change', handleMediaChange);

    return () => {
      window.removeEventListener('resize', recompute);
      window.removeEventListener('pointermove', handlePointerEvent, {
        capture: true,
      });
      window.removeEventListener('pointerover', handlePointerEvent, {
        capture: true,
      });
      window.removeEventListener('pointerdown', handlePointerEvent, {
        capture: true,
      });
      window.removeEventListener('pointerup', handlePointerEvent, {
        capture: true,
      });
      primaryFineQuery.removeEventListener('change', handleMediaChange);
      anyFineQuery.removeEventListener('change', handleMediaChange);
      motionQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return { canHover, isMobileViewport, prefersReducedMotion };
};
