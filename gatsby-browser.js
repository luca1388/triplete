/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import { useGoogleAnalytics } from "./src/hooks/useGoogleAnalytics";
import React from "react";
import ReactDOM from "react-dom";

import "./src/global.css";
import NewVersionBanner from "./src/components/NewVersionBanner/NewVersionBanner";

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

const acceptNewVersionHandler = registration => {
  if (registration.waiting) {
    // let waiting Service Worker know it should became active
    registration.waiting.postMessage("SKIP_WAITING");
  }
  window.location.reload();
};

const alertNewUpdateFound = registration => {
  ReactDOM.render(
    <NewVersionBanner onAccept={() => acceptNewVersionHandler(registration)} />,
    document.getElementById("banner-portal")
  );
};

if (navigator && navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js").then(reg => {
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
            }
          }
        });
      }
    });

    // detect controller change and refresh the page
    navigator.serviceWorker.addEventListener("controllerchange", event => {
      console.log("controllerchange");
      // window.location.reload();
    });

    setInterval(() => {
      console.log("serviceWorker trying to update with periodic check...");
      reg.update();
    }, 20000);
  });
}
