const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const submitButton = document.getElementById('submit-btn');
const timerElement = document.getElementById('time');

const questions = [
    {
        question: 'What is the capital city of Australia?',
        answers: [
          { text: 'Sydney', correct: false },
          { text: 'Melbourne', correct: false },
          { text: 'Canberra', correct: true },
          { text: 'Perth', correct: false }
        ]
      },
      {
        question: 'What is the largest planet in our solar system?',
        answers: [
          { text: 'Mars', correct: false },
          { text: 'Jupiter', correct: true },
          { text: 'Earth', correct: false },
          { text: 'Venus', correct: false }
        ]
      },
      {
        question: 'What is the smallest country in the world?',
        answers: [
          { text: 'Vatican City', correct: true },
          { text: 'Monaco', correct: false },
          { text: 'Nauru', correct: false },
          { text: 'San Marino', correct: false }
        ]
      },
      {
        question: 'What is the tallest mountain in the world?',
        answers: [
          { text: 'Mount Kilimanjaro', correct: false },
          { text: 'Mount Everest', correct: true },
          { text: 'Denali', correct: false },
          { text: 'Mount Aconcagua', correct: false }
        ]
      },
      {
        question: 'Who painted the Mona Lisa?',
        answers: [
          { text: 'Vincent van Gogh', correct: false },
          { text: 'Leonardo da Vinci', correct: true },
          { text: 'Pablo Picasso', correct: false },
          { text: 'Claude Monet', correct: false }
        ]
      },
      {
        question: 'What is the largest ocean in the world?',
        answers: [
          { text: 'Atlantic Ocean', correct: false },
          { text: 'Indian Ocean', correct: false },
          { text: 'Arctic Ocean', correct: false },
          { text: 'Pacific Ocean', correct: true }
        ]
      },
      {
        question: 'What is the capital city of Spain?',
        answers: [
          { text: 'Madrid', correct: true },
          { text: 'Barcelona', correct: false },
          { text: 'Seville', correct: false },
          { text: 'Valencia', correct: false }
        ]
      },
      {
        question: 'Who wrote the book "The Great Gatsby"?',
        answers: [
          { text: 'Ernest Hemingway', correct: false },
          { text: 'F. Scott Fitzgerald', correct: true },
          { text: 'Harper Lee', correct: false },
          { text: 'J.D. Salinger', correct: false }
        ]
      },
      {
        question: 'What is the currency of Japan?',
        answers: [
          { text: 'Dollar', correct: false },
          { text: 'Euro', correct: false },
          { text: 'Yen', correct: true },
          { text: 'Pound', correct: false }
        ]
      },
      {
        question: 'What is the largest continent in the world?',
        answers: [
          { text: 'North America', correct: false },
          { text: 'South America', correct: false },
          { text: 'Europe', correct: false },
          { text: 'Asia', correct: true }
        ]
      }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

function startQuiz() {
  showQuestion(questions[currentQuestionIndex]);
  startTimer();
}

function showQuestion(question) {
  questionContainer.innerHTML = '';
  const questionElement = document.createElement('h2');
  questionElement.innerText = question.question;
  questionContainer.appendChild(questionElement);

  const answersElement = document.createElement('div');
  question.answers.forEach(answer => {
    const label = document.createElement('label');
    label.innerText = answer.text;

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'answer';
    radio.value = answer.text;
    radio.addEventListener('click', () => {
      submitButton.disabled = false;
    });

    label.appendChild(radio);
    answersElement.appendChild(label);
  });

  questionContainer.appendChild(answersElement);
}

function startTimer() {
  timer = setInterval(() => {
    timerElement.innerText = parseInt(timerElement.innerText) - 1;
    if (parseInt(timerElement.innerText) === 0) {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);
  questionContainer.innerHTML = '';
  const resultElement = document.createElement('h2');
  resultElement.innerText = `Your final score is ${score}/${questions.length}`;
  questionContainer.appendChild(resultElement);
}

function submitAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) return;

  const answerText = selectedAnswer.value;
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = currentQuestion.answers.find(answer => answer.text === answerText).correct;
  if (isCorrect) {
    score++;
  }

  currentQuestionIndex++;
  selectedAnswer.checked = false;
  submitButton.disabled = true;

  if (currentQuestionIndex >= questions.length) {
    endQuiz();
  } else {
    showQuestion(questions[currentQuestionIndex]);
  }
}

submitButton.addEventListener('click', submitAnswer);

startQuiz();
