// Google Analytics utility functions

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Track a custom event in Google Analytics
 * @param eventName - Name of the event
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

/**
 * Track button clicks
 * @param buttonName - Name/identifier of the button
 * @param location - Where the button is located (optional)
 */
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent("button_click", {
    button_name: buttonName,
    location: location || "unknown",
  });
};

/**
 * Track form submissions
 * @param formName - Name/identifier of the form
 */
export const trackFormSubmit = (formName: string) => {
  trackEvent("form_submit", {
    form_name: formName,
  });
};

/**
 * Track file downloads
 * @param fileName - Name of the file being downloaded
 * @param fileType - Type of file (e.g., 'pdf', 'resume')
 */
export const trackDownload = (fileName: string, fileType?: string) => {
  trackEvent("file_download", {
    file_name: fileName,
    file_type: fileType || "unknown",
  });
};

