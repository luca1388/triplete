/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import { useGoogleAnalytics } from "./src/hooks/useGoogleAnalytics";
import React from 'react';
import ReactDOM from "react-dom";
// import { Workbox, messageSW } from 'workbox-window';

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
  console.log("button click");
  console.log(registration.waiting);
  if (registration.waiting) {
    console.log("registration.waiting");
    // let waiting Service Worker know it should became active
    registration.waiting.postMessage("SKIP_WAITING");
  }
};

const alertNewUpdateFound = registration => {
  console.log(registration);
  // alert("new update found!");
  ReactDOM.createPortal(
    <NewVersionBanner onAccept={() => acceptNewVersionHandler(registration)} />,
    document.getElementById("banner-portal")
  );
  // document.getElementById('banner-portal').innerHTML = "<p>Update? <button id='update-btn'>update</button></p>";
  // document.getElementById('update-btn').addEventListener('click', acceptNewVersionHandler);

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

    let refreshing = false;

    // detect controller change and refresh the page
    navigator.serviceWorker.addEventListener("controllerchange", (event) => {
      console.log(event);
      console.debug();
      console.log('controllerchange', refreshing);
      if (!refreshing) {
        // window.location.reload();
        console.log('reloading...');
        refreshing = true;
      }
    });

    setInterval(() => {
      console.log("serviceWorker trying to update with periodic check...");
      reg.update();
    }, 10000);
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
