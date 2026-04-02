'use client';

import { SidebarCalculatorCTA } from "@/components/blog/SidebarCalculatorCTA";
import { MobileStickyCTA } from "@/components/blog/MobileStickyCTA";
import { ExitIntentModal } from "@/components/blog/ExitIntentModal";

interface BlogContentWrapperProps {
  children: React.ReactNode;
  utmCampaign?: string;
}

export function BlogContentWrapper({ 
  children, 
  utmCampaign = "blog"
}: BlogContentWrapperProps) {
  return (
    <>
      <div className="flex gap-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0">
          {children}
        </div>
        
        <aside className="w-72 flex-shrink-0">
          <SidebarCalculatorCTA utmCampaign={utmCampaign} />
        </aside>
      </div>
      
      <MobileStickyCTA utmCampaign={utmCampaign} />
      <ExitIntentModal utmCampaign={utmCampaign} />
    </>
  );
}

export default BlogContentWrapper;
