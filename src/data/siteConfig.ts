export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface FooterLinkItem {
  label: string;
  href: string;
  action?: 'scroll' | 'contact' | 'case-studies' | 'resume' | 'process';
}

export interface SocialLinkItem {
  id: 'x' | 'dribbble' | 'behance' | 'linkedin';
  label: string;
  /**
   * Add your live social profile URL here when ready (e.g. "https://x.com/yourhandle").
   * Leaving it empty opens the contact / profile modal instead of navigating to a dead link.
   */
  url: string;
}

export const siteConfig = {
  brandName: 'Denzel.',
  designer: {
    firstName: 'Mark',
    lastNamePrefix: 'N',
    lastNameAccent: 'o',
    lastNameSuffix: 'ble',
    role: 'Product Designer',
    heroBio:
      'I design intuitive digital products that solve real problems and create meaningful experiences for users.',
    footerBio:
      'Product Designer focused on creating intuitive, impactful and human-centered digital experiences.',
  },
  contact: {
    email: 'Marknoblek1@gmail.com',
    linkedinDisplay: 'Linkedin.com/mark-noble',
    /**
     * Add your full LinkedIn URL when ready (e.g. "https://www.linkedin.com/in/mark-noble").
     */
    linkedinUrl: '',
    ctaTitle: "Let's work together",
    ctaSubtitle:
      "Have a project in mind or you want to say hi ? I'd love to hear from you.",
    ctaButtonLabel: 'Get in Touch',
  },
  headerNav: [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'work', label: 'Work', href: '#work' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ] as NavItem[],
  footerNav: [
    { label: 'Work', href: '#work', action: 'scroll' },
    { label: 'About', href: '#about', action: 'scroll' },
    { label: 'Services', href: '#work', action: 'scroll' },
    { label: 'Contact', href: '#contact', action: 'contact' },
  ] as FooterLinkItem[],
  footerResources: [
    { label: 'Case Studies', href: '#work', action: 'scroll' },
    { label: 'Resume', href: '#contact', action: 'resume' },
    { label: 'Design Process', href: '#work', action: 'process' },
    { label: 'Contact', href: '#contact', action: 'contact' },
  ] as FooterLinkItem[],
  socialLinks: [
    { id: 'x', label: 'X (Twitter)', url: '' },
    { id: 'dribbble', label: 'Dribbble', url: '' },
    { id: 'behance', label: 'Behance', url: '' },
    { id: 'linkedin', label: 'LinkedIn', url: '' },
  ] as SocialLinkItem[],
};
