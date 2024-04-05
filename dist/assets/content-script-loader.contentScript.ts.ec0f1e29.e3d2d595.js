(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/contentScript.ts.ec0f1e29.js")
    );
  })().catch(console.error);

})();
