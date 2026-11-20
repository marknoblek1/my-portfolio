export type ProjectTheme = 'emerald' | 'floating' | 'cobalt';

export interface ProjectShowcase {
  id: string;
  title: string;
  category: string;
  descriptionPrefix: string;
  descriptionHighlight: string;
  descriptionSuffix: string;
  imagePosition: 'left' | 'right';
  theme: ProjectTheme;
  /**
   * Replace with the path or URL to your actual project showcase image
   * (e.g. "/assets/projects/avoir-real-estate.png").
   * When empty, a structured placeholder composition is displayed.
   */
  imageSrc: string;
  imageAlt: string;
  /**
   * Add your external case study / live project URL here when ready
   * (e.g. "https://www.behance.net/gallery/...").
   * When empty, clicking "View Project" opens an in-page project overview modal.
   */
  externalUrl: string;
  placeholderScreens: {
    leftTitle: string;
    centerTitle: string;
    rightTitle: string;
    subtitle: string;
  };
  caseStudySummary: {
    role: string;
    platform: string;
    overview: string;
    deliverables: string[];
  };
}

export const projects: ProjectShowcase[] = [
  {
    id: 'avoir-real-estate',
    title: 'AVOIR',
    category: 'Mobile App',
    descriptionPrefix:
      'AVOIR is a mobile application for real estate and curated living, designed to help users browse, ',
    descriptionHighlight: 'book properties, and furnish modern living spaces.',
    descriptionSuffix: '',
    imagePosition: 'left',
    theme: 'emerald',
    imageSrc: '/assets/aistudio/Klusta_Image_b70eb793.png',
    imageAlt: 'Klusta real estate and accommodation mobile application showcase',
    externalUrl:
      'https://app.notion.com/p/Klusta-Case-Study-382db7a4601f80a48dbefcf4249a0ab7',
    placeholderScreens: {
      leftTitle: 'Welcome',
      centerTitle: 'Property Listing',
      rightTitle: 'Booking Summary',
      subtitle: 'Real Estate & Furniture Showcase',
    },
    caseStudySummary: {
      role: 'Lead Product Designer',
      platform: 'iOS & Android Mobile App',
      overview:
        'An end-to-end real estate discovery, stay reservation, and interior furnishing experience unifying property booking with curated furniture placement.',
      deliverables: [
        'User Flows & Information Architecture',
        'Mobile Booking & Checkout UI',
        'Design System & Component Library',
      ],
    },
  },
  {
    id: 'avoir-commerce',
    title: 'AVOIR',
    category: 'Mobile App',
    descriptionPrefix:
      'AVOIR is a mobile application, typically for e-commerce, designed to help users browse, ',
    descriptionHighlight: 'visualize, and purchase home furnishings and decor.',
    descriptionSuffix: '',
    imagePosition: 'right',
    theme: 'floating',
    imageSrc: '/assets/aistudio/Avoir_Image_1cbbb54a.png',
    imageAlt: 'AVOIR furniture shopping mobile interface showcase',
    externalUrl:
      'https://app.notion.com/p/Avoir-Case-Study-3ebdb7a4601f80d3b355e4b224ed17a4',
    placeholderScreens: {
      leftTitle: 'Payment Methods',
      centerTitle: 'Storefront Home',
      rightTitle: 'Product Details',
      subtitle: 'Furniture Shopping Interface',
    },
    caseStudySummary: {
      role: 'Product Designer',
      platform: 'iOS Mobile Commerce App',
      overview:
        'A tactile furniture commerce experience crafted around visual discovery, spatial product previews, variant selection, and multi-rail checkout.',
      deliverables: [
        'Catalog & Category Navigation',
        'Product Detail & Color Variant UI',
        'Multi-Payment Checkout Flow',
      ],
    },
  },
  {
    id: 'onyx-wallet',
    title: 'ONYX',
    category: 'Mobile App',
    descriptionPrefix:
      'ONYX is a premium digital asset gateway designed to strip the ',
    descriptionHighlight:
      'complexity out of crypto and replace it with calm, surgical precision.',
    descriptionSuffix: '',
    imagePosition: 'left',
    theme: 'cobalt',
    imageSrc: '/assets/aistudio/Onyx_image_b7c95d57.png',
    imageAlt: 'ONYX cryptocurrency wallet mobile application showcase',
    externalUrl:
      'https://app.notion.com/p/Onyx-Case-Study-383db7a4601f80a28300eb3f98b235ff',
    placeholderScreens: {
      leftTitle: 'Asset Markets',
      centerTitle: 'Wallet Overview',
      rightTitle: 'Receive QR',
      subtitle: 'Cryptocurrency Wallet Application',
    },
    caseStudySummary: {
      role: 'Product Designer',
      platform: 'iOS & Android Fintech App',
      overview:
        'A high-clarity digital asset wallet transforming P2P transfers, instant swaps, and multi-network deposits into an intuitive everyday banking experience.',
      deliverables: [
        'Portfolio Dashboard & Balance Hierarchy',
        'Instant P2P & QR Receive Flows',
        'High-Contrast Dark & Light UI Modes',
      ],
    },
  },
];
