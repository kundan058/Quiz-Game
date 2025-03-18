const questions = [
    { question: "Which animal cannot jump?", answers: [
        {text: "Dog", correct: false},
        {text: "Elephant", correct: true},
        {text: "Tiger", correct: false},
        {text: "Cat", correct: false},
    ]},
    { question: "Which is the smallest continent?", answers: [
        {text: "Asia", correct: false},
        {text: "Australia", correct: true},
        {text: "Arctic", correct: false},
        {text: "Africa", correct: false},
    ]},
    { question: "What is the capital of France?", answers: [
        { text: "Rome", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Paris", correct: true }
    ]},
    { question: "Who wrote 'Hamlet'?", answers: [
        { text: "Hemingway", correct: false },
        { text: "Shakespeare", correct: true },
        { text: "Tolstoy", correct: false },
        { text: "Dickens", correct: false }
    ]},
    { question: "What is the largest planet in our Solar System?", answers: [
        { text: "Earth", correct: false },
        { text: "Jupiter", correct: true },
        { text: "Mars", correct: false },
        { text: "Venus", correct: false }
    ]},
    { question: "How many continents are there?", answers: [
        { text: "5", correct: false },
        { text: "6", correct: false },
        { text: "8", correct: false },
        { text: "7", correct: true }
    ]},
    { question: "What is the chemical symbol for gold?", answers: [
        { text: "Ag", correct: false },
        { text: "Pb", correct: false },
        { text: "Au", correct: true },
        { text: "Fe", correct: false }
    ]},
    { question: "Who painted the Mona Lisa?", answers: [
        { text: "Michelangelo", correct: false },
        { text: "Van Gogh", correct: false },
        { text: "Picasso", correct: false },
        { text: "Leonardo da Vinci", correct: true }
    ]},
    { question: "Which is the fastest land animal?", answers: [
        { text: "Lion", correct: false },
        { text: "Cheetah", correct: true },
        { text: "Tiger", correct: false },
        { text: "Leopard", correct: false }
    ]},
    { question: "How many sides does a hexagon have?", answers: [
        { text: "5", correct: false },
        { text: "7", correct: false },
        { text: "6", correct: true },
        { text: "8", correct: false }
    ]},
    { question: "What gas do plants absorb from the atmosphere?", answers: [
        { text: "Hydrogen", correct: false },
        { text: "Carbon Dioxide", correct: true },
        { text: "Oxygen", correct: false },
        { text: "Nitrogen", correct: false }
    ]},
    { question: "Which is the smallest country in the world?", answers: [
        { text: "Vatican City", correct: true },
        { text: "Monaco", correct: false },
        { text: "San Marino", correct: false },
        { text: "Liechtenstein", correct: false }
    ]}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressText = document.getElementById("progress");
const timerText = document.getElementById("timer");
const highScoreText = document.getElementById("high-score");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let highScore = localStorage.getItem("quizHighScore") || 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    updateHighScore();
}

function showQuestion() {
    reset();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = currentQuestion.question;
    progressText.innerHTML = `Question ${questionNo} of ${questions.length}`;
    startTimer();

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function reset() {
    nextButton.style.display = "none";
    clearInterval(timer);
    timeLeft = 10;
    timerText.innerHTML = `Time Left: ${timeLeft}s`;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    clearInterval(timer);
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    reset();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("quizHighScore", highScore);
        updateHighScore();
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerText.innerHTML = `Time Left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextButton.style.display = "block";
        }
    }, 1000);
}

function updateHighScore() {
    highScoreText.innerHTML = `High Score: ${highScore}`;
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();