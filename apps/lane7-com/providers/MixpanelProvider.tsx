'use client';

import { initMixpanel, trackPageView } from '@/lib/mixpanelClient';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

export default function MixpanelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initMixpanel();
  }, []);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return <>{children}</>;
}
