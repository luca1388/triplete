/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import { useGoogleAnalytics } from "./src/hooks/useGoogleAnalytics";
// import { Workbox, messageSW } from 'workbox-window';

import "./src/global.css";

// export const onServiceWorkerUpdateReady = () => window.location.reload();

// export const onServiceWorkerUpdateReady = () => {
//   const answer = window.confirm(
//     `Abbiamo trovato una versione più recente di Triplete. ` +
//       `Vuoi aggiornare la pagina?`
//   );
//   if (answer === true) {
//     window.location.reload();
//   }
// };

window.addEventListener("appinstalled", evt => {
  const { fireEvent } = useGoogleAnalytics();
  fireEvent("Install", {
    event_category: "PWA",
    event_label: "PWA installed",
  });
});

const alertNewUpdateFound = registration => {
  console.log(registration);
  alert("new update found!");
};

if (navigator && navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js").then(reg => {
    // sometime later…
    console.log("serviceWorker registered");
    if (reg.waiting) {
      alertNewUpdateFound(reg);
    }

    // detect Service Worker update available and wait for it to become installed
    reg.addEventListener("updatefound", () => {
      if (reg.installing) {
        // wait until the new Service worker is actually installed (ready to take over)
        reg.installing.addEventListener("statechange", () => {
          if (reg.waiting) {
            // if there's an existing controller (previous Service Worker), show the prompt
            if (navigator.serviceWorker.controller) {
              alertNewUpdateFound(reg);
            } else {
              // otherwise it's the first install, nothing to do
              console.log("Service Worker initialized for the first time");
            }
          }
        });
      }
    });

    setInterval(() => {
      console.log("serviceWorker trying to update with periodic check...");
      reg.update();
    }, 20000);
  });

  // console.log('serviceWorker enabled');
  // navigator.serviceWorker.register('/sw.js').then(reg => {
  //   // sometime later…
  //   console.log('serviceWorker registered');
  //   setInterval(() => {
  //     console.log('serviceWorker trying to update...');
  //     reg.update();
  //   }, 10000);
  // });
}
