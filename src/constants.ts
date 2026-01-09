import { PageStatus } from './types';
import type { LandingPage, Campaign, RichMenu, Banner, FormTemplate } from './types';

export const MOCK_PAGES: LandingPage[] = [
  {
    id: '1',
    slug: 'summer-sale',
    tags: ['Promotion', 'Seasonal'],
    status: PageStatus.PUBLISHED,
    defaultLanguage: 'th',
    content: {
      th: {
        title: 'Summer Sale 2024',
        components: [
          { id: 'c1', type: 'hero', content: { title: 'Summer Sale', subtitle: 'Up to 50% Off' } },
          { id: 'c2', type: 'text', content: { text: 'Terms and conditions apply.' } }
        ]
      },
      en: {
        title: 'Summer Sale 2024 (EN)',
        components: []
      }
    },
    updatedAt: '2024-05-15T10:00:00Z',
    revisions: [
      { date: '2024-05-15T10:00:00Z', note: 'Final adjustments' },
      { date: '2024-05-10T09:30:00Z', note: 'Initial draft' }
    ]
  },
  {
    id: '2',
    slug: 'product-x100',
    tags: ['New Arrival', 'Tech'],
    status: PageStatus.DRAFT,
    defaultLanguage: 'th',
    content: {
      th: {
        title: 'Product Launch: X-100',
        components: []
      },
      en: {
        title: 'Product Launch: X-100 (EN)',
        components: []
      }
    },
    updatedAt: '2024-06-01T14:20:00Z',
    revisions: []
  },
  {
    id: '3',
    slug: 'webinar-reg',
    tags: ['Event', 'Education'],
    status: PageStatus.SCHEDULED,
    publishDate: '2024-07-01T09:00:00Z',
    defaultLanguage: 'th',
    content: {
      th: {
        title: 'Webinar Registration',
        components: []
      },
      en: {
        title: 'Webinar Registration',
        components: []
      }
    },
    updatedAt: '2024-06-10T11:00:00Z',
    revisions: []
  }
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_1',
    accountId: 'acc_demo',
    title: 'Developer Partner Management',
    status: 'Published',
    updatedAt: '2024-06-15T10:00:00Z',
    rewardType: 'ONLINE',
    expireType: 'NO_EXPIRE',
    codeType: 'UNIQUE_CODE',
    buttonText: 'Join Now',
    buttonLink: 'https://example.com',
    totalQuota: 1000,
    paragraphs: [],
    periods: []
  },
  {
    id: 'camp_2',
    accountId: 'acc_demo',
    title: 'New Year Special',
    status: 'Draft',
    updatedAt: '2024-12-01T09:30:00Z',
    rewardType: 'OFFLINE',
    expireType: 'EXPIRE_TIME',
    codeType: 'NO_CODE',
    buttonText: 'Get Coupon',
    buttonLink: '',
    totalQuota: 500,
    paragraphs: [],
    periods: []
  }
];

export const MOCK_RICH_MENUS: RichMenu[] = [
  {
    id: 'rm_1',
    accountId: 'acc_demo',
    name: 'Main Menu 2024',
    status: 'Published',
    updatedAt: '2024-01-10T09:00:00Z',
    size: 'Large',
    chatBarText: 'Open Menu',
    templateId: 'large_1',
    actions: {},
    image: ''
  }
];

export const MOCK_BANNERS: Banner[] = [
  {
    id: 'ban_1',
    accountId: 'acc_demo',
    name: 'Summer Promo Banner',
    status: 'Active',
    updatedAt: '2024-05-20T10:00:00Z',
    imageUrl: '',
    linkedCampaignId: 'camp_1'
  }
];

export const MOCK_FORMS: FormTemplate[] = [
  {
    id: 'form_1',
    name: 'Contact Us Form (Fixed)',
    description: 'General contact inquiry form',
    emailCategory: 'Support',
    status: 'Published',
    updatedAt: '2024-06-25T14:30:00Z',
    sections: []
  },
  {
    id: 'form_2',
    name: 'Event Registration',
    description: 'Sign up for upcoming webinars',
    emailCategory: 'Marketing',
    status: 'Draft',
    updatedAt: '2024-06-28T09:15:00Z',
    sections: []
  }
];

export const NAV_SECTIONS = [
  {
    title: "ANALYTICS",
    items: [
      { label: 'Dashboard', path: '/', icon: 'LayoutDashboard' }
    ]
  },
  {
    title: "CONTENT",
    items: [
      { label: 'Landing Pages', path: '/pages', icon: 'FileText' },
      { label: 'FAQ Manager', path: '/faq', icon: 'MessageCircle' },
      { label: 'Partners', path: '/partners', icon: 'Users' }
    ]
  },
  {
    title: "MARKETING",
    items: [
      {
        label: 'Campaigns',
        path: '/campaigns',
        icon: 'Trophy',
        children: [
          { label: 'All Campaigns', path: '/campaigns/list' },
          { label: 'Banners', path: '/campaigns/banners' }
        ]
      },
      { label: 'Rich Menu', path: '/campaigns/rich-menus', icon: 'LayoutGrid' }
    ]
  },
  {
    title: "ENGAGEMENT",
    items: [
      { label: 'Forms', path: '/forms', icon: 'FormInput' },
      { label: 'Email Templates', path: '/email-templates', icon: 'Mail' }
    ]
  },
  {
    title: "SYSTEM",
    items: [
      { label: 'Settings', path: '/settings', icon: 'Settings' }
    ]
  }
];
// --- Mock FAQ Data ---
export const MOCK_FAQS = [
  {
    id: 'faq-1',
    question: 'How do I reset my password?',
    answer: 'To reset your password, click on "Forgot Password" on the login page and follow the instructions sent to your email.',
    category: 'Account',
    order: 1,
    status: 'Published' as const,
    updatedAt: '2024-06-15T10:00:00Z'
  },
  {
    id: 'faq-2',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers.',
    category: 'Billing',
    order: 2,
    status: 'Published' as const,
    updatedAt: '2024-06-16T11:30:00Z'
  },
  {
    id: 'faq-3',
    question: 'How can I contact support?',
    answer: 'You can reach our support team via email at support@example.com or through the contact form in your dashboard.',
    category: 'General',
    order: 3,
    status: 'Published' as const,
    updatedAt: '2024-06-17T09:15:00Z'
  }
];

// --- Mock Partners Data ---
export const MOCK_PARTNERS = [
  {
    id: 'partner-1',
    name: 'TechCorp Solutions',
    description: 'Leading technology partner specializing in cloud infrastructure',
    logo: '',
    website: 'https://techcorp.example.com',
    contactEmail: 'contact@techcorp.example.com',
    status: 'Active' as const,
    featured: true,
    updatedAt: '2024-06-20T10:00:00Z'
  },
  {
    id: 'partner-2',
    name: 'Design Studio Pro',
    description: 'Creative design and branding agency',
    logo: '',
    website: 'https://designstudio.example.com',
    contactEmail: 'hello@designstudio.example.com',
    status: 'Active' as const,
    featured: false,
    updatedAt: '2024-06-21T14:30:00Z'
  }
];

// --- Mock Email Templates Data ---
export const MOCK_EMAIL_TEMPLATES = [
  {
    id: 'email-1',
    name: 'Welcome Email',
    subject: 'Welcome to {{company_name}}!',
    category: 'Transactional',
    htmlContent: '<h1>Welcome {{name}}!</h1><p>Thank you for joining us.</p>',
    variables: ['{{name}}', '{{company_name}}'],
    status: 'Active' as const,
    updatedAt: '2024-06-18T10:00:00Z'
  },
  {
    id: 'email-2',
    name: 'Password Reset',
    subject: 'Reset your password',
    category: 'Transactional',
    htmlContent: '<h1>Hi {{name}}</h1><p>Click here to reset: {{reset_link}}</p>',
    variables: ['{{name}}', '{{reset_link}}'],
    status: 'Active' as const,
    updatedAt: '2024-06-19T11:30:00Z'
  }
];
