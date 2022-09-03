var time = 60;
var intervalId;

function question() {
    alert("a");
}

function getQuestion() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://localhost:8080/question", false);
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

function timer(time) {
    if (intervalId !== null) {
        clearInterval(intervalId);
    }
    var timer = document.querySelector("#timer");
    timer.style.color = "black";
    timer.textContent = time + "s"
    intervalId = setInterval(() => {
        time--;
        timer.textContent = time + "s"
        if (time == 0) {
            clearInterval(intervalId);
            timer.style.color = "red";
            return false;
        }
    }, 1000)
}

var hexes = document.querySelectorAll(".hex");
var questionBox = document.querySelector("#question");

questionBox.querySelector("#close").addEventListener('click', () => {
    questionBox.style.display = "none";
    questionBox.querySelector("#answer").innerText = answer;
    questionBox.querySelector("#answer").style.display = "none";
});

hexes.forEach(hex => {
    hex.addEventListener('click', hex => {
        let hx = hex.target;
        while (!hx.classList.contains("hex")) {
           hx = hx.parentNode;
        }
        timer(time);

        var questionObject = getQuestion();

        question = questionObject["question"];
        answer = questionObject["answer"];

        questionBox.style.display = "block";
        questionBox.querySelector("#number").innerText = hx.textContent;

        questionBox.querySelector("#question-text").innerText = question;
        questionBox.querySelector("#answer").innerText = answer;

        questionBox.querySelector("#answer-button").onclick = () => {
            questionBox.querySelector("#answer").style.display = "block";
        };
        questionBox.querySelector("#time").onclick = () => {
            timer(time);
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