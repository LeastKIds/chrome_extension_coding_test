loginCheck()

// 토큰 버튼을 찾아서 변수에 할당합니다.
const tokenButton = document.getElementById('tokenButton');
// 토큰 입력 창을 찾아서 변수에 할당합니다.
const github_token = document.getElementById('github_token');
// 레포지토리 입력 창을 찾아서 변수에 할당합니다.
const github_repo = document.getElementById('github_repo');
// 레포지토리 버튼을 찾아서 변수에 할당합니다.
const repoButton = document.getElementById('repoButton');
// 성공 메시지를 찾아 변수에 할당합니다.
const success = document.getElementById('success');
// 유효한 유저 아이디 값을 가지고 있는 input 요소를 찾아 변수에 할당합니다.
const adminId = document.getElementById('adminId') as HTMLInputElement;
// 유효한 repo값을 가지고 있는 input 요소를 찾아 변수에 할당합니다.
const adminRepo = document.getElementById('adminRepo') as HTMLInputElement;
// 뒤로가기 버튼을 찾아 변수에 할당합니다.
const backButton = document.getElementById('backButton');



// 토큰 버튼 클릭 이벤트 리스너를 추가합니다.
tokenButton?.addEventListener('click', (event) => {
  // 폼 제출을 막습니다.
  event.preventDefault();
  // 토큰값 가져오기
  const TOKEN = (document.getElementById('token') as HTMLInputElement).value;

  chrome.runtime.sendMessage({ type: "login", data: {TOKEN: TOKEN} }, function(response: any) {
    if (response.status) {
      alert("Check Token");

      // 토큰 입력 창을 숨깁니다.
      if (github_token) {
        github_token.style.display = 'none';
      }
      // 레포지토리 입력 창을 보여줍니다.
      if (github_repo) {
        github_repo.style.display = 'block';
      }

    } else {
      alert("Token verification failed");
    }
  });
});


repoButton?.addEventListener('click', function() {
  // 'repo' id를 가진 요소의 값을 가져옵니다.
  const repo = (document.getElementById('repo') as HTMLInputElement).value;

  chrome.runtime.sendMessage({ type: "repo", data: {REPO: repo} }, function(response: any) {
    if (response.status) {
      alert("Check Repo");
      if (github_repo) {
        github_repo.style.display = 'none';
      }
      
      if (success) {
        success.style.display = 'block';
      }

      if (adminId && adminRepo) {
        info(response.data.TOKEN, response.data.REPO);
      }

    } else {
      alert("Repo verification failed");
    }
    
  });
});

function loginCheck() {
  chrome.runtime.sendMessage({ type: "auth"}, function(response: any) {
    if (response.status) {
      if (github_token) {
        github_token.style.display = 'none';
      }

      if (success) {
        success.style.display = 'block';
      }

      if (adminId && adminRepo) {
        info(response.data.USER, response.data.REPO);
      }

    } else {
      alert("Auth failed. Enter Token Valuel");
    }
  });
}

backButton?.addEventListener('click', function() {

  chrome.runtime.sendMessage({ type: "logout"}, function(response: any) {
    if (response.status) {
      if (github_token) {
        github_token.style.display = 'block';
      }
    
      if (success) {
        success.style.display = 'none';
      }

      alert("logout success.");

    } else {
      alert("logout failed.");
    }
  });
  


});

function info(token: string, repo: string) {
  if (adminId) {
    adminId.value = token;
  }
  if (adminRepo) {
    adminRepo.value = repo;
  }
}