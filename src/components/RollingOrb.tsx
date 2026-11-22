import React from 'react';
import { motion } from 'motion/react';

interface RollingOrbProps {
  className?: string;
  /**
   * Optional negative delay (in seconds) to offset the animation phase.
   */
  phaseDelay?: number;
  /**
   * Cycle duration in seconds so each orb rotates independently.
   */
  duration?: number;
  /**
   * Rotation and rolling direction (1 or -1) so the two orbs move independently.
   */
  direction?: 1 | -1;
}

/**
 * 3D crimson-and-black spherical orb with visible axial rotation,
 * physical rolling motion across the viewport, and a seamless morph
 * into a naturally tumbling oval / rounded-rectangle capsule.
 */
export const RollingOrb: React.FC<RollingOrbProps> = ({
  className = '',
  phaseDelay = 0,
  duration = 16,
  direction = 1,
}) => {
  // Seamless physics loop:
  // 0.00 -> 0.28 : 3D sphere rolls smoothly across
  // 0.28 -> 0.46 : Sphere smoothly transitions into oval/rounded capsule mid-roll
  // 0.46 -> 0.78 : Oval rolls end-over-end naturally (with vertical CoM bob)
  // 0.78 -> 1.00 : Smoothly returns to 3D sphere at starting position
  const times = [0, 0.14, 0.28, 0.46, 0.62, 0.78, 0.9, 1];

  const xKeyframes =
    direction === 1
      ? [20, -110, -240, -320, -180, -40, 10, 20]
      : [-260, -140, -20, 20, -100, -220, -270, -260];

  // Vertical center-of-mass lift while the elongated oval tumbles over its long axis
  const yKeyframes = [0, 0, 0, -6, -18, -6, 0, 0];

  // Outer silhouette rotation: stays upright while spherical, tumbles 360deg naturally as oval
  const shellRotateKeyframes =
    direction === 1
      ? [0, 0, 0, -90, -180, -270, -360, -360]
      : [0, 0, 0, 90, 180, 270, 360, 360];

  // Inner surface axial rotation: continuous 720deg spin so sphere axial roll is unmistakable
  const surfaceRotateKeyframes =
    direction === 1
      ? [0, -120, -240, -360, -480, -600, -690, -720]
      : [0, 120, 240, 360, 480, 600, 690, 720];

  // Counter-rotate the lighting overlay so the top-left 3D light source remains fixed
  const lightCounterRotateKeyframes = shellRotateKeyframes.map((deg) => -deg);

  // Morph smoothly between 168x168 sphere and 188x76 rounded-capsule oval
  const widthKeyframes = [168, 168, 168, 188, 188, 182, 168, 168];
  const heightKeyframes = [168, 168, 168, 78, 78, 96, 168, 168];
  const radiusKeyframes = [
    '84px',
    '84px',
    '84px',
    '39px',
    '39px',
    '48px',
    '84px',
    '84px',
  ];

  const loopTransition = {
    duration,
    delay: phaseDelay,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    times,
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Responsive scale wrapper keeps both orb size and rolling travel inside smaller viewports */}
      <div className="scale-[0.55] sm:scale-[0.82] lg:scale-100 origin-right">
        {/* Horizontal rolling track */}
        <motion.div
          animate={{ x: xKeyframes }}
          transition={loopTransition}
          className="relative flex items-center justify-center"
        >
        {/* Soft under-shadow & crimson atmospheric glow */}
        <motion.div
          animate={{
            scaleX: [1, 1, 1, 1.15, 0.85, 1.1, 1, 1],
            opacity: [0.65, 0.65, 0.65, 0.55, 0.45, 0.55, 0.65, 0.65],
          }}
          transition={loopTransition}
          className="absolute -bottom-5 h-7 w-40 rounded-full bg-black/80 blur-md"
        />
        <div className="absolute inset-[-36px] rounded-full bg-[radial-gradient(circle,rgba(230,28,69,0.20)_0%,rgba(120,10,35,0.08)_45%,transparent_72%)] blur-xl" />

        {/* Morphing & tumbling 3D orb body */}
        <motion.div
          animate={{
            y: yKeyframes,
            rotate: shellRotateKeyframes,
            width: widthKeyframes,
            height: heightKeyframes,
            borderRadius: radiusKeyframes,
          }}
          transition={loopTransition}
          style={{
            boxShadow:
              '0 22px 48px rgba(0, 0, 0, 0.78), 0 0 42px rgba(230, 28, 69, 0.16)',
          }}
          className="relative overflow-hidden bg-[#0A0406]"
        >
          {/* Layer 1: Rotating curved pink & black surface texture */}
          <motion.div
            animate={{ rotate: surfaceRotateKeyframes }}
            transition={{
              duration,
              delay: phaseDelay,
              repeat: Infinity,
              ease: 'linear',
              times,
            }}
            className="absolute inset-[-35%] flex items-center justify-center"
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                background:
                  'conic-gradient(from 25deg at 50% 50%, #E61C45 0deg, #9F1031 65deg, #17060B 135deg, #060304 205deg, #6E0A22 265deg, #F02652 320deg, #E61C45 360deg)',
              }}
            />
            {/* Curved organic surface contours to make axial rotation clearly readable */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full opacity-55 mix-blend-soft-light"
            >
              <path
                d="M20,105 C55,40 145,40 180,95 C145,155 55,155 20,105 Z"
                fill="rgba(255, 110, 145, 0.35)"
              />
              <path
                d="M35,55 C85,95 115,105 165,145"
                fill="none"
                stroke="rgba(0, 0, 0, 0.7)"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M40,150 C90,110 120,85 160,45"
                fill="none"
                stroke="rgba(255, 70, 112, 0.4)"
                strokeWidth="9"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Layer 2: Fixed 3D spherical lighting, soft specular highlight & depth terminator */}
          <motion.div
            animate={{ rotate: lightCounterRotateKeyframes }}
            transition={loopTransition}
            className="absolute inset-[-15%] pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 30% 28%, rgba(255, 210, 222, 0.42) 0%, rgba(255, 110, 145, 0.18) 20%, transparent 46%),
                radial-gradient(circle at 36% 34%, transparent 36%, rgba(10, 3, 6, 0.52) 68%, rgba(4, 1, 2, 0.92) 96%)
              `,
            }}
          />

          {/* Subtle rim highlight & inner volume shadow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit]"
            style={{
              boxShadow:
                'inset 8px 10px 24px rgba(255, 190, 208, 0.18), inset -12px -14px 30px rgba(0, 0, 0, 0.78)',
            }}
          />
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
