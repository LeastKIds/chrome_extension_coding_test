// 토큰 버튼을 찾아서 변수에 할당합니다.
const loginButton = document.querySelector('button[type="submit"]');

// 토큰 버튼 클릭 이벤트 리스너를 추가합니다.
loginButton?.addEventListener('click', (event) => {
  // 폼 제출을 막습니다.
  event.preventDefault();

  // 토큰값 가져오기
  const TOKEN = (document.getElementById('token') as HTMLInputElement).value;

  chrome.runtime.sendMessage({type: "login", data: {TOKEN: TOKEN}}, (response: {status: string, data?: any}) => {
    if (response.status == "true") {
      alert(`Login success! User: ${response.data.login}`);
      console.log("Login success! User: ", response.data.login)
    } else {
      alert(response.data.errorCode)
      console.log(response.data.errorCode)
    }

    console.log("testesets")
  });
});
