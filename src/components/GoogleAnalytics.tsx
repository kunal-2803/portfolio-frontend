import { useEffect } from "react";

const GoogleAnalytics = () => {
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_ID;

    if (!gaId) {
      console.warn("Google Analytics ID not found. Set VITE_GA_ID in your .env file.");
      return;
    }

    // Initialize dataLayer FIRST (before script loads)
    window.dataLayer = window.dataLayer || [];
    
    // Define gtag function BEFORE script loads (commands will be queued)
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    
    // Set gtag on window
    (window as any).gtag = gtag;
    
    // Call config immediately (will be processed when script loads)
    gtag("js", new Date());
    gtag("config", gaId, {
      send_page_view: true
    });

    // Load Google Analytics script AFTER initializing gtag
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    
    script.onload = () => {
      console.log("✅ Google Analytics loaded successfully");
      // Send a test page view to verify it's working
      gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href
      });
    };
    
    script.onerror = () => {
      console.error("❌ Failed to load Google Analytics script");
    };
    
    document.head.appendChild(script);
  }, []);

  return null;
};

export default GoogleAnalytics;

