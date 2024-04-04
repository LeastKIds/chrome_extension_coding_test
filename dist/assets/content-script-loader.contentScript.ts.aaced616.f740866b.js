(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/contentScript.ts.aaced616.js")
    );
  })().catch(console.error);

})();
