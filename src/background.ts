chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type === "login") {
        console.log("Login message received");
        // 여기에서 로그인 처리 로직을 실행할 수 있습니다.
  
        // 예시 응답
        sendResponse({ status: "Received the login message" , data: {response: "success"}});
      }
    }
  );