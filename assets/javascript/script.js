//Quiz Data questions and correct answers
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
        options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
        correct: "Albert Einstein",
    },
    {
        question: "What is the largest mammal on Earth?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: "Blue Whale",
    },
    {
        question: "Which famous artist painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: "Leonardo da Vinci",
    },
    {
        question: "Which playwright wrote the tragedy 'Romeo and Juliet'?",
        options: ["William Shakespeare", "George Bernard Shaw", "Oscar Wilde", "Charles Dickens"],
        correct: "William Shakespeare",
    },
    {
        question: "Who is known as the father of modern physics?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"],
        correct: "Albert Einstein",
    },
    {
        question: "Which ancient wonder of the world was a massive statue of the Greek god Zeus?",
        options: ["Great Pyramid of Giza", "Hanging Gardens of Babylon", "Statue of Zeus at Olympia", "Colossus of Rhodes"],
        correct: "Statue of Zeus at Olympia",
    },
    {
        question: "Who wrote the novel 'Pride and Prejudice'?",
        options: ["Emily Brontë", "Charlotte Brontë", "Jane Austen", "Louisa May Alcott"],
        correct: "Jane Austen",
    },
    {
        question: "Who was the Ancient Greek God of the Sun?",
        options: ["Aphrodite", "Hepheastus", "Apollo", "Poseidon"],
        correct: "Apollo",
    },
    {
        question: "Who was the Ancient Greek God of the Ocean?",
        options: ["Aphrodite", "Hepheastus", "Apollo", "Poseidon"],
        correct: "Poseidon",
    },
    {
        question: "How many faces does a Dodecahedron have?",
        options: ["10", "20", "14", "12"],
        correct: "12",
    },
    {
        question: "What is the 4th letter of the Greek alphabet?",
        options: ["Alpha", "Beta", "Delta", "Gamma"],
        correct: "Delta",
    },
    {
        question: "What is acrophobia a fear of?",
        options: ["Falling", "Heights", "Flying", "Spiders"],
        correct: "Heights",
    },
    {
        question: "How many dots appear on a pair of dice?",
        options: ["40", "42", "46", "44"],
        correct: "42",
    },
    {
        question: "On which continent would you find the world’s largest desert?",
        options: ["Africa", "Austalasia", "Europe", "Antartica"],
        correct: "Antartica",
    },
    {
        question: "What animal has the largest brain relative to body size?",
        options: ["Horse", "Elephant", "Dophin", "Shark"],
        correct: "Dolphin",
    },
    {
        question: "What comes but never arrives?",
        options: ["My Birthday", "The Future", "Validation", "Tomorrow"],
        correct: "Tomorrow",
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Gd", "G"],
        correct: "Au",
    },
    {
        question: "What is the chemical symbol for potassium?",
        options: ["Pt", "P", "K", "V"],
        correct: "K",
    },
    {
        question: "What is the name of the home of the Greek Gods?",
        options: ["Olympus", "Valhalla", "Elysium", "Atlantis"],
        correct: "Olympus",
    },
    {
        question: "What gives a reply but can’t talk when spoken to?",
        options: ["A parrot", "A mirror", "An echo", "My phone"],
        correct: "An echo",
    },
    {
        question: "What question can you never answer yes to?",
        options: ["Are you awake?", "Are you asleep?", "Are you okay?", "Are you there yet?"],
        correct: "Are you asleep?",
    },
    {
        question: "What is so fragile that saying its name breaks it?",
        options: ["Vase", "Glass", "Cobweb", "Silence"],
        correct: "Silence",
    },
    {
        question: "What comes down but never goes up?",
        options: ["Leaves", "Sun", "Rain", "Balloons"],
        correct: "Rain",
    },
];

//Declare variables
const quizTriviaContainer = document.querySelector(".quiz-trivia-example-container");
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

//Shuffle the order of the quiz questions function
const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);

//Reset local storage containing previous user answers
const resetLocalStorage = () => {
    for (i = 0; i < MAX_QUESTIONS; i++) {
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();

//Check if answer equals correct function
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

//Create question function
const createQuestion = () => {
    clearInterval(timerInterval);

    let secondsLeft = 9;
    const timerDisplay = document.querySelector(".quiz-container .timer");
    timerDisplay.classList.remove("danger");

    //Time left display
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

//Retake quiz function
const retakeQuiz = () => {
    //Reset variables to default
    questionNumber = 0;
    score = 0;
    quizData = shuffleArray(quizData);
    resetLocalStorage();

    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";
};

//Display Quiz results function
const displayQuizResult = () => {
    scrollTo(0, 0);
    quizResult.style.display = "grid";
    //quizResult.style.visibility = "visible"; // Reveals Quiz Results Container
    quizTriviaContainer.style.display = "none";
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
            resultItem.classList.add("correct");
        }

        resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${
            quizData[i].question
        }</div>
        <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
        <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;

        quizResult.appendChild(resultItem);
    }

    //Retake Quiz button
    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = "Retake Quiz";
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);

    const retakeQuizText = document.createElement("p");
    retakeQuizText.innerText = "Click the 'Reload this Page' button at the top left to return to the home page or Click on the Retake Quiz button to take the quiz again";
    quizResult.appendChild(retakeQuizText);
};

const displayNextQuestion = () => {
    if (questionNumber >= MAX_QUESTIONS - 1) {
        displayQuizResult();
        return;
    }

    questionNumber++;
    createQuestion();
};

//Next button Event listner
nextBtn.addEventListener("click", displayNextQuestion);

//Start button Event listner
startBtn.addEventListener("click", () => {
    startBtnContainer.style.display = "none"; // Hides Start button when clicked on
    //quizContainer.style.display = "block";
    quizContainer.style.visibility = "visible"; // Reveals Quiz Container
    createQuestion();
});