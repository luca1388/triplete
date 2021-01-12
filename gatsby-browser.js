/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import { useGoogleAnalytics } from './src/hooks/useGoogleAnalytics';
import "./src/global.css";

export const onServiceWorkerUpdateReady = () => window.location.reload();

// export const onServiceWorkerUpdateReady = () => {
//   const answer = window.confirm(
//     `This application has been updated. ` +
//       `Reload to display the latest version?`
//   );
//   if (answer === true) {
//     window.location.reload();
//   }
// };

// // Wraps every page in a component
// exports.wrapPageElement = ({ Element, props }) => {
//     return <Element {...props} />;
//   }

// window.addEventListener("DOMContentLoaded", () => {
//   let displayMode = "browser tab";
//   if (navigator.standalone) {
//     displayMode = "standalone-ios";
//   }
//   if (window.matchMedia("(display-mode: standalone)").matches) {
//     displayMode = "standalone";
//   }
//   // Log launch display mode to analytics
//   console.log("DISPLAY_MODE_LAUNCH:", displayMode);
//   alert("DISPLAY_MODE_LAUNCH:", displayMode);
// });

// window.addEventListener("load", async () => {
//   const relatedApps = await navigator.getInstalledRelatedApps();
//   console.log("installed");
//   console.log(relatedApps);
// });

// document.onvisibilitychange(event => {
//   console.log(event);
//   let displayMode = "browser tab";
//   if (navigator.standalone) {
//     displayMode = "standalone-ios";
//   }
//   if (window.matchMedia("(display-mode: standalone)").matches) {
//     displayMode = "standalone";
//   }
//   // Log launch display mode to analytics
//   console.log("DISPLAY_MODE_LAUNCH:", displayMode);
//   alert("DISPLAY_MODE_LAUNCH:", displayMode);
// });

window.addEventListener("appinstalled", evt => {
  const { fireEvent } = useGoogleAnalytics();
  fireEvent("Install", {
    event_category: "PWA",
    event_label: "PWA installed"
  });
});