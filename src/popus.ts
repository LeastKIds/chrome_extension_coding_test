// 토큰 버튼을 찾아서 변수에 할당합니다.
const loginButton = document.querySelector('button[type="submit"]');

// 토큰 버튼 클릭 이벤트 리스너를 추가합니다.
loginButton?.addEventListener('click', (event) => {
  // 폼 제출을 막습니다.
  event.preventDefault();

  // 토큰값 가져오기
  const token = (document.getElementById('token') as HTMLInputElement).value;

  fetch('https://api.github.com').then(response => response.json()).then(data => {
    alert(JSON.stringify(data))
  })
});
