alert("start!!")

// XPath를 사용하여 특정 요소를 찾는 함수
function getElementByXPath(xpath: string) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// 주어진 XPath에 해당하는 요소
const xpath = "/html/body/div[1]/div[2]/div/div/div[3]/div/div/div[1]/div/div/div[2]/div/div[2]/div/div[3]/div[1]/div/button";
const targetElement = getElementByXPath(xpath);

// 요소가 존재하면 클릭 이벤트 리스너를 추가
if (targetElement) {
    targetElement.addEventListener('click', function() {
        console.log('요소가 클릭되었습니다.');
        // 여기에 클릭 시 실행하고 싶은 함수나 로직을 작성하세요.
    });
} else {
    console.log('해당 XPath를 가진 요소를 찾을 수 없습니다.');
}
