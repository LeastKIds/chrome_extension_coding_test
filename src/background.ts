chrome.runtime.onMessage.addListener(
    async (request: { type: string, data?: any }, sender, sendResponse: (response: { status: string, data?: any }) => void) => {
        if (request.type === "login") {
            const TOKEN = request.data.TOKEN;
            try {
                const loginResponse = await fetch('https://api.github.com/user', {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                });

                if (!loginResponse.ok) {
                    sendResponse({status: "false", data: {errorCode: "loginError"}});
                    return
                }

                const userData = await loginResponse.json();
                const USER = userData["login"];

                sendResponse({status: "true", data: {login: USER}});
                return
            } catch {
                sendResponse({status: "false", data: {errorCode: "networkError"}});
                return
            }
        }
        return true; // 비동기 응답을 위해 true를 반환합니다.
    }
);