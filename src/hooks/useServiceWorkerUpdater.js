import { useCallback, useEffect, useState } from "react";

export const useServiceWorkerUpdater = () => {
  const [updateFound, setUpdateFound] = useState(false);

  const updateWorker = useCallback((worker) => {
    // Tell the service worker to skipWaiting
    worker.postMessage({ type: "SKIP_WAITING" });
    setUpdateFound(true);
 }, []);

  const registerServiceWorker = useCallback(async () => {
    if (!window || !navigator || !navigator.serviceWorker) {
      return;
    }
    const reg = await navigator.serviceWorker.register("/sw.js");
    if (!reg) {
      return;
    }

    reg.update();

    if (reg.waiting) {
        updateWorker(reg.waiting);
    }
    // If "updatefound" event is fired, it means that there's
    // a new service worker being installed.
    reg.addEventListener("updatefound", () => {
      if (reg.installing) {
        reg.installing.addEventListener("statechange", () => {
          if (reg.installing && ["installed", "waiting"].includes(reg.installing.state)) {
            updateWorker(reg.installing);
          }
        });
      }
    });
  }, [updateWorker]);

  useEffect(() => {
    registerServiceWorker();
  }, [registerServiceWorker]);

  const handleVisibilityChange = useCallback(() => {
    if (!document.hidden) {
      registerServiceWorker();
    }
  }, [registerServiceWorker]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }, [handleVisibilityChange]);

  return { updateFound };
};
