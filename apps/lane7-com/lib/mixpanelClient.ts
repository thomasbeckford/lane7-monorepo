import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// lib/mixpanelClient.ts
export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    autocapture: true,
    debug: true,
    verbose: true,
    loaded: function (mixpanel) {
      console.log('🎉 Mixpanel loaded successfully!');
    }
  });
};

export const trackPageView = (url: string) => {
  console.log('📄 Tracking page view for:', url);
  mixpanel.track('Page View', {
    page: url,
    timestamp: new Date().toISOString()
  });
  console.log('✅ Page view event sent');
};
