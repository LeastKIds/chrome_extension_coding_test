chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type === "login") {
      console.log("Login message received");
      const TOKEN = request.data.TOKEN;
      let responded = false; // 응답 플래그를 false로 초기화

      fetch('https://api.github.com/user', {
          headers: {
              'Authorization': `Bearer ${TOKEN}`
          }
      })
      .then(response => response.json())
      .then(data => {
          const USER = data["login"];
          chrome.storage.sync.set({ USER: USER, TOKEN: TOKEN }, function() {
              if (chrome.runtime.lastError) {
                  if (!responded) {
                      sendResponse({ status: false, data: {errMessage: chrome.runtime.lastError.message}});
                      responded = true; // 응답 플래그를 true로 설정
                  }
                  return;
              }
              console.log("Saved user name");
              if (!responded) {
                  sendResponse({ status: true, data: {USER: USER}});
                  responded = true; // 응답 플래그를 true로 설정
              }
          });
      })
      .catch(error => {
          if (!responded) {
              sendResponse({ status: false, data: {errMessage: error.toString()}});
              responded = true; // 응답 플래그를 true로 설정
          }
      });

      return true; // 비동기 응답을 위해 true를 반환합니다.
    } else if (request.type === 'repo') {
      let responded = false; // 응답 플래그를 false로 초기화

      chrome.storage.local.get('USER', (result) => {
        if (result.USER) {
          const USER = result.USER;
          const REPO = request.data.REPO;
          fetch(`https://api.github.com/repos/${USER}/${REPO}`)
          .then(response => response.json())
          .then(data => {
            chrome.storage.sync.set({ REPO: REPO }, function() {
              if (chrome.runtime.lastError) {
                  if (!responded) {
                      sendResponse({ status: false, data: {errMessage: chrome.runtime.lastError.message}});
                      responded = true; // 응답 플래그를 true로 설정
                  }
                  return;
              }
              console.log("Saved repo");
              if (!responded) {
                  sendResponse({ status: true, data: {REPO: REPO}});
                  responded = true; // 응답 플래그를 true로 설정
              }
          });
          })
          .catch(error => {
            if (!responded) {
                sendResponse({ status: false, data: {errMessage: error.toString()}});
                responded = true; // 응답 플래그를 true로 설정
            }
          })
        } else {
          if (!responded) {
            sendResponse({ status: false, data: {errMessage: result}});
            responded = true; // 응답 플래그를 true로 설정
          }
        }
      });


     


      return true
    }
  }
);
