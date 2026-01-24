let timeLeft = 60; // seconds
let score = 0; // initialize score
let timerInterval; //

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const feedback = document.getElementById("feedback");
const restartBtn = document.getElementById("restart");

let num1, num2, correctAnswer;

// Generate a random number in a range
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a new question
function newQuestion() {
  num1 = randomNumber(1, 10);
  num2 = randomNumber(1, 10);
  correctAnswer = num1 + num2;

  questionEl.textContent = `${num1} + ${num2} = ?`;
  answerInput.value = "";
  answerInput.focus();
  feedback.textContent = "";
}

// End game function
function endGame() {
  clearInterval(timerInterval); 
  
  questionEl.textContent = "⏰ Time's up!";
  feedback.textContent = "Final Score: ${score}";
  feedback.style.color = "black"
  
  answerInput.style.display = "none";
  submitBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
}

// Timer function
function startTimer() {
  const timerInterval = setInterval(() => {
    timerEl.textContent = `Time: ${timeLeft}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// Check the answer
submitBtn.addEventListener("click", () => {
  if (answerInput.value.trim() === correctAnswer.toString()) {
    score++; // Updates score if correct
    scoreEl.textContent = `Score: ${score}`;
    newQuestion(); // immediately go to next question
    
  } else {
    feedback.textContent = "❌ Try again!";
    feedback.style.color = "red";
    answerInput.value = "";   // clear wrong answer
    answerInput.focus();      // cursor stays ready
  }
});

// Allow Enter key
answerInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitBtn.click();
});

// Restart game
restartBtn.addEventListener("click", () => {
  timeLeft = 60;
  score = 0;

  scoreEl.textContent = "Score: 0";
  timerEl.textContent = "Time: 60";

  answerInput.style.display = "inline-block";
  submitBtn.style.display = "inline-block";
  restartBtn.style.display = "none";

  newQuestion();
  startTimer();
});

// Start the game
newQuestion();
startTimer();
