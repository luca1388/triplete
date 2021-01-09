export const useGoogleAnalytics = () => {
  const fireEvent = (
    eventName: string,
    eventObject: {
      event_category: string;
      event_label: string;
      [key: string]: any;
    }
  ) => {
    if (process.env.GATSBY_GA_TRACKING_ID && 'gtag' in window) {
        console.log('firing event');
      window.gtag("event", eventName, eventObject);
    }
  };

  return { fireEvent };
};
