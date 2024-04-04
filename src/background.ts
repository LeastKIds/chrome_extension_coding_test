chrome.runtime.onMessage.addListener(
    async (request, sender) => {
        if (request.type === "login") {
            const TOKEN = request.data.TOKEN;
            try {
                const loginResponse = await fetch('https://api.github.com/user', {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                });

                if (!loginResponse.ok) {
                    chrome.runtime.sendMessage({status: "false", data: {errorCode: "loginError"}});
                    return;
                }

                const userData = await loginResponse.json();
                chrome.runtime.sendMessage({status: "true", data: {login: userData.login}});
            } catch (error) {
                chrome.runtime.sendMessage({status: "false", data: {errorCode: "networkError"}});
            }
        }
    }
);
