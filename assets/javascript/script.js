let quizData = [{
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
        correct: "Tokyo",
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        correct: "Mars",
    },
    {
        question: "Which famous scientist developed the theory of general relativity?",
        options: [
            "Isaac Newton",
            "Albert Einstein",
            "Stephen Hawking",
            "Galileo Galilei",
        ],
        correct: "Albert Einstein",
    },
    {
        question: "What is the largest mammal on Earth?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: "Blue Whale",
    },
    {
        question: "Which famous artist painted the Mona Lisa?",
        options: [
            "Vincent van Gogh",
            "Pablo Picasso",
            "Leonardo da Vinci",
            "Michelangelo",
        ],
        correct: "Leonardo da Vinci",
    },
    {
        question: "Which playwright wrote the tragedy 'Romeo and Juliet'?",
        options: [
            "William Shakespeare",
            "George Bernard Shaw",
            "Oscar Wilde",
            "Charles Dickens",
        ],
        correct: "William Shakespeare",
    },
    {
        question: "Who is known as the father of modern physics?",
        options: [
            "Isaac Newton",
            "Albert Einstein",
            "Galileo Galilei",
            "Niels Bohr",
        ],
        correct: "Albert Einstein",
    },
    {
        question: "Which ancient wonder of the world was a massive statue of the Greek god Zeus?",
        options: [
            "Great Pyramid of Giza",
            "Hanging Gardens of Babylon",
            "Statue of Zeus at Olympia",
            "Colossus of Rhodes",
        ],
        correct: "Statue of Zeus at Olympia",
    },
    {
        question: "Who wrote the novel 'Pride and Prejudice'?",
        options: [
            "Emily Brontë",
            "Charlotte Brontë",
            "Jane Austen",
            "Louisa May Alcott",
        ],
        correct: "Jane Austen",
    },
    {
        question: "Who was the Ancient Greek God of the Sun?",
        options: [
            "Aphrodite",
            "Hepheastus",
            "Apollo",
            "Poseidon",
        ],
        correct: "Apollo",
    },
    {
        question: "Who was the Ancient Greek God of the Sun?",
        options: [
            "Aphrodite",
            "Hepheastus",
            "Apollo",
            "Poseidon",
        ],
        correct: "Apollo",
    },
    {
        question: "Who was the Ancient Greek God of the Sun?",
        options: [
            "Aphrodite",
            "Hepheastus",
            "Apollo",
            "Poseidon",
        ],
        correct: "Apollo",
    },
    {
        question: "How many faces does a Dodecahedron have?",
        options: [
            "10",
            "20",
            "14",
            "12",
        ],
        correct: "12",
    },
    {
        question: "What is the 4th letter of the Greek alphabet?",
        options: [
            "Alpha",
            "Beta",
            "Delta",
            "Gamma",
        ],
        correct: "Delta",
    },
    {
        question: "What is acrophobia a fear of?",
        options: [
            "Falling",
            "Heights",
            "Flying",
            "Spiders",
        ],
        correct: "Heights",
    },
];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 10;
let timerInterval;

const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
    for (i = 0; i < MAX_QUESTIONS; i++) {
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();

const checkAnswer = (e) => {
    let allOptions = document.querySelectorAll(".quiz-container .option");
    allOptions.forEach((o) => {
        o.classList.remove("correct");
        o.classList.remove("incorrect");
    });
    let userAnswer = e.target.textContent;
    if (userAnswer === quizData[questionNumber].correct) {
        score++;
        e.target.classList.add("correct");
    } else {
        e.target.classList.add("incorrect");
    }

    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);
};

const createQuestion = () => {
    clearInterval(timerInterval);

    let secondsLeft = 9;
    const timerDisplay = document.querySelector(".quiz-container .timer");
    timerDisplay.classList.remove("danger");

    timerDisplay.textContent = `Time Left: 10 seconds`;

    timerInterval = setInterval(() => {
        timerDisplay.textContent = `Time Left: ${secondsLeft
            .toString()
            .padStart(2, "0")} seconds`;
        secondsLeft--;

        if (secondsLeft < 3) {
            timerDisplay.classList.add("danger");
        }

        if (secondsLeft < 0) {
            clearInterval(timerInterval);
            displayNextQuestion();
        }
    }, 1000);

    options.innerHTML = "";
    question.innerHTML = `<span class='question-number'>${
        questionNumber + 1
        }/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

    const shuffledOptions = shuffleArray(quizData[questionNumber].options);

    shuffledOptions.forEach((o) => {
        const option = document.createElement("button");
        option.classList.add("option");
        option.innerHTML = o;
        option.addEventListener("click", (e) => {
            checkAnswer(e);
        });
        options.appendChild(option);
    });
};

const retakeQuiz = () => {
    questionNumber = 0;
    score = 0;
    quizData = shuffleArray(quizData);
    resetLocalStorage();

    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";
};

const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";

    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}.`;
    quizResult.appendChild(resultHeading);

    for (let i = 0; i < MAX_QUESTIONS; i++) {
        const resultItem = document.createElement("div");
        resultItem.classList.add("question-container");

        const userAnswer = localStorage.getItem(`userAnswer_${i}`);
        const correctAnswer = quizData[i].correct;

        let answeredCorrectly = userAnswer === correctAnswer;

        if (!answeredCorrectly) {
            resultItem.classList.add("incorrect");
        } else {
            resultItem.classList.add("correct")
        }

        resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${
            quizData[i].question
        }</div>
        <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
        <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;

        quizResult.appendChild(resultItem);
    }

    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = "Retake Quiz";
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);
    quizResult.append("Click the 'Reload this Page' button at the top left to return to the home page")
};

const displayNextQuestion = () => {
    if (questionNumber >= MAX_QUESTIONS - 1) {
        displayQuizResult();
        return;
    }

    questionNumber++;
    createQuestion();
};

nextBtn.addEventListener("click", displayNextQuestion);

startBtn.addEventListener("click", () => {
    startBtnContainer.style.display = "none";
    quizContainer.style.display = "block";
    createQuestion();
});