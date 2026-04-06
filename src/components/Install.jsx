import { useEffect, useState } from "react";

function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // prevent the default mini banner
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); // show install prompt
    const choiceResult = await deferredPrompt.userChoice;
    console.log(choiceResult.outcome);
    setDeferredPrompt(null); // reset after use
  };

  return (
    <button
      style={{ backgroundColor: "yellow", color: "black" }}
      onClick={handleInstall}
      disabled={!deferredPrompt} // disable if prompt not ready
    >
      Install App
    </button>
  );
}

export default Install;
