import { PageStatus } from './types';
import type { LandingPage, Campaign, RichMenu, Banner, FormTemplate } from './types';

export const MOCK_PAGES: LandingPage[] = [
  {
    id: '1',
    slug: 'summer-sale-2024',
    tags: ['Promotion', 'Summer'],
    status: PageStatus.PUBLISHED,
    defaultLanguage: 'th',
    content: {
      th: {
        title: 'โปรโมชั่นต้อนรับลมร้อน 2024',
        components: [
          { id: 'c1', type: 'hero', content: { title: 'Summer Sale', subtitle: 'ลดสูงสุด 50%' } },
          { id: 'c2', type: 'text', content: { text: 'เงื่อนไขเป็นไปตามที่บริษัทกำหนด' } }
        ]
      },
      en: {
        title: 'Summer Sale 2024',
        components: [
          { id: 'c1_en', type: 'hero', content: { title: 'Summer Sale', subtitle: 'Up to 50% Off' } }
        ]
      }
    },
    updatedAt: '2024-05-15T10:00:00Z',
    revisions: [
      { date: '2024-05-15T10:00:00Z', note: 'Published' },
      { date: '2024-05-10T09:30:00Z', note: 'Initial Draft' }
    ]
  },
  {
    id: '2',
    slug: 'new-arrival-gadgets',
    tags: ['New', 'Tech'],
    status: PageStatus.DRAFT,
    defaultLanguage: 'th',
    content: {
      th: {
        title: 'เปิดตัวสินค้าใหม่ Gadget Pro X',
        components: []
      },
      en: {
        title: 'New Arrival: Gadget Pro X',
        components: []
      }
    },
    updatedAt: '2024-06-01T14:20:00Z',
    revisions: []
  },
  {
    id: '3',
    slug: 'exclusive-webinar',
    tags: ['Event', 'Webinar'],
    status: PageStatus.SCHEDULED,
    publishDate: '2024-07-01T09:00:00Z',
    defaultLanguage: 'th',
    content: {
      th: {
        title: 'ลงทะเบียนงานสัมมนาออนไลน์',
        components: []
      },
      en: {
        title: 'Exclusive Webinar Registration',
        components: []
      }
    },
    updatedAt: '2024-06-10T11:00:00Z',
    revisions: []
  },
  {
    id: '4',
    slug: 'member-privileges',
    tags: ['Member', 'Loyalty'],
    status: PageStatus.PUBLISHED,
    defaultLanguage: 'th',
    content: {
      th: {
        title: 'สิทธิพิเศษสำหรับสมาชิก',
        components: []
      },
      en: {
        title: 'Member Privileges',
        components: []
      }
    },
    updatedAt: '2024-04-20T08:00:00Z',
    revisions: []
  },
  {
    id: '5',
    slug: 'flash-sale-9-9',
    tags: ['Flash Sale', 'Promotion'],
    status: PageStatus.DRAFT,
    defaultLanguage: 'th',
    content: {
      th: {
        title: 'Flash Sale 9.9',
        components: []
      },
      en: {
        title: 'Flash Sale 9.9',
        components: []
      }
    },
    updatedAt: '2024-08-01T10:00:00Z',
    revisions: []
  }
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_1',
    accountId: 'acc_demo',
    title: 'ลงทะเบียนรับคูปองส่วนลด 100 บาท',
    status: 'Published',
    updatedAt: '2024-06-15T10:00:00Z',
    rewardType: 'ONLINE',
    expireType: 'NO_EXPIRE',
    codeType: 'UNIQUE_CODE',
    buttonText: 'รับคูปองเลย',
    buttonLink: 'https://example.com/coupon',
    totalQuota: 1000,
    paragraphs: [],
    periods: []
  },
  {
    id: 'camp_2',
    accountId: 'acc_demo',
    title: 'กิจกรรมลุ้นโชคปลายปี',
    status: 'Draft',
    updatedAt: '2024-12-01T09:30:00Z',
    rewardType: 'OFFLINE',
    expireType: 'EXPIRE_TIME',
    codeType: 'NO_CODE',
    buttonText: 'เข้าร่วมกิจกรรม',
    buttonLink: '',
    totalQuota: 500,
    paragraphs: [],
    periods: []
  },
  {
    id: 'camp_3',
    accountId: 'acc_demo',
    title: 'ตอบแบบสอบถามรับแต้มสะสม',
    status: 'Published',
    updatedAt: '2024-05-20T14:00:00Z',
    rewardType: 'ONLINE',
    expireType: 'EXPIRE_TIME',
    codeType: 'PUBLIC_CODE',
    buttonText: 'เริ่มทำแบบสอบถาม',
    buttonLink: 'https://example.com/survey',
    totalQuota: 5000,
    paragraphs: [],
    periods: []
  },
  {
    id: 'camp_4',
    accountId: 'acc_demo',
    title: 'สมาชิกใหม่ รับฟรีสินค้าทดลอง',
    status: 'Scheduled',
    updatedAt: '2024-07-01T08:00:00Z',
    rewardType: 'OFFLINE',
    expireType: 'NO_EXPIRE',
    codeType: 'UNIQUE_CODE',
    buttonText: 'ลงทะเบียนรับสิทธิ์',
    buttonLink: '',
    totalQuota: 200,
    paragraphs: [],
    periods: []
  }
];

export const MOCK_RICH_MENUS: RichMenu[] = [
  {
    id: 'rm_1',
    accountId: 'acc_demo',
    name: 'Main Menu (Default)',
    status: 'Published',
    updatedAt: '2024-01-10T09:00:00Z',
    size: 'Large',
    chatBarText: 'เมนูหลัก',
    templateId: 'large_1',
    actions: {},
    image: 'https://picsum.photos/800/540?random=21'
  },
  {
    id: 'rm_2',
    accountId: 'acc_demo',
    name: 'Promotion Menu (Summer)',
    status: 'Draft',
    updatedAt: '2024-04-15T11:00:00Z',
    size: 'Large',
    chatBarText: 'โปรโมชั่นพิเศษ',
    templateId: 'large_2',
    actions: {},
    image: 'https://picsum.photos/800/540?random=22'
  },
  {
    id: 'rm_3',
    accountId: 'acc_demo',
    name: 'Mini Menu (Support)',
    status: 'Published',
    updatedAt: '2024-02-20T14:30:00Z',
    size: 'Compact',
    chatBarText: 'ติดต่อเรา',
    templateId: 'compact_1',
    actions: {},
    image: 'https://picsum.photos/800/540?random=23'
  }
];

export const MOCK_BANNERS: Banner[] = [
  {
    id: 'ban_1',
    accountId: 'acc_demo',
    name: 'Summer Sale Banner',
    status: 'Active',
    updatedAt: '2024-05-20T10:00:00Z',
    imageUrl: 'https://picsum.photos/1040/1040?random=1',
    linkedCampaignId: 'camp_1'
  },
  {
    id: 'ban_2',
    accountId: 'acc_demo',
    name: 'New Product Teaser',
    status: 'Inactive',
    updatedAt: '2024-06-01T09:00:00Z',
    imageUrl: 'https://picsum.photos/1040/1040?random=2',
    linkedCampaignId: 'camp_2'
  },
  {
    id: 'ban_3',
    accountId: 'acc_demo',
    name: 'Member Exclusive',
    status: 'Active',
    updatedAt: '2024-03-15T15:00:00Z',
    imageUrl: 'https://picsum.photos/1040/1040?random=3',
    linkedCampaignId: 'camp_3'
  }
];

export const MOCK_FORMS: FormTemplate[] = [
  {
    id: 'form_1',
    name: 'แบบฟอร์มติดต่อสอบถาม (Contact Us)',
    description: 'General contact inquiry form',
    emailCategory: 'Support',
    status: 'Published',
    updatedAt: '2024-06-25T14:30:00Z',
    sections: []
  },
  {
    id: 'form_2',
    name: 'ลงทะเบียนร่วมงานสัมมนา (Event Reg)',
    description: 'Sign up for upcoming webinars',
    emailCategory: 'Marketing',
    status: 'Draft',
    updatedAt: '2024-06-28T09:15:00Z',
    sections: []
  },
  {
    id: 'form_3',
    name: 'แบบสอบถามความพึงพอใจ (Feedback)',
    description: 'Customer satisfaction survey',
    emailCategory: 'Survey',
    status: 'Published',
    updatedAt: '2024-05-10T11:00:00Z',
    sections: []
  },
  {
    id: 'form_4',
    name: 'แจ้งซ่อมสินค้า (Repair Request)',
    description: 'Product repair service request',
    emailCategory: 'Service',
    status: 'Published',
    updatedAt: '2024-04-05T13:45:00Z',
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
  },
  {
    id: 'faq-4',
    question: 'ระยะเวลาจัดส่งสินค้ากี่วัน?',
    answer: 'สินค้าจะถูกจัดส่งภายใน 3-5 วันทำการ สำหรับพื้นที่กรุงเทพฯ และปริมณฑล และ 5-7 วันทำการสำหรับต่างจังหวัด',
    category: 'Shipping',
    order: 4,
    status: 'Published' as const,
    updatedAt: '2024-07-01T10:00:00Z'
  },
  {
    id: 'faq-5',
    question: 'สามารถเปลี่ยนหรือคืนสินค้าได้หรือไม่?',
    answer: 'บริษัทรับประกันความพึงพอใจ ยินดีรับเปลี่ยนหรือคืนสินค้าภายใน 7 วัน นับจากวันที่ได้รับสินค้า หากสินค้าอยู่ในสภาพสมบูรณ์',
    category: 'Returns',
    order: 5,
    status: 'Published' as const,
    updatedAt: '2024-07-02T14:20:00Z'
  }
];

// --- Mock Partners Data ---
export const MOCK_PARTNERS = [
  {
    id: 'partner-1',
    name: 'TechCorp Solutions',
    description: 'Leading technology partner specializing in cloud infrastructure',
    logo: 'https://picsum.photos/150/150?random=11',
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
    logo: 'https://picsum.photos/150/150?random=12',
    website: 'https://designstudio.example.com',
    contactEmail: 'hello@designstudio.example.com',
    status: 'Active' as const,
    featured: false,
    updatedAt: '2024-06-21T14:30:00Z'
  },
  {
    id: 'partner-3',
    name: 'Fast Logistics',
    description: 'Reliable shipping and logistics partner',
    logo: 'https://picsum.photos/150/150?random=13',
    website: 'https://fastlogistics.example.com',
    contactEmail: 'support@fastlogistics.example.com',
    status: 'Active' as const,
    featured: true,
    updatedAt: '2024-06-22T09:00:00Z'
  },
  {
    id: 'partner-4',
    name: 'Green Eco Packaging',
    description: 'Sustainable packaging solutions',
    logo: 'https://picsum.photos/150/150?random=14',
    website: 'https://greeneco.example.com',
    contactEmail: 'sales@greeneco.example.com',
    status: 'Inactive' as const,
    featured: false,
    updatedAt: '2024-05-10T11:45:00Z'
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
  },
  {
    id: 'email-3',
    name: 'Monthly Newsletter (July)',
    subject: 'Updates & Highlights for July',
    category: 'Marketing',
    htmlContent: '<h1>July Highlights</h1><p>Check out our latest news...</p>',
    variables: ['{{subscriber_name}}'],
    status: 'Draft' as const,
    updatedAt: '2024-07-01T10:00:00Z'
  },
  {
    id: 'email-4',
    name: 'Order Confirmation',
    subject: 'Order #{{order_id}} Confirmed',
    category: 'Transactional',
    htmlContent: '<h1>Thank you for your order!</h1><p>Your order {{order_id}} has been received.</p>',
    variables: ['{{name}}', '{{order_id}}', '{{order_total}}'],
    status: 'Active' as const,
    updatedAt: '2024-05-15T14:20:00Z'
  }
];
