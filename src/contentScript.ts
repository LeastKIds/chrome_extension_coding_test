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
        targetElement.addEventListener('click', () => {
            console.log('특정 버튼이 클릭되었습니다.');
            clickSubmitButton();
        });

        // 요소가 발견되면 더 이상의 감지가 필요 없을 수 있으므로, observer를 중지할 수 있습니다.
        observer.disconnect();
    }
};
  
// MutationObserver 인스턴스 생성 및 실행
const observer = new MutationObserver(callback);
observer.observe(document.body, { childList: true, subtree: true });

function clickSubmitButton() {
  // 동적 요소 감지를 위한 새로운 MutationObserver 콜백
  const clickCallback = function(mutationsList: MutationRecord[], observer: MutationObserver) {
    // 원하는 요소의 XPath
    const successTagXPath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[7]/div[2]/div/div/div[2]/div/div[1]/div[1]/div[1]/span";
    const successElement = getElementByXPath(successTagXPath);

    if (successElement) {
      // 여기에 원하는 요소를 처리하는 로직을 추가하세요.
      if (successElement.textContent === "Accepted") {
        console.log('성공적으로 처리되었습니다.');
        infoExtraction();
      }

      // 요소가 발견되면 더 이상의 감지가 필요 없으므로, observer를 중지합니다.
      observer.disconnect();
    }
  };

  // MutationObserver 인스턴스 생성 및 실행
  const clickObserver = new MutationObserver(clickCallback);
  clickObserver.observe(document.body, { childList: true, subtree: true });
}


  
// XPath를 사용하여 특정 요소를 찾는 함수
function getElementByXPathChildren(xpath: string): Element | null {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as Element;
  }

// 특정 요소의 바로 아래에 있는 자식들만 가져오는 함수
function getImmediateChildrenByXPath(xpath: string): Element[] {
    const parentElement = getElementByXPathChildren(xpath);
    let children: Element[] = [];

    if (parentElement) {
        // HTMLCollection을 Element[] 타입으로 변환
        children = Array.from(parentElement.children);
    }

    return children;
}
  

function infoExtraction() {
    const codesXpath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[8]/div/div[2]/div[1]/div/div/div[1]/div[2]/div[1]/div[5]"
    const codes = getImmediateChildrenByXPath(codesXpath);

    let codeTxt: string = "";

    codes.forEach((code) => {
        const codeWrapper = code.firstElementChild
        
        if (codeWrapper) {
            for (const c of Array.from(codeWrapper.children)) {
                codeTxt += c.textContent
            }
        }
       
    });

    console.log(codeTxt);
}

