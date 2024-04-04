// 토큰 버튼을 찾아서 변수에 할당합니다.
const loginButton = document.querySelector('button[type="submit"]');

// 토큰 버튼 클릭 이벤트 리스너를 추가합니다.
loginButton?.addEventListener('click', (event) => {
  // 폼 제출을 막습니다.
  event.preventDefault();

  // 토큰값 가져오기
  const TOKEN = (document.getElementById('token') as HTMLInputElement).value;

  chrome.runtime.sendMessage({ type: "login", data: {TOKEN: TOKEN} }, function(response: any) {
    console.log("Response from background:", response);
    alert(response.status)
    if (response.status) {
      alert("Login Success");
      const github_token = document.getElementById('github_token');
      if (github_token) {
        github_token.style.display = 'none';
      }

      const github_repo = document.getElementById('github_repo');
      if (github_repo) {
        github_repo.style.display = 'block';
      }

    } else {
      alert(JSON.stringify(response));
    }
    
  });


});
