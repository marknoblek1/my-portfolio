import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { siteConfig } from '../data/siteConfig';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const workEl = document.getElementById('work');
      const contactEl = document.getElementById('contact');
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveId('contact');
      } else if (workEl && scrollPos >= workEl.offsetTop) {
        setActiveId('work');
      } else {
        setActiveId('about');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    e.preventDefault();
    setActiveId(id);
    setMobileOpen(false);
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#080809]/90 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-[1180px] items-center justify-between gap-8 px-6 sm:px-10">
        {/* Brand Wordmark */}
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, '#about', 'about')}
          className="font-serif-brand text-[24px] font-bold tracking-tight text-[#E61C45] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61C45] rounded-sm"
        >
          {siteConfig.brandName}
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-10"
        >
          {siteConfig.headerNav.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className={`font-satoshi text-[16px] font-light tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61C45] rounded-sm py-1 ${
                  isActive
                    ? 'text-[#E61C45]'
                    : 'text-zinc-200 hover:text-[#E61C45]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Button with smooth CSS Hamburger-to-X transition */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-zinc-200 hover:text-white hover:bg-white/[0.06] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61C45] cursor-pointer"
        >
          <span aria-hidden="true" className="relative block h-5 w-5">
            {/* Top line: rotates clockwise into X diagonal */}
            <span
              className={`absolute left-0 top-1/2 block h-[1.75px] w-5 origin-center rounded-full bg-current transition-transform duration-300 ease-in-out ${
                mobileOpen
                  ? '-translate-y-1/2 rotate-45'
                  : 'translate-y-[calc(-50%-5.5px)] rotate-0'
              }`}
            />
            {/* Middle line: fades out and scales down */}
            <span
              className={`absolute left-0 top-1/2 block h-[1.75px] w-5 -translate-y-1/2 origin-center rounded-full bg-current transition-all duration-300 ease-in-out ${
                mobileOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
              }`}
            />
            {/* Bottom line: rotates counterclockwise into X diagonal */}
            <span
              className={`absolute left-0 top-1/2 block h-[1.75px] w-5 origin-center rounded-full bg-current transition-transform duration-300 ease-in-out ${
                mobileOpen
                  ? '-translate-y-1/2 -rotate-45'
                  : 'translate-y-[calc(-50%+5.5px)] rotate-0'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Smooth Mobile Navigation Drawer (anchored below header, zero layout shift) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden absolute left-0 right-0 top-full border-t border-b border-white/[0.08] bg-[#0B0B0D]/98 backdrop-blur-lg px-6 py-5 shadow-2xl"
          >
            <div className="flex flex-col space-y-1">
              {siteConfig.headerNav.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                    className={`font-satoshi flex items-center min-h-[44px] px-2 text-[16px] font-light transition-colors rounded-md ${
                      isActive
                        ? 'text-[#E61C45]'
                        : 'text-zinc-200 hover:text-[#E61C45]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
