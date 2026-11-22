import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { FooterLinkItem, siteConfig, SocialLinkItem } from '../data/siteConfig';

interface FooterProps {
  onOpenContact: (contextTitle?: string) => void;
}

const SocialIconSvg: React.FC<{ id: SocialLinkItem['id'] }> = ({ id }) => {
  switch (id) {
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'dribbble':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
        </svg>
      );
    case 'behance':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M9.7 11.4c.8-.4 1.3-1.1 1.3-2.1 0-1.8-1.3-2.8-3.4-2.8H2v11h5.8c2.4 0 3.8-1.1 3.8-3.2 0-1.4-.7-2.4-1.9-2.9ZM4.4 8.5h2.7c1 0 1.6.4 1.6 1.2s-.6 1.2-1.6 1.2H4.4V8.5Zm3 7H4.4v-2.7h3c1.1 0 1.8.5 1.8 1.4 0 .9-.7 1.3-1.8 1.3ZM19.9 7.5h-4.6V9h4.6V7.5Zm-2.2 2.4c-2.6 0-4.4 1.8-4.4 4.4s1.7 4.4 4.5 4.4c1.9 0 3.3-.9 4-2.4h-2c-.3.5-.9.9-1.9.9-1.2 0-2.1-.7-2.2-2h6.3c.1-.3.1-.7.1-1 0-2.6-1.7-4.3-4.4-4.3Zm-2.1 3.5c.2-1.1 1-1.9 2.1-1.9 1.1 0 1.9.7 2.1 1.9h-4.2Z" />
        </svg>
      );
  }
};

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: FooterLinkItem
  ) => {
    e.preventDefault();
    if (item.action === 'contact') {
      onOpenContact('Get in Touch');
      return;
    }
    if (item.action === 'resume') {
      onOpenContact('Request Resume');
      return;
    }
    if (item.action === 'process') {
      onOpenContact('Design Process & Inquiry');
      return;
    }
    const targetId = item.href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-white/[0.06] bg-[#0B0B0D] scroll-mt-16"
    >
      {/* 3-column balanced footer */}
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8 md:px-12 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 sm:gap-x-10 md:grid-cols-[1.35fr_0.75fr_1.15fr] md:gap-x-10 lg:grid-cols-[1.45fr_0.85fr_auto] lg:gap-x-20 items-start">
          {/* Column 1: Brand Introduction & Direct Contact */}
          <div className="flex flex-col">
            <div className="min-h-[32px] flex items-center mb-3.5">
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-block font-serif-brand text-[24px] font-bold leading-none tracking-tight text-[#E61C45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61C45] rounded-sm"
              >
                {siteConfig.brandName}
              </a>
            </div>

            <p className="text-[13.5px] leading-[1.6] text-zinc-400 max-w-[270px]">
              {siteConfig.designer.footerBio}
            </p>

            <div className="mt-4 space-y-2.5">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 text-[13.5px] text-zinc-300 hover:text-[#E61C45] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61C45] rounded-sm w-fit"
              >
                <Mail className="h-4 w-4 text-[#E61C45] shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </a>

              {siteConfig.contact.linkedinUrl.trim() ? (
                <a
                  href={siteConfig.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[13.5px] text-zinc-300 hover:text-[#E61C45] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61C45] rounded-sm w-fit"
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#E61C45] text-[#0B0B0D] text-[10px] font-bold leading-none shrink-0">
                    in
                  </span>
                  <span>{siteConfig.contact.linkedinDisplay}</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenContact('Connect on LinkedIn')}
                  className="flex items-center gap-2.5 text-[13.5px] text-zinc-300 hover:text-[#E61C45] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61C45] rounded-sm cursor-pointer"
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#E61C45] text-[#0B0B0D] text-[10px] font-bold leading-none shrink-0">
                    in
                  </span>
                  <span>{siteConfig.contact.linkedinDisplay}</span>
                </button>
              )}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col">
            <h3 className="min-h-[32px] flex items-center text-[16px] font-semibold text-white mb-3.5">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.footerNav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className="text-[13.5px] text-zinc-400 hover:text-[#E61C45] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61C45] rounded-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Let's work together CTA & Socials */}
          <div className="flex flex-col sm:col-span-2 md:col-span-1">
            <h3 className="min-h-[32px] flex items-center text-[18px] font-medium text-[#E61C45] mb-3.5">
              {siteConfig.contact.ctaTitle}
            </h3>
            <p className="text-[13.5px] leading-[1.55] text-[#C83757] max-w-[260px]">
              {siteConfig.contact.ctaSubtitle}
            </p>

            <div className="mt-4">
              <a
                href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent('Project Enquiry')}`}
                className="group inline-flex items-center gap-2.5 rounded-[4px] border border-[#E61C45] px-4 py-2 text-[13.5px] font-medium text-[#E61C45] transition-all duration-150 hover:bg-[#E61C45] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shrink-0"
              >
                <span>{siteConfig.contact.ctaButtonLabel}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Social Icons: dark minimal styling with subtle border & pink accent */}
            <div className="mt-4 flex items-center gap-3">
              {siteConfig.socialLinks.map((social) =>
                social.url.trim() ? (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E61C45]/35 bg-white/[0.03] text-[#E61C45] transition-colors duration-150 hover:border-[#E61C45] hover:bg-[#E61C45]/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61C45]"
                  >
                    <SocialIconSvg id={social.id} />
                  </a>
                ) : (
                  <span
                    key={social.id}
                    role="img"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E61C45]/30 bg-white/[0.03] text-[#E61C45] select-none"
                  >
                    <SocialIconSvg id={social.id} />
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
