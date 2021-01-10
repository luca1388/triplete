/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import "./src/global.css";

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

window.addEventListener("DOMContentLoaded", () => {
  let displayMode = "browser tab";
  if (navigator.standalone) {
    displayMode = "standalone-ios";
  }
  if (window.matchMedia("(display-mode: standalone)").matches) {
    displayMode = "standalone";
  }
  // Log launch display mode to analytics
  console.log("DISPLAY_MODE_LAUNCH:", displayMode);
  alert("DISPLAY_MODE_LAUNCH:", displayMode);
});

window.addEventListener("appinstalled", evt => {
  console.log("PWA installed");
  alert("PWA installed");
});
