export const useGoogleAnalytics = () => {

    const fireEvent = (eventName: string, eventObject: {[key: string]: any}) => {
        if (process.env.GA_TRACKING_ID && window.gtag) {
            window.gtag('event', eventName, eventObject);
        }
    };

    return { fireEvent };
};