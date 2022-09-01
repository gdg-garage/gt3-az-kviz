function question() {
    alert("a");
}

var hexes = document.querySelectorAll(".hex .content");
var questionBox = document.querySelector("#question");

questionBox.querySelector("#close").addEventListener('click', () => {
    questionBox.style.display = "none";
    questionBox.querySelector("#answer").innerText = answer;
    questionBox.querySelector("#answer").style.display = "none";
});

hexes.forEach(hex => {
    hex.addEventListener('click', hex => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "http://localhost:8080/question", false);
        xmlHttp.send( null );
        var questionObject = JSON.parse(xmlHttp.responseText);

        question = questionObject["question"];
        answer = questionObject["answer"];

        var hx = hex.target.parentElement;
        questionBox.style.display = "block";
        questionBox.querySelector("#number").innerText = hx.querySelector(".content").textContent;

        questionBox.querySelector("#question-text").innerText = question;
        questionBox.querySelector("#answer").innerText = answer;

        questionBox.querySelector("#answer-button").onclick = () => {
            questionBox.querySelector("#answer").style.display = "block";
        };
        questionBox.querySelector("#blue").onclick = () => {
            hx.className = "hex blue";
        };
        questionBox.querySelector("#black").onclick = () => {
            hx.className = "hex black";
        };
        questionBox.querySelector("#orange").onclick = () => {
            hx.className = "hex orange";
        };
    });
});