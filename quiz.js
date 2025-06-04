// Quiz questions array
const quizQuestions = [
    {
        question: "Which Pokemon is known as the 'Electric Mouse Pokemon'?",
        options: ["Raichu", "Pikachu", "Pichu", "Plusle"],
        correct: 1
    },
    {
        question: "What type is Charizard?",
        options: ["Fire", "Fire/Flying", "Fire/Dragon", "Dragon"],
        correct: 1
    },
    {
        question: "Which Pokemon is number 1 in the Pokedex?",
        options: ["Pikachu", "Mewtwo", "Bulbasaur", "Mew"],
        correct: 2
    },
    {
        question: "What is the evolution of Eevee that is weak to Fighting type?",
        options: ["Vaporeon", "Jolteon", "Flareon", "Umbreon"],
        correct: 3
    },
    {
        question: "Which Pokemon can learn the move 'Transform'?",
        options: ["Ditto", "Mew", "Mewtwo", "Zorua"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let quizStarted = false;

function startQuiz() {
    // Hide the main content
    document.querySelector('.search-container').style.display = 'none';
    document.querySelector('.search-history').style.display = 'none';
    document.getElementById('pokemonInfo').style.display = 'none';

    // Create quiz container if it doesn't exist
    if (!document.getElementById('quizContainer')) {
        const quizContainer = document.createElement('div');
        quizContainer.id = 'quizContainer';
        quizContainer.className = 'quiz-container';
        document.body.appendChild(quizContainer);
    }

    // Reset quiz state
    currentQuestion = 0;
    score = 0;
    quizStarted = true;

    // Show first question
    showQuestion();
}

function showQuestion() {
    const quizContainer = document.getElementById('quizContainer');
    const question = quizQuestions[currentQuestion];

    quizContainer.innerHTML = `
        <div class="quiz-content">
            <div class="quiz-header">
                <button onclick="returnToMain()" class="back-btn">← Back</button>
                <h2>Pokemon Quiz</h2>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: ${(currentQuestion / quizQuestions.length) * 100}%"></div>
            </div>
            <p class="question">${question.question}</p>
            <div class="options">
                ${question.options.map((option, index) => `
                    <button class="option-btn" onclick="checkAnswer(${index})">${option}</button>
                `).join('')}
            </div>
            <p class="score">Score: ${score}/${currentQuestion}</p>
        </div>
    `;
}

function checkAnswer(selectedOption) {
    const question = quizQuestions[currentQuestion];
    
    // Disable all buttons
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(button => button.disabled = true);

    // Check if answer is correct
    if (selectedOption === question.correct) {
        score++;
        buttons[selectedOption].classList.add('correct');
    } else {
        buttons[selectedOption].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
    }

    // Move to next question after a delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    const quizContainer = document.getElementById('quizContainer');
    const percentage = (score / quizQuestions.length) * 100;
    
    let message = '';
    if (percentage === 100) {
        message = 'Perfect! You\'re a Pokemon Master! 🏆';
    } else if (percentage >= 80) {
        message = 'Great job! You know your Pokemon! 🌟';
    } else if (percentage >= 60) {
        message = 'Good effort! Keep learning! 📚';
    } else {
        message = 'Keep practicing! You\'ll get better! 💪';
    }

    quizContainer.innerHTML = `
        <div class="quiz-content results">
            <div class="quiz-header">
                <button onclick="returnToMain()" class="back-btn">← Back</button>
                <h2>Quiz Complete!</h2>
            </div>
            <p class="final-score">Your Score: ${score}/${quizQuestions.length}</p>
            <p class="message">${message}</p>
            <div class="result-buttons">
                <button onclick="restartQuiz()" class="restart-btn">Try Again</button>
                <button onclick="returnToMain()" class="return-btn">Return to Search</button>
            </div>
        </div>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function returnToMain() {
    // Remove quiz container
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        quizContainer.remove();
    }

    // Show main content
    document.querySelector('.search-container').style.display = 'flex';
    document.querySelector('.search-history').style.display = 'block';
    document.getElementById('pokemonInfo').style.display = 'block';
} 