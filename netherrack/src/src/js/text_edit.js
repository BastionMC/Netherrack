// jesus christ the fucking line numbers are desynced im fucking loooooooooooooooosing it 😀😀😀😀😀😀😀😀😀😀😀😀😀

let codeArea = document.getElementById("codeArea");
let lineNumbers = document.getElementById("lineNumbers");

let content = document.getElementById("codeArea");

codeArea.addEventListener("wheel", updateScroll);
lineNumbers.addEventListener("wheel", updateScroll);

function updateScroll(event) {
    if (isScrollingUp(event)) {
        codeArea.scrollTop -= 32;
    } else {
        codeArea.scrollTop += 32;
    }
    lineNumbers.scrollTop = codeArea.scrollTop;
    console.log("scroll update")
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
    lineNumbers.scrollTop = codeArea.scrollTop;
};

codeArea.addEventListener("paste", (event) => {
    const startPosition = textarea.selectionStart;

    setTimeout(() => {
        const pastedText = event.clipboardData.getData("text");
        const endPosition = startPosition + pastedText.length;
        textarea.selectionStart = textarea.selectionEnd = endPosition;
    }, 0);
});