var timer = document.querySelector("#timer");
var startQuiz = document.querySelector("#startQuiz");
var questionsDiv = document.querySelector("#questionsDiv")
var timeLeft = 60;
var penalty = 10;
var currentTime = 0;
var questionIndex = 0;
var questionsCorrect = 0;
var ulCreate = document.createElement("ul");
var wrapper = document.querySelector("#wrapper");
var finalScore = 0;

var questionsArray = [
    {
        ask: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Java", "terminal", "bash", "console log"],
        answer: "console log"
    },
    {
        ask: "Commonly used data types DO NOT include:",
        choices: ["alerts", "booleans", "numbers", "strings"],
        answer: "alerts"
    },
    {
        ask: "The condition in an if / else statement is enclosed within ______.",
        choices: ["quotes", "curly brackets", "parantheses", "square brackets"],
        answer: "parantheses"
    },
    {
        ask: "Arrays in Javascript can be used to store ______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        ask: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        ask: "Which programming language can be used to consolidate different styles and spacing of elements on a website?",
        choices: ["HTML", "CSS", "Javascript", "C++"],
        answer: "CSS"
    },
];

// Starts timer by clicking button
startQuiz.addEventListener("click", function() {
    if (currentTime === 0) {
        currentTime = setInterval(function() {
            timeLeft--;
            timer.textContent = "Time: " + timeLeft + " seconds left";

            if (timeLeft <= 0) {
                clearInterval(currentTime);
                timesUp();
                timer.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex); 
});

// Checks answer choice against correct answer
function check(event) {
    var element = event.target;
    
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        
        if (element.textContent == questionsArray[questionIndex].answer) {
            questionsCorrect++;
            createDiv.textContent = "Correct! The answer is: " + questionsArray[questionIndex].answer;
        } else {
            timeLeft = timeLeft - penalty;
            createDiv.textContent = "Incorrect. The correct answer is: " + questionsArray[questionIndex].answer;
        }
    }

    questionIndex++;

    if (questionIndex >= questionsArray.length) {
        timesUp();
        createDiv.textContent = "Quiz complete. You scored " + questionsCorrect + "/6 questions correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

// Append last page after the last question is finished or time is up
function timesUp() {
    questionsDiv.innerHTML = "";
    timer.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Time's up!"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (timeLeft >= 0) {
        finalScore = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(currentTime);
        createP.textContent = "Your final score is: " + finalScore;

        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your name to record your score:";
    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "name");
    createInput.textContent = "";
    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function() {
        var name = createInput.value;

        if (name === null) {
            
            console.log("No value entered");

        } else {
            var highScore = {
                name: name,
                score: finalScore
            }
            console.log(highScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(highScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
        }
    });

}

// Renders quiz to page
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questionsArray.length; i++) {
        var quizQuestion = questionsArray[questionIndex].ask;
        var quizChoices = questionsArray[questionIndex].choices;

        questionsDiv.textContent = quizQuestion;
    }

    quizChoices.forEach(function (newItem) {
        var quizItem = document.createElement("li");
        quizItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(quizItem);
        quizItem.addEventListener("click", (check));
    })
}




