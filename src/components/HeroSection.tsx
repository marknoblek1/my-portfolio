import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'motion/react';
import { siteConfig } from '../data/siteConfig';
import { usePointerCapability } from '../hooks/usePointerCapability';
import { RollingOrb } from './RollingOrb';

type MobileSequenceStep =
  | 'default-rest'
  | 'o-bounce-pink'
  | 'letters-pink'
  | 'inverted-rest'
  | 'o-bounce-white'
  | 'letters-white';

const charVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface PerCharTextProps {
  text: string;
  className?: string;
  stagger?: number;
}

const PerCharText: React.FC<PerCharTextProps> = ({
  text,
  className = '',
  stagger = 0.015,
}) => {
  const words = text.split(' ');

  return (
    <motion.p
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0,
          },
        },
      }}
    >
      {words.map((word, wordIdx) => (
        <React.Fragment key={`${word}-${wordIdx}`}>
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {Array.from(word).map((char, charIdx) => (
              <motion.span
                key={`${wordIdx}-${charIdx}`}
                variants={charVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wordIdx < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </motion.p>
  );
};

interface InteractiveLetterProps {
  char: string;
  isAccentO?: boolean;
  isLast?: boolean;
  isMobileOrTouch?: boolean;
  mobileStep?: MobileSequenceStep;
  prefersReducedMotion?: boolean;
}

const InteractiveHeroLetter: React.FC<InteractiveLetterProps> = ({
  char,
  isAccentO = false,
  isLast = false,
  isMobileOrTouch = false,
  mobileStep = 'default-rest',
  prefersReducedMotion = false,
}) => {
  const isBouncingStep =
    mobileStep === 'o-bounce-pink' || mobileStep === 'o-bounce-white';
  const isWhiteO =
    mobileStep === 'inverted-rest' ||
    mobileStep === 'o-bounce-white' ||
    mobileStep === 'letters-white';
  const isPinkLetters =
    mobileStep === 'letters-pink' ||
    mobileStep === 'inverted-rest' ||
    mobileStep === 'o-bounce-white';

  const getMobileOAnimation = () => ({
    color: isWhiteO ? '#FFFFFF' : '#E61C45',
    y: isBouncingStep && !prefersReducedMotion ? [0, -18, 0, -8, 0] : 0,
  });

  return (
    <motion.span
      aria-hidden="true"
      variants={charVariants}
      className={`inline-block ${isLast ? '' : 'mr-[-0.045em]'}`}
    >
      {isAccentO ? (
        <motion.span
          key={isMobileOrTouch ? 'o-auto' : 'o-hover'}
          className="inline-block text-[#E61C45] cursor-default"
          initial={{ color: '#E61C45', y: 0 }}
          animate={
            isMobileOrTouch
              ? getMobileOAnimation()
              : { color: '#E61C45', y: 0 }
          }
          transition={
            isMobileOrTouch
              ? isBouncingStep
                ? {
                    y: { duration: 0.7, ease: 'easeOut' },
                    color: { duration: 0.2 },
                  }
                : {
                    color: { duration: 0.6, ease: 'easeInOut' },
                    y: { duration: 0.2 },
                  }
              : { duration: 0.2, ease: 'easeOut' }
          }
          whileHover={
            !isMobileOrTouch
              ? {
                  color: '#FFFFFF',
                  y: [0, -24, 0, -10, 0],
                  transition: {
                    color: { duration: 0.18, ease: 'easeOut' },
                    y: { duration: 0.55, ease: 'easeOut' },
                  },
                }
              : undefined
          }
        >
          {char}
        </motion.span>
      ) : (
        <motion.span
          key={isMobileOrTouch ? 'char-auto' : 'char-hover'}
          className="inline-block text-white cursor-default"
          initial={{ color: '#FFFFFF' }}
          animate={
            isMobileOrTouch
              ? {
                  color: isPinkLetters ? '#E61C45' : '#FFFFFF',
                }
              : { color: '#FFFFFF' }
          }
          transition={
            isMobileOrTouch
              ? { duration: 0.6, ease: 'easeInOut' }
              : { duration: 0.2, ease: 'easeOut' }
          }
          whileHover={
            !isMobileOrTouch
              ? {
                  color: '#E61C45',
                  transition: { duration: 0.18, ease: 'easeOut' },
                }
              : undefined
          }
        >
          {char}
        </motion.span>
      )}
    </motion.span>
  );
};

export const HeroSection: React.FC = () => {
  const { designer } = siteConfig;
  const firstLineChars = Array.from(designer.firstName);
  const secondLineText = `${designer.lastNamePrefix}${designer.lastNameAccent}${designer.lastNameSuffix}`;
  const secondLineChars = Array.from(secondLineText);
  const accentIndex = designer.lastNamePrefix.length;

  const { canHover, prefersReducedMotion } = usePointerCapability();
  const isTouchOnlyMode = !canHover;
  const [mobileStep, setMobileStep] = useState<MobileSequenceStep>('default-rest');

  useEffect(() => {
    if (!isTouchOnlyMode || prefersReducedMotion) {
      setMobileStep('default-rest');
      return;
    }

    let cancelled = false;
    let timerId: number;

    const scheduleNext = (nextStep: MobileSequenceStep, delayMs: number) => {
      timerId = window.setTimeout(() => {
        if (cancelled) return;
        setMobileStep(nextStep);

        switch (nextStep) {
          case 'o-bounce-pink':
            scheduleNext('letters-pink', 800);
            break;
          case 'letters-pink':
            scheduleNext('inverted-rest', 950);
            break;
          case 'inverted-rest':
            scheduleNext('o-bounce-white', 9000);
            break;
          case 'o-bounce-white':
            scheduleNext('letters-white', 800);
            break;
          case 'letters-white':
            scheduleNext('default-rest', 950);
            break;
          case 'default-rest':
            scheduleNext('o-bounce-pink', 9000);
            break;
        }
      }, delayMs);
    };

    setMobileStep('default-rest');
    scheduleNext('o-bounce-pink', 9000);

    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
    };
  }, [isTouchOnlyMode, prefersReducedMotion]);

  return (
    <section id="about" className="relative z-10 w-full">
      {/* Right-edge 3D rolling crimson & black Orb #1 */}
      <RollingOrb
        duration={16}
        direction={1}
        phaseDelay={0}
        className="absolute right-4 sm:right-12 lg:right-20 -bottom-10 sm:-bottom-16 lg:-bottom-20 z-0"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 pt-10 pb-24 sm:pt-14 sm:pb-36 lg:pt-16 lg:pb-44">
        {/* Flat 2D decorative shapes around Mark Noble — visible across desktop, tablet & mobile */}
        {/* 1. Flat rounded rectangle: independent clockwise rotation + subtle vertical float */}
        <motion.img
          src="/assets/aistudio/Rectangle_367_1010c8ab.png"
          alt=""
          aria-hidden="true"
          animate={{ rotate: [0, 360], y: [0, -8, 0] }}
          transition={{
            rotate: { duration: 14, repeat: Infinity, ease: 'linear' },
            y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="pointer-events-none select-none absolute right-[15%] sm:right-[18%] lg:right-[19%] top-[8px] sm:top-[76px] lg:top-[155px] w-[22px] sm:w-[40px] lg:w-[55px] h-auto z-0 brightness-[2.1] contrast-[1.15]"
        />
        {/* 2. Flat concentric circles: independent counter-clockwise rotation + gentle pulse */}
        <motion.img
          src="/assets/aistudio/Group_1707478324_e26d13d5.png"
          alt=""
          aria-hidden="true"
          animate={{ rotate: [0, -360], scale: [1, 1.05, 1] }}
          transition={{
            rotate: { duration: 10.5, repeat: Infinity, ease: 'linear' },
            scale: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="pointer-events-none select-none absolute right-[3%] sm:right-[4%] lg:right-[6.5%] top-[4px] sm:top-[60px] lg:top-[110px] w-[40px] sm:w-[64px] lg:w-[83px] h-auto z-0 brightness-[2.1] contrast-[1.15]"
        />
        {/* 3. Flat oval / elongated capsule: independent clockwise rotation + subtle horizontal drift */}
        <motion.img
          src="/assets/aistudio/Rectangle_369_1010c8ab.png"
          alt=""
          aria-hidden="true"
          animate={{ rotate: [0, 360], x: [0, 7, 0, -5, 0] }}
          transition={{
            rotate: { duration: 16.5, repeat: Infinity, ease: 'linear' },
            x: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="pointer-events-none select-none absolute left-[3%] sm:left-auto sm:right-[6%] lg:right-[9%] top-[168px] sm:top-[220px] lg:top-[320px] w-[22px] sm:w-[40px] lg:w-[55px] h-auto z-0 brightness-[2.1] contrast-[1.15]"
        />
        {/* 4. Flat concentric circles: independent counter-clockwise rotation + gentle vertical sway */}
        <motion.img
          src="/assets/aistudio/Group_1707478319_25e925e1.png"
          alt=""
          aria-hidden="true"
          animate={{ rotate: [0, -360], y: [0, 7, 0] }}
          transition={{
            rotate: { duration: 11.5, repeat: Infinity, ease: 'linear' },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="pointer-events-none select-none absolute right-[4%] sm:right-[1.5%] lg:right-[3%] bottom-[64px] sm:bottom-auto sm:top-[265px] lg:top-[360px] w-[42px] sm:w-[64px] lg:w-[83px] h-auto z-0 brightness-[2.1] contrast-[1.15]"
        />

        <div className="relative z-10 mx-auto flex w-full flex-col items-center">
          {/* Oversized two-line display name: per-character reveal + independent letter hover */}
          <motion.h1
            aria-label={`${designer.firstName} ${secondLineText}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.035,
                  delayChildren: 0,
                },
              },
            }}
            className="font-sf-pro font-black text-white text-center leading-[0.86] select-none flex flex-col items-center"
          >
            <span className="block whitespace-nowrap text-[clamp(4.25rem,21vw,210px)] lg:text-[321.27px]">
              {firstLineChars.map((char, idx) => (
                <InteractiveHeroLetter
                  key={`first-${idx}`}
                  char={char}
                  isLast={idx === firstLineChars.length - 1}
                  isMobileOrTouch={isTouchOnlyMode}
                  mobileStep={mobileStep}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </span>
            <span className="block whitespace-nowrap text-[clamp(4.25rem,21vw,210px)] lg:text-[321.27px] mt-1 sm:mt-2">
              {secondLineChars.map((char, idx) => (
                <InteractiveHeroLetter
                  key={`second-${idx}`}
                  char={char}
                  isAccentO={idx === accentIndex}
                  isLast={idx === secondLineChars.length - 1}
                  isMobileOrTouch={isTouchOnlyMode}
                  mobileStep={mobileStep}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </span>
          </motion.h1>

          {/* Subtitle + short bio: stacked centered on mobile & tablet, side-by-side with 271px gap on desktop */}
          <div className="mt-7 sm:mt-10 mx-auto flex flex-col items-center text-center gap-5 lg:flex-row lg:items-start lg:justify-center lg:text-left lg:gap-[271px]">
            <PerCharText
              text={designer.role}
              stagger={0.022}
              className="font-satoshi text-[22px] font-medium text-white tracking-[-0.01em] whitespace-nowrap shrink-0"
            />
            <PerCharText
              text={designer.heroBio}
              stagger={0.008}
              className="font-satoshi text-[16px] font-light leading-[1.6] text-zinc-300 max-w-[300px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
