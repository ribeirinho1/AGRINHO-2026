// ==========================================================================
// 1. Lógica do Dark Mode (Alternador de Tema)
// ==========================================================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
  }
});

// ==========================================================================
// 2. Banco de Dados do Quiz (5 Perguntas)
// ==========================================================================
const quizData = [
  {
    question: "Qual prática consiste em alternar espécies vegetais em uma mesma área?",
    options: ["Monocultura", "Rotação de Culturas", "Desmatamento", "Queimada Controlada"],
    correct: 1
  },
  {
    question: "Qual método de irrigação é considerado o mais econômico em consumo de água?",
    options: ["Inundação", "Aspersão Comum", "Gotejamento", "Sulco"],
    correct: 2
  },
  {
    question: "O controle biológico substitui o uso de qual produto químico?",
    options: ["Fertilizantes", "Agrotóxicos/Defensivos", "Adubo Orgânico", "Detergente"],
    correct: 1
  },
  {
    question: "A técnica que mantém restos vegetais na superfície do solo é chamada de:",
    options: ["Plantio Direto", "Arado Profundo", "Gradagem", "Terraceamento"],
    correct: 0
  },
  {
    question: "Qual tecnologia auxilia no mapeamento aéreo preciso das lavouras?",
    options: ["Trator convencional", "Enxada elétrica", "Drones Agrícolas", "Ensiladeira"],
    correct: 2
  }
];

// Variables de Estado do Quiz
let currentQuestionIndex = 0;
let score = 0;

// Elementos da DOM do Quiz
const questionText = document.getElementById('question-text');
const currentQuestionNum = document.getElementById('current-question');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const quizContent = document.getElementById('quiz-content');
const quizResult = document.getElementById('quiz-result');

// ==========================================================================
// 3. Funções do Quiz
// ==========================================================================
function loadQuestion() {
  resetQuestionState();
  const currentQuiz = quizData[currentQuestionIndex];
  
  // Atualiza número e texto da questão
  currentQuestionNum.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuiz.question;

  // Cria os botões das alternativas
  currentQuiz.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option-btn');
    button.addEventListener('click', () => selectOption(button, index));
    optionsContainer.appendChild(button);
  });
}

function resetQuestionState() {
  nextBtn.style.display = 'none';
  optionsContainer.innerHTML = '';
}

function selectOption(selectedButton, index) {
  const currentQuiz = quizData[currentQuestionIndex];
  const allButtons = optionsContainer.querySelectorAll('.option-btn');
  
  // Trava os botões para não clicar mais de uma vez
  allButtons.forEach(btn => btn.disabled = true);

  // Verifica resposta
  if (index === currentQuiz.correct) {
    selectedButton.classList.add('correct');
    score++;
  } else {
    selectedButton.classList.add('wrong');
    // Mostra a correta para o usuário aprender
    allButtons[currentQuiz.correct].classList.add('correct');
  }

  nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizContent.style.display = 'none';
  quizResult.style.display = 'block';
  
  let feedbackText = "";
  if (score === 5) feedbackText = "Perfeito! Você é um mestre da Agricultura Sustentável! 🌱🏆";
  else if (score >= 3) feedbackText = "Muito bom! Você conhece bem as práticas do campo! 🚜";
  else feedbackText = "Vale a pena ler as seções acima e tentar novamente! 📚🌾";

  quizResult.innerHTML = `
    <h3>Quiz Concluído!</h3>
    <p>Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas.</p>
    <p style="margin-top: 1rem; font-weight: bold; color: var(--cor-verde);">${feedbackText}</p>
    <button onclick="restartQuiz()" class="btn-quiz" style="margin-top: 1.5rem; max-width: 200px;">Refazer Quiz</button>
  `;
}

function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  quizResult.style.display = 'none';
  quizContent.style.display = 'block';
  loadQuestion();
}

// Inicializa o Quiz assim que a página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadQuestion);
} else {
  loadQuestion();
}

// ==========================================================================
// 4. Link Ativo no Menu conforme a Rolagem da Página
// ==========================================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let currentId = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 150) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
});