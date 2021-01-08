export const useGoogleAnalytics = () => {

    const fireEvent = (eventName, eventObject) => {
        if (process.env.GA_TRACKING_ID && gtag) {
            gtag('event', eventName, eventObject);
        }
    };

    const firePageView = (pageViewObject) => {
        if (process.env.GA_TRACKING_ID && gtag) {
            gtag('config', process.env.GA_TRACKING_ID, pageViewObject);
        }
    };

    return { fireEvent, firePageView };
};