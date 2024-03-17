// let removeRuleBtn = document.getElementById("remove-rule");
// let ruleDiv = document.querySelector(".rule-display");
// let showRuleBtn = document.getElementById("show-rule");
let choices = document.querySelectorAll(".choice");
let userchoiceDiv = document.querySelector(".result-user");
let computerchoiceDiv = document.querySelector(".result-computer");
let choiceDiv = document.querySelector(".choices");
let resultDiv = document.querySelector(".results");
let playAgainBtn = document.querySelectorAll(".play-again");
let winnerDiv = document.querySelector(".winner");
let resultBtn = document.querySelector(".result-button");
let resultHeading1 = document.querySelector(".result-content-heading1");
let resultHeading2 = document.querySelector(".result-content-heading2");
let compDiv = document.querySelector(".comp-score");
let userDiv = document.querySelector(".user-score");
let nextBtn = document.querySelector(".next");
let showRuleBtn = document.querySelector(".show-rule");
let removeRuleBtn = document.getElementById("remove-rule");
let ruleDiv = document.querySelector(".rule-display");
let header = document.querySelector(".header");

nextBtn.addEventListener("click", () => {
  resultDiv.classList.add("hidden");
  winnerDiv.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  header.classList.add("hidden");
});

showRuleBtn.addEventListener("click", () => {
  ruleDiv.classList.remove("hidden");
});
removeRuleBtn.addEventListener("click", () => {
  ruleDiv.classList.add("hidden");
});

playAgainBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    choiceDiv.classList.remove("hidden");
    resultDiv.classList.add("hidden");
    winnerDiv.classList.add("hidden");
    nextBtn.classList.add("hidden");
    header.classList.remove("hidden");
  });
});

choices.forEach((option) => {
  option.addEventListener("click", (e) => {
    const choiceId = option.getAttribute("id");
    playGame(choiceId);
  });
});

const playGame = (choiceId) => {
  console.log(choiceId);
  const computerChoice = generateComputerChoice();
  console.log(computerChoice);
  if (choiceId === computerChoice) {
    draw(choiceId, computerChoice);
  } else {
    let userWin = true;
    if (choiceId === "stone") {
      //paper , scissor
      userWin = computerChoice === "paper" ? false : true;
    } else if (choiceId === "paper") {
      userWin = computerChoice === "stone" ? true : false;
    } else {
      userWin = computerChoice === "stone" ? false : true;
    }
    // console.log(userWin);
    showResult(choiceId, computerChoice, userWin);
  }
  choiceDiv.classList.add("hidden");
  resultDiv.classList.remove("hidden");
};
const showResult = (userChoice, computerChoice, userWin) => {
  userchoiceDiv.innerHTML = `<div class="choice-image ${userChoice} ${
    userWin ? "winner-design" : ""
  }">
    <img src="./images/${userChoice}.png" alt="${userChoice}" />
  </div>`;
  computerchoiceDiv.innerHTML = `<div class="choice-image ${computerChoice} ${
    userWin ? "" : "winner-design"
  }">
  <img src="./images/${computerChoice}.png" alt="${computerChoice}" />
</div>`;
  resultHeading1.innerText = userWin ? "You win" : "you lost";
  resultHeading2.innerText = "against pc";
  resultBtn.innerText = "play again";
  if (userWin) nextBtn.classList.remove("hidden");
  setScore(userWin);
};
const draw = (userChoice, computerChoice) => {
  let divContent = `<div class="choice-image ${userChoice}">
  <img src="./images/${userChoice}.png" alt="${userChoice}" />
</div>`;
  userchoiceDiv.innerHTML = divContent;
  computerchoiceDiv.innerHTML = divContent;
  resultHeading1.innerText = "Tie up";
  resultHeading2.innerText = "";
  resultBtn.innerText = "replay";
};
const generateComputerChoice = () => {
  const availableOption = ["stone", "paper", "scissor"];
  const randomNumber = Math.floor(Math.random() * 3);
  return availableOption[randomNumber];
};

const setScore = (userWin) => {
  if (userWin) {
    const currentUserScore = Number(localStorage.getItem("userScore"));
    localStorage.setItem("userScore", currentUserScore + 1);
  } else {
    const currentComputerScore = Number(localStorage.getItem("computerScore"));
    localStorage.setItem("computerScore", currentComputerScore + 1);
  }
  updateScoreDiv();
};
const updateScoreDiv = () => {
  const currentUserScore = Number(localStorage.getItem("userScore"));
  const currentComputerScore = Number(localStorage.getItem("computerScore"));
  userDiv.innerText = currentUserScore;
  compDiv.innerText = currentComputerScore;
};
window.addEventListener("load", updateScoreDiv);
