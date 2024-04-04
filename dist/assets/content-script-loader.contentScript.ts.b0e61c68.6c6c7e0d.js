(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/contentScript.ts.b0e61c68.js")
    );
  })().catch(console.error);

})();
