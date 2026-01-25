let timeLeft = 120; // seconds
let score = 0; // initialize score
let timerInterval; 
let difficulty = localStorage.getItem("difficulty") || "easy"; // Gets difficulty 

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const feedback = document.getElementById("feedback");
const restartBtn = document.getElementById("restart");
const homeBtn = document.getElementById("homeBtn"); 

let num1, num2, correctAnswer;

// Generate a random number in a range
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a new question
function newQuestion() {
  let maxNumber;

  switch (difficulty) {
    case "easy":
      maxNumber = 9;
      break;
    case "medium":
      maxNumber = 99;
      break;
    case "hard":
      maxNumber = 999;
      break;
    default:
      maxNumber = 9;
  }
  
  num1 = randomNumber(1, maxNumber);
  num2 = randomNumber(1, maxNumber);
  correctAnswer = num1 + num2;

  questionEl.textContent = `${num1} + ${num2} = __`;
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
  homeBtn.style.display = "inline-block";
}

// Sound effect for correct answers
function playDing() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "triangle"; // softer & sparkly
  oscillator.frequency.setValueAtTime(1400, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    900,
    audioCtx.currentTime + 0.12
  );

  gainNode.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.25,
    audioCtx.currentTime + 0.02
  );
  gainNode.gain.exponentialRampToValueAtTime(
    0.0001,
    audioCtx.currentTime + 0.15
  );

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.16);
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
  homeBtn.style.display = "none"; 

  newQuestion();
  startTimer();
});

// Back to main page event
homeBtn.addEventListener("click", () => {
  location.href = "index.html";
});

// Start the game
newQuestion();
startTimer();
