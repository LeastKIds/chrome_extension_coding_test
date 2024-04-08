(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/contentScript.ts.f9c7c502.js")
    );
  })().catch(console.error);

})();
