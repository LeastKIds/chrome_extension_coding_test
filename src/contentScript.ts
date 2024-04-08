import TurndownService from 'turndown';

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
    const codeExtensionXpath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[8]/div/div[1]/div[1]/div[1]/div/div/div[1]/div/button"
    const codeExtensionTag = getElementByXPath(codeExtensionXpath);
    let codeExtension = "";
    switch (codeExtensionTag?.textContent) {
        case "C++":
            codeExtension = "cpp";
            break;
        case "Java":
            codeExtension = "java";
            break;
        case "Python":
            codeExtension = "py";
            break;
        case "Python3":
            codeExtension = "py";
            break;
        case "C":
            codeExtension = "c";
            break;
        case "C#":
            codeExtension = "cs";
            break;
        case "JavaScript":
            codeExtension = "js";
            break;
        case "TypeScript":
            codeExtension = "ts";
            break;
        case "PHP":
            codeExtension = "php";
            break;
        case "Swift":
            codeExtension = "swift";
            break;
        case "Kotlin":
            codeExtension = "kt";
            break;
        case "Dart":
            codeExtension = "dart";
            break;
        case "Go":
            codeExtension = "go";
            break;
        case "Ruby":
            codeExtension = "rb";
            break;
        case "Scala":
            codeExtension = "scala";
            break;
        case "Rust":
            codeExtension = "rs";
            break;
        case "Racket":
            codeExtension = "rkt";
            break;
        case "Erlang":
            codeExtension = "erl";
            break;
        case "Elixir":
            codeExtension = "ex";
            break;
    }

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

        codeTxt += "\n";
       
    });

    const codeSpeedXpath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[7]/div[2]/div/div/div[2]/div/div[2]/div[1]/div/div[1]/div[2]"
    const codeSpeed = getElementByXPath(codeSpeedXpath)?.textContent;

    const codeSpeedRankingXpath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[7]/div[2]/div/div/div[2]/div/div[2]/div[1]/div/div[1]/div[3]/span[2]"
    const codeSpeedRanking = getElementByXPath(codeSpeedRankingXpath)?.textContent;

    const codeMemoryXpath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[7]/div[2]/div/div/div[2]/div/div[2]/div[1]/div/div[2]/div[2]"
    const codeMemory = getElementByXPath(codeMemoryXpath)?.textContent;

    const codeMemoryRankingXpath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[7]/div[2]/div/div/div[2]/div/div[2]/div[1]/div/div[2]/div[3]/span[2]"
    const codeMemoryRanking = getElementByXPath(codeMemoryRankingXpath)?.textContent;

    const titleXpath = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[1]/div[1]/div/a"
    const title = getElementByXPath(titleXpath)?.textContent;
    const changedTitle = formatFileName(title as string)

    const content = "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[3]"
    const contentResult = document.evaluate(content, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const contentNode = contentResult.singleNodeValue;

    if (contentNode !== null) {
        const markdown = convertHtmlToMarkdown((contentNode as Element).outerHTML);

        const message = {
            type: "github",
            data : {
                title: changedTitle,
                content: markdown,
                codeTxt: codeTxt,
                codeExtension: codeExtension,
                codeSpeed: codeSpeed,
                codeSpeedRanking: codeSpeedRanking,
                codeMemory: codeMemory,
                codeMemoryRanking: codeMemoryRanking
            }
        }

        chrome.runtime.sendMessage(message, function(response: any) {
            if (response.status) {
                console.log(response.data.message);
                alert("Success");
            } else {
                console.log(response.data.errMessage);
                alert(JSON.stringify(response));
            }
        });
    } else {
        console.log("content is null");
    }
}

// HTML 문자열을 마크다운으로 변환하는 함수
function convertHtmlToMarkdown(html: string): string {
    const turndownService = new TurndownService();
    return turndownService.turndown(html);
}


function formatFileName(fileName: string): string {
    // 파일 이름을 '.'을 기준으로 분리
    const parts = fileName.split('.');
    if (parts.length < 2) {
      console.error("File name does not contain a '.' separator.");
      return fileName;
    }
  
    // 첫 번째 부분(숫자)을 7자리로 포맷
    const numberPart = parts[0].padStart(7, '0');
    // 띄어쓰기를 '-'로 변환하고 나머지 부분과 합침
    const restOfTheName = parts.slice(1).join(' ').replace(/\s+/g, '-');
  
    // 포맷된 숫자 부분과 나머지 부분을 '_'로 연결하여 새로운 파일 이름 생성
    const newFileName = `${numberPart}_${restOfTheName}`;
  
    return newFileName;
  }