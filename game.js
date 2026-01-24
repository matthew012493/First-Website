let timeLeft = 120; // seconds
let score = 0; // initialize score
let timerInterval; 

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
  feedback.textContent = `Final Score: ${score}`;
  feedback.style.color = "black"
  
  answerInput.style.display = "none";
  submitBtn.style.display = "none";
  scoreEl.style.display = "none";
  restartBtn.style.display = "inline-block";
}

// Sound effect for correct answers
function playDing() {
  const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "sine";        // sine wave
  oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // 800 Hz
  gainNode.gain.setValueAtTime(0.25, audioCtx.currentTime);        // volume

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1); // play for 0.1 sec
}


// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
    timerEl.textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
      return;
    }

    timeLeft--;
      
  }, 1000);
}

// Check the answer
submitBtn.addEventListener("click", () => {
  if (answerInput.value.trim() === correctAnswer.toString()) {
    score++; // Updates score if correct
    scoreEl.textContent = `Score: ${score}`;
    playDing(); // Sound for correct answers
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
  scoreEl.style.display = "block";
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
