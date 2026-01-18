import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/utils/analytics";

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    const gaId = import.meta.env.VITE_GA_ID;
    
    if (typeof window !== "undefined" && window.gtag && gaId) {
      // Update config with new page info
      window.gtag("config", gaId, {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
      });
      
      // Also send as event for better tracking
      trackEvent("page_view", {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};

export default PageViewTracker;

