let timeLeft = 60; // seconds

const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const feedback = document.getElementById("feedback");

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

// Start the game
newQuestion();
startTimer();
