let codeArea = document.getElementById("codeArea");
let lineNumbers = document.getElementById("lineNumbers");

codeArea.addEventListener("wheel", updateScroll);

function updateScroll(event) {
    if (isScrollingUp(event)) {
        codeArea.scrollTop -= 32;
    } else {
        codeArea.scrollTop += 32;
    }
    lineNumbers.scrollTop = codeArea.scrollTop
}

function isScrollingUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}

codeArea.addEventListener("input", setLineNumbers);

function setLineNumbers() {
    let lineCount = codeArea.value.split("\n").length;
    let newNumbers = "";
    for (let i=1; i<=lineCount; i++) {
        newNumbers += i+"<br>";
    }
    lineNumbers.innerHTML = newNumbers;
};