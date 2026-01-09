
export type Language = 'th' | 'en';

export enum PageStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  SCHEDULED = 'Scheduled'
}

export interface LineCredentials {
  channelId: string;
  channelSecret: string;
  channelAccessToken: string;
  liffId: string;
  isValid: boolean;
}

export interface LineAccount {
  id: string;
  name: string;
  credentials: LineCredentials;
}

export interface CarouselSlide {
  id: string;
  imageUrl: string;
  caption?: string;
  link?: string;
}

export interface ComponentData {
  id: string;
  type: 'hero' | 'text' | 'image' | 'form' | 'video' | 'richtext' | 'carousel' | 'custom';
  content: Record<string, any>;
}

// --- System Category Types ---
export interface CategoryOption {
  id: string;
  label: string;
}

export interface SystemCategory {
  id: string;
  name: string;
  description: string;
  options: CategoryOption[];
}

export interface PageContent {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string; // URL or Base64
  components: ComponentData[];
}

export interface LandingPage {
  id: string;
  slug: string;
  tags: string[];
  categoryValues?: Record<string, string>; // Map categoryId -> optionId
  status: PageStatus;
  publishDate?: string; // ISO String
  unpublishDate?: string; // ISO String
  content: {
    th: PageContent;
    en?: PageContent;
  };
  defaultLanguage: Language;
  revisions: { date: string; note: string }[];
  updatedAt: string;
}

// --- Campaign Types ---

export type RewardType = 'OFFLINE' | 'ONLINE' | 'PHYSICAL';
export type ExpireType = 'NO_EXPIRE' | 'EXPIRE_TIME';
export type CodeType = 'NO_CODE' | 'PUBLIC_CODE' | 'UNIQUE_CODE' | 'UNIQUE_LINK';

export interface CampaignPeriod {
  id: string;
  date: string; // ISO String
  quotaPerPeriod: number;
  quotaPerUser: number;
}

export interface CampaignParagraph {
  id: string;
  content: string;
}

export interface Campaign {
  id: string;
  accountId: string; // Link to specific LineAccount
  title: string;
  subtitle?: string;
  status: 'Draft' | 'Published' | 'Scheduled' | 'Ended';
  updatedAt: string;

  // Details
  paragraphs: CampaignParagraph[];
  bannerImage?: string;

  // Reward
  rewardType: RewardType;
  expireType: ExpireType;
  codeType: CodeType;

  // Button
  buttonText: string;
  buttonLink: string;

  // Schedule
  rewardDate?: string;
  campaignDate?: string;
  bannerDate?: string;

  // Quota
  totalQuota: number;
  periods: CampaignPeriod[];
}

export interface User {
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

// --- Rich Menu Types ---

export type RichMenuSize = 'Large' | 'Compact';

export interface RichMenuTemplate {
  id: string;
  name: string;
  size: RichMenuSize;
  areas: string[]; // e.g. ['A', 'B', 'C', 'D', 'E', 'F']
  grid: string; // CSS Grid template areas representation
}

export interface RichMenuAction {
  type: 'uri' | 'message' | 'postback';
  label?: string;
  data: string; // URL or Message text or Postback data
}

export interface RichMenuConfig {
  name: string;
  chatBarText: string;
  templateId: string;
  actions: Record<string, RichMenuAction>;
  image?: string; // Base64 or URL
}

export interface RichMenu extends RichMenuConfig {
  id: string;
  accountId: string; // Link to specific LineAccount
  status: 'Draft' | 'Published' | 'Archived';
  updatedAt: string;
  size: RichMenuSize;
}

// --- Banner Types ---

export interface Banner {
  id: string;
  accountId: string; // Link to specific LineAccount
  name: string;
  imageUrl: string;
  linkedCampaignId: string; // ID of the campaign this banner links to
  status: 'Draft' | 'Active' | 'Inactive';
  updatedAt: string;
}

// --- Form Management Types ---

export interface FormField {
  id: string;
  label: string;
  key: string;
  placeholder: string;
  widthDesktop: string; // e.g. '100%', '50%'
  widthMobile: string;
  minLength?: number;
  maxLength?: number;
  helpMessage?: string;
  errorMessage?: string;
  pattern?: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
}

export interface FormSection {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  emailCategory: string;
  status: 'Draft' | 'Published';
  updatedAt: string;
  sections: FormSection[];
}

// --- FAQ Types ---

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: 'Draft' | 'Published';
  updatedAt: string;
}

// --- Partner Types ---

export interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string; // URL or Base64
  website: string;
  contactEmail: string;
  status: 'Active' | 'Inactive';
  featured: boolean;
  updatedAt: string;
}

// --- Email Template Types ---

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: string;
  htmlContent: string;
  variables: string[]; // e.g., ['{{name}}', '{{email}}']
  status: 'Draft' | 'Active';
  updatedAt: string;
}
