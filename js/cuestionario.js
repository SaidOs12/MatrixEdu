// Respuestas correctas del cuestionario
const correctAnswers = {
    q1: "a",
    q2: "b",
    q3: "b",
    q4: "a",
    q5: "a",
    q6: "a",
    q7: "a",
    q8: "a",
    q9: "a",
    q10: "a",
    q11: "b",
    q12: "a",
    q13: "a",
    q14: "a",
    q15: "a",
    q16: "b",
    q17: "a",
    q18: "a",
    q19: "a",
    q20: "a"
};

// Tiempo inicial en segundos (20 minutos)
let timeLeft = 20 * 60; // 20 minutos
let timerId = null;

// Función para formatear el tiempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Función para actualizar el temporizador
function updateTimer() {
    const timerDisplay = document.getElementById('timer');
    if (timeLeft <= 0) {
        clearInterval(timerId);
        evaluateQuiz();
    } else {
        timerDisplay.textContent = formatTime(timeLeft);
        timeLeft--;
    }
}

// Función para reiniciar el formulario
function resetQuiz() {
    document.getElementById('quizForm').reset();
    timeLeft = 20 * 60; // Reinicia a 20 minutos
    document.getElementById('timer').textContent = formatTime(timeLeft);
    document.getElementById('resultSection').style.display = 'none';
    startTimer();
}

// Función para iniciar el temporizador
function startTimer() {
    if (timerId) {
        clearInterval(timerId);
    }
    timerId = setInterval(updateTimer, 1000);
}

// Función para evaluar el cuestionario
function evaluateQuiz() {
    let score = 0;
    const questions = Object.keys(correctAnswers);
    
    questions.forEach(question => {
        const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === correctAnswers[question]) {
            score++;
        }
    });

    const resultSection = document.getElementById('resultSection');
    const scoreDisplay = document.getElementById('score');
    resultSection.style.display = 'block';

    if (score >= 14) {
        scoreDisplay.innerHTML = `
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">¡Felicitaciones!</h4>
                <p>Has aprobado el cuestionario con ${score} respuestas correctas de 20.</p>
            </div>
        `;
        setTimeout(() => {
            window.location.href = 'finalizacion.html';
        }, 3000);
    } else {
        scoreDisplay.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">No has alcanzado el mínimo requerido</h4>
                <p>Has obtenido ${score} respuestas correctas de 20. Necesitas al menos 14 para aprobar.</p>
                <p>El cuestionario se reiniciará en 5 segundos...</p>
            </div>
        `;
        setTimeout(resetQuiz, 5000);
    }
}

// Evento que se ejecuta cuando el documento está listo
document.addEventListener('DOMContentLoaded', function() {
    startTimer();
    
    // Evento para el botón de enviar
    document.getElementById('submitQuiz').addEventListener('click', function(e) {
        e.preventDefault();
        clearInterval(timerId);
        evaluateQuiz();
    });

    // Prevenir envío del formulario con Enter
    document.getElementById('quizForm').addEventListener('submit', function(e) {
        e.preventDefault();
    });
});