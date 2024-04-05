(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/contentScript.ts.2920ddf7.js")
    );
  })().catch(console.error);

})();
