const questions = [
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
      { text: "Fe", correct: false },
      { text: "Hg", correct: false },
    ],
  },
  {
    question: "Which river is the longest in the world??",
    answers: [
      { text: "Amazon", correct: false },
      { text: "Nile", correct: true },
      { text: "Yangtze", correct: false },
      { text: "Mississippi", correct: false },
    ],
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    answers: [
      { text: "Brazil", correct: false },
      { text: "Germany", correct: false },
      { text: "France", correct: true },
      { text: "Argentina", correct: false },
    ],
  },
  {
    question: "Who is the co-founder of Microsoft Corporation?",
    answers: [
      { text: " Steve Jobs", correct: false },
      { text: "Bill Gates", correct: true },
      { text: "Mark Zuckerberg", correct: false },
      { text: "Elon Musk", correct: false },
    ],
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
      { text: "William Wordsworth", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Jane Austen", correct: false },
      { text: "Charles Dickens", correct: false },
    ],
  },
  {
    question:
      " In which film did Leonardo DiCaprio win his first Oscar for Best Actor?",
    answers: [
      { text: "Titanic", correct: false },
      { text: "The Revenant", correct: true },
      { text: "Inception", correct: false },
      { text: "The Wolf of Wall Street", correct: false },
    ],
  },
  {
    question: "What is the value of pi (π) to two decimal places?",
    answers: [
      { text: "3.14", correct: true },
      { text: "3.16", correct: false },
      { text: "3.12", correct: false },
      { text: "3.18", correct: false },
    ],
  },
  {
    question: "Who is known as the 'King of Pop'?",
    answers: [
      { text: "Madonna", correct: false },
      { text: "Michael Jackson", correct: true },
      { text: "Elvis Presley", correct: false },
      { text: "Whitney Houston", correct: false },
    ],
  },
  {
    question: "What is the capital city of Japan?",
    answers: [
      { text: "Seoul", correct: false },
      { text: "Beijing", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Bangkok", correct: false },
    ],
  },
  {
    question: "In which year did Christopher Columbus reach the Americas?",
    answers: [
      { text: "1492", correct: true },
      { text: "1607", correct: false },
      { text: "1776", correct: false },
      { text: "1453", correct: false },
    ],
  },
];

const questionEle = document.querySelector("#question");
const answerBtn = document.querySelector("#answerBtn");
const nextBtn = document.querySelector("#nextBtn");

let currQueIdx = 0;
let score = 0;

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showQuestions() {
  resetState();
  let currQue = questions[currQueIdx];
  let questionNo = currQueIdx + 1;
  questionEle.innerHTML = questionNo + ". " + currQue.question;
  currQue.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function startQuiz() {
  currQueIdx = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestions();
}

function showScore() {
  resetState();
  questionEle.innerHTML = `You scored ${score} out of ${questions.length}! `;
  nextBtn.innerHTML = "Play Again!";
  nextBtn.style.display = "block";
}

function handleNextBtn() {
  currQueIdx++;
  if (currQueIdx < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currQueIdx < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});
startQuiz();
