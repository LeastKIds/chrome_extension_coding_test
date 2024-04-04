chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type === "login") {
        console.log("Login message received");
        // 여기에서 로그인 처리 로직을 실행할 수 있습니다.
        const TOKEN = request.data.TOKEN;

        fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        }).then(response => response.json())
        .then(data => {
            const USER = data["login"];
            // chrome.storage.sync.set({ USER: USER }, function() {
            //   console.log("saved user name")
            // });

            sendResponse({ status: true, data: {USER: USER}});
        })
        // .catch(error => {
        //     sendResponse({ status: false , data: {errMessage: error}});
        // })

        return true;
      }
      
    }
  );