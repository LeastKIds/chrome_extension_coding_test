// 로그인 버튼을 찾아서 변수에 할당합니다.
const loginButton = document.querySelector('button[type="submit"]');

// 로그인 버튼 클릭 이벤트 리스너를 추가합니다.
loginButton?.addEventListener('click', (event) => {
  // 폼 제출을 막습니다.
  event.preventDefault();

  // 아이디와 비밀번호 입력 필드의 값을 가져옵니다.
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  // 경고창으로 아이디와 비밀번호를 표시합니다.
  alert(`아이디: ${email}\n비밀번호: ${password}`);
});
