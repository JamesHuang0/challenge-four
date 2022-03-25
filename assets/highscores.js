var highScore = document.querySelector("#highScore");
var backBtn = document.querySelector("backBtn");

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    
    for (var i = 0; i <allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].name + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}

backBtn.addEventListener("click", function () {
    window.location.href="mrxanthic.github.io/challenge-four/"
});