/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import { useGoogleAnalytics } from "./src/hooks/useGoogleAnalytics";
import { Workbox, messageSW } from 'workbox-window';

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



if (navigator && navigator.serviceWorker) {
  const wb = new Workbox('/sw.js');
  let registration;

  const showSkipWaitingPrompt = (event) => {
    console.log(event);
    alert('skip waiting');
  };

  // Add an event listener to detect when the registered
  // service worker has installed but is waiting to activate.
  wb.addEventListener('waiting', showSkipWaitingPrompt);
  wb.addEventListener('externalwaiting', showSkipWaitingPrompt);

  wb.register().then((r) => registration = r);

  navigator.serviceWorker.register('/sw.js').then(reg => {
    // sometime later…
    console.log('serviceWorker registered');
    setInterval(() => {
      console.log('serviceWorker trying to update...');
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