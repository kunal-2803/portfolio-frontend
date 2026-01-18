import { useEffect } from "react";

const GoogleAnalytics = () => {
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_ID;

    if (!gaId) {
      console.warn("Google Analytics ID not found. Set VITE_GA_ID in your .env file.");
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    (window as any).gtag = gtag;
    gtag("js", new Date());
    gtag("config", gaId);
  }, []);

  return null;
};

export default GoogleAnalytics;

