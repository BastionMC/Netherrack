// jesus christ the fucking line numbers are desynced im fucking loooooooooooooooosing it 😀😀😀😀😀😀😀😀😀😀😀😀😀

let codeArea = document.getElementById("codeArea");
let lineNumbers = document.getElementById("lineNumbers");

let content = document.getElementById("codeArea");

codeArea.addEventListener("wheel", updateScroll);
lineNumbers.addEventListener("wheel", updateScroll);

codeArea.addEventListener("input", setLineNumbers);

function setLineNumbers() {
    let lineCount = codeArea.value.split("\n").length;
    let newNumbers = "";
    for (let i=1; i<=lineCount; i++) {
        newNumbers += i+"<br>";
    }
    lineNumbers.innerHTML = newNumbers;
};

codeArea.addEventListener("paste", (event) => {
    const startPosition = textarea.selectionStart;

    setTimeout(() => {
        const pastedText = event.clipboardData.getData("text");
        const endPosition = startPosition + pastedText.length;
        textarea.selectionStart = textarea.selectionEnd = endPosition;
    }, 0);
});