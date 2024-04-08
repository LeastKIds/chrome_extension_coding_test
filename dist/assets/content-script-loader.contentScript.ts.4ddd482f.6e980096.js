(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/contentScript.ts.4ddd482f.js")
    );
  })().catch(console.error);

})();
