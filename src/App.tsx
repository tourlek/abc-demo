import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MOCK_PAGES } from "@/constants";
import Layout from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { PageList } from "@/components/LandingPages/PageList";
import { PageEditor } from "@/components/LandingPages/PageEditor";
import { CampaignManager } from "@/components/Campaigns/CampaignManager";
import { RichMenuList } from "@/components/Campaigns/RichMenuList";
import { RichMenuMaker } from "@/components/Campaigns/RichMenuMaker";
import { CampaignList } from "@/components/Campaigns/CampaignList";
import { CampaignEditor } from "@/components/Campaigns/CampaignEditor";
import { BannerList } from "@/components/Campaigns/BannerList";
import { BannerEditor } from "@/components/Campaigns/BannerEditor";
import { FormList } from "@/components/Forms/FormList";
import { FormEditor } from "@/components/Forms/FormEditor";
import { FAQList } from "@/components/FAQ/FAQList";
import { FAQEditor } from "@/components/FAQ/FAQEditor";
import { PartnerList } from "@/components/Partners/PartnerList";
import { PartnerEditor } from "@/components/Partners/PartnerEditor";
import { EmailTemplateList } from "@/components/Email/EmailTemplateList";
import { EmailTemplateEditor } from "@/components/Email/EmailTemplateEditor";
import { Settings } from "@/components/Settings/Settings";

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          {/* Landing Pages */}
          <Route path="pages" element={<PageList pages={MOCK_PAGES} />} />
          <Route path="pages/:id" element={<PageEditor />} />
          <Route path="pages/new" element={<PageEditor />} />

          {/* Campaigns */}
          <Route path="campaigns" element={<CampaignManager />} />
          <Route path="campaigns/list" element={<CampaignList />} />
          <Route path="campaigns/:id" element={<CampaignEditor />} />
          <Route path="campaigns/new" element={<CampaignEditor />} />

          {/* Rich Menus */}
          <Route path="campaigns/rich-menus" element={<RichMenuList />} />
          <Route path="campaigns/rich-menus/:id" element={<RichMenuMaker />} />
          <Route path="campaigns/rich-menus/new" element={<RichMenuMaker />} />

          {/* Banners */}
          <Route path="campaigns/banners" element={<BannerList />} />
          <Route path="campaigns/banners/:id" element={<BannerEditor />} />
          <Route path="campaigns/banners/new" element={<BannerEditor />} />

          {/* Forms */}
          <Route path="forms" element={<FormList />} />
          <Route path="forms/:id" element={<FormEditor />} />
          <Route path="forms/new" element={<FormEditor />} />

          {/* FAQ */}
          <Route path="faq" element={<FAQList />} />
          <Route path="faq/:id" element={<FAQEditor />} />
          <Route path="faq/new" element={<FAQEditor />} />

          {/* Partners */}
          <Route path="partners" element={<PartnerList />} />
          <Route path="partners/:id" element={<PartnerEditor />} />
          <Route path="partners/new" element={<PartnerEditor />} />

          {/* Email Templates */}
          <Route path="email-templates" element={<EmailTemplateList />} />
          <Route path="email-templates/:id" element={<EmailTemplateEditor />} />
          <Route path="email-templates/new" element={<EmailTemplateEditor />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppContent;
