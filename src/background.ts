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

      chrome.storage.sync.get(['USER', 'TOKEN'], (result) => {
        if (result.USER) {
          const USER = result.USER;
          const TOKEN = result.TOKEN;
          const REPO = request.data.REPO;
          fetch(`https://api.github.com/repos/${USER}/${REPO}`)
          .then(response => response.json())
          .then(data => {
            chrome.storage.sync.set({ USER: USER, TOKEN: TOKEN, REPO: REPO}, function() {
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
    } else if (request.type === 'auth') {
      let responded = false; // 응답 플래그를 false로 초기화
      
      chrome.storage.sync.get(['USER', 'TOKEN', 'REPO'], (result) => {
        if (result.USER && result.TOKEN && result.REPO) {
          checkAuth(result.TOKEN, result.REPO)
          .then((check) => {
            if (check) {
              if (!responded) {
                sendResponse({ status: true, data: {USER: result.USER, REPO: result.REPO}});
                responded = true; // 응답 플래그를 true로 설정
              }
            } else {
              if (!responded) {
                sendResponse({ status: false, data: {errMessage: "Auth failed"}});
                responded = true; // 응답 플래그를 true로 설정
              }
            }
          })
          .catch((error) => {
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
    } else if (request.type === 'github') {
      let responded = false; // 응답 플래그를 false로 초기화
      
      chrome.storage.sync.get(['USER', 'TOKEN', 'REPO'], (result) => {
        if (result.USER && result.TOKEN && result.REPO) {
          const USER = result.USER;
          const TOKEN = result.TOKEN;
          const REPO = result.REPO;

          pushGithub(USER, TOKEN, REPO, request.data)
          .then((pushResult) => {
            switch (pushResult.result) {
              case true:
                if (!responded) {
                  sendResponse({ status: true, data: {message: pushResult.message}});
                  responded = true; // 응답 플래그를 true로 설정
                }
                break;
              case false:
                if (!responded) {
                  sendResponse({ status: false, data: {errMessage: pushResult.message}});
                  responded = true; // 응답 플래그를 true로 설정
                }
                break;
            }
          })
          .catch((error) => {
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
});

async function checkAuth(token: string, repo: string): Promise<boolean>{
  const response = await fetch('https://api.github.com/user', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return false;
  }
  const data = await response.json();
  const USER = data["login"];

  const repoResponse = await fetch(`https://api.github.com/repos/${USER}/${repo}`);
  if (!repoResponse.ok) {
    return false;
  }

  return true
}

async function pushGithub(USER: string, TOKEN: string, REPO: string, data: any): Promise<{result: boolean, message: any}> {
  const title: string = data["title"]
  const content: string = data["markdown"]
  const codeTxt: string = data["codeTxt"]
  const codeExtension: string = data["codeExtension"]
  const codeSpeed: string = data["codeSpeed"]
  const codeSpeedRanking: string = data["codeSpeedRanking"]
  const codeMemory: string = data["codeMemory"]
  const codeMemoryRanking: string = data["codeMemoryRanking"]

  // login check
  const loginCheck = await checkAuth(TOKEN, REPO)
  if (!loginCheck) {
    return {result: false, message: "Auth failed"}
  }

  // headers setting
  const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  };

  // 해당 레파지토리의 main 브랜치의 sha 값 가져오기
  const branchRes = await fetch(`https://api.github.com/repos/${USER}/${REPO}/branches/main`, { headers });
  if (!branchRes.ok) {
    return {result: false, message: branchRes}
  }
  const branchData = await branchRes.json();
  // 최근 커밋값을 가져오기
  const shaLatestCommit = branchData.commit.sha;

  // 최근 커밋의 트리 sha를 가져오기
  const commitRes = await fetch(`https://api.github.com/repos/${USER}/${REPO}/git/commits/${shaLatestCommit}`, { headers });
  
  const commitData = await commitRes.json();
  if (!commitRes.ok) {
    return {result: false, message: commitData}
  }
  const shaBaseTree = commitData.tree.sha;

  // 3. 새 파일을 포함하는 새 트리를 생성합니다
  const treeRes = await fetch(`https://api.github.com/repos/${USER}/${REPO}/git/trees`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      base_tree: shaBaseTree,
      tree: [
        {
          path: title + "/" + title + "." + codeExtension,
          mode: '100644',
          type: 'blob',
          content: codeTxt
        },
        {
          path: title + "/" + title + ".md",
          mode: '100644',
          type: 'blob',
          content: content
        }
      ]
    })
  });

  const treeData = await treeRes.json();

  if (!treeRes.ok) {
    return {result: false, message: treeData}
  }
  const shaNewTree = treeData.sha;

  // 4. 새 커밋을 생성합니다
  const newCommitRes = await fetch(`https://api.github.com/repos/${USER}/${REPO}/git/commits`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: codeSpeed + " " + codeSpeedRanking + " " + codeMemory + " " + codeMemoryRanking,
      tree: shaNewTree,
      parents: [shaLatestCommit]
    })
  });

  const newCommitData = await newCommitRes.json();
  if (!newCommitRes.ok) {
    return {result: false, message: newCommitData}
  }
  const shaNewCommit = newCommitData.sha;

  // 5. 브랜치의 HEAD를 새 커밋으로 업데이트합니다
  const update = await fetch(`https://api.github.com/repos/${USER}/${REPO}/git/refs/heads/main`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sha: shaNewCommit })
  });
  
  const updateJson = await update.json();
  if (!update.ok) {
    return {result: false, message: updateJson}
  }

  return {result: true, message: "Success"}

}