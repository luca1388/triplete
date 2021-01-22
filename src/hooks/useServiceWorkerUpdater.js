import { useCallback, useEffect, useState } from "react";

export const useServiceWorkerUpdater = () => {
  const [updateFound, setUpdateFound] = useState(false);

  const registerServiceWorker = useCallback(async () => {
    if (!window || !navigator || !"serviceWorker" in navigator) {
      return;
    }
    const reg = await navigator.serviceWorker.register("/sw.js");
    if (!reg) {
      return;
    }
    if (reg.waiting) {
        updateWorker(reg.waiting);
    }
    // If "updatefound" event is fired, it means that there's
    // a new service worker being installed.
    reg.addEventListener("updatefound", () => {
      if (reg.installing) {
        reg.installing.addEventListener("statechange", () => {
          if (["installed", "waiting"].includes(reg.installing.state)) {
            updateWorker(reg.installing);
          }
        });
      }
    });
  }, []);

  const updateWorker = useCallback((worker) => {
     // Tell the service worker to skipWaiting
     worker.postMessage({ type: "SKIP_WAITING" });
     setUpdateFound(true);
  }, []);

  useEffect(() => {
    registerServiceWorker();
  }, [registerServiceWorker]);

  return { updateFound };
};
