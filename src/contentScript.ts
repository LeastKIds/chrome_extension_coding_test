alert("start!!")

// XPath를 사용하여 요소를 찾는 함수
function getElementByXPath(xpath: string) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
  
  // 동적 요소 감지 및 이벤트 추가를 위한 MutationObserver 콜백
  const callback = function(mutationsList: MutationRecord[], observer: MutationObserver) {
      // 특정 요소의 XPath
      const submitButton = "/html/body/div[1]/div[2]/div/div/div[3]/div/div/div[1]/div/div/div[2]/div/div[2]/div/div[3]/div[3]/div/button";
      const targetElement = getElementByXPath(submitButton);
  
      if (targetElement) {
          console.log('특정 버튼이 페이지에 존재합니다.');
          targetElement.addEventListener('click', () => {
              console.log('특정 버튼이 클릭되었습니다.');
              // 여기에 클릭 시 실행하고 싶은 추가적인 로직을 작성하세요.
          });
  
          // 요소가 발견되면 더 이상의 감지가 필요 없을 수 있으므로, observer를 중지할 수 있습니다.
          observer.disconnect();
      }
  };
  
  // MutationObserver 인스턴스 생성 및 실행
  const observer = new MutationObserver(callback);
  observer.observe(document.body, { childList: true, subtree: true });
  