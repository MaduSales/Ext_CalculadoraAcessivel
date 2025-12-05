const themeBtn = document.getElementById("themeIcon");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});


const inputText = document.getElementById("input-text");
const resultText = document.getElementById("result");
const numberButtons = document.querySelectorAll(".numbers-grid button:not(.del):not(.equal)"); //Todos os botões, exceto DELETE e EQUAL
const operationButtons = document.querySelectorAll(".rowCalculations button");
const deleteButton = document.querySelector(".numbers-grid .del");
const equalButton = document.querySelector(".numbers-grid .equal");
const configButton = document.getElementById("configIcon");
const overlayConfig = document.getElementById("overlayConfig");
const closeConfig = document.getElementById("closeConfig");
const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");
const calculator = document.querySelector(".container-pai");
const overlayDuvidas = document.getElementById('overlayDuvidas');
const closeDuvidas = document.getElementById('closeDuvidas');
const btnDuvidas = document.getElementById('questionIcon');
const allQuestions = document.querySelectorAll('.question');


let fontSize = 16;
let scale = 1;

function appendToInput(char) {
  inputText.value += char;
}


// Usuário consegue selecionar os números
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    appendToInput(button.textContent); //Ao clicar em qualquer botão de número, é selecionado o texto do botão (o valor)
  });
});


// Usuário escolhe a operação
operationButtons.forEach(button => {
  let op;
  switch (button.id) {
    case "btnSoma": op = "+"; break; // A variável "op" tem seu valor atribuído de acordo com o ID do botão
    case "btnSubtracao": op = "-"; break;
    case "btnMultiplicacao": op = "*"; break; 
    case "btnDivisao": op = "/"; break;       
  }

  button.addEventListener("click", () => {
    appendToInput(op);
  });
});


// Função do botão Delete
deleteButton.addEventListener("click", () => {
  inputText.value = "";
  resultText.value = "";
});


// Função do botão Equal
equalButton.addEventListener("click", () => {
  try {
    const input = inputText.value;

    // Função para calcular manualmente
    function calcular(expression) {
      // Primeiro, separar números e operadores
      const numeros = expression.split(/[\+\-\*\/]/).map(Number); // Converte para números
      const operadores = expression.split('').filter(c => ['+', '-', '*', '/'].includes(c));

      // Faz primeiro multiplicação e divisão
      for (let i = 0; i < operadores.length; i++) {
        if (operadores[i] === '*') {
          numeros[i] = numeros[i] * numeros[i + 1];
          numeros.splice(i + 1, 1);
          operadores.splice(i, 1);
          i--;
        } else if (operadores[i] === '/') {
          numeros[i] = numeros[i] / numeros[i + 1];
          numeros.splice(i + 1, 1);
          operadores.splice(i, 1);
          i--;
        }
      }

      // Depois soma e subtração
      let resultado = numeros[0];
      for (let i = 0; i < operadores.length; i++) {
        if (operadores[i] === '+') resultado += numeros[i + 1];
        else if (operadores[i] === '-') resultado -= numeros[i + 1];
      }

      return resultado;
    }

    const resultado = calcular(input);
    resultText.value = resultado;
  } catch (error) {
    resultText.value = "Erro";
  }
});

// Função para abrir menu
configButton.addEventListener("click", () => {
  overlayConfig.classList.add("active");
});

// Fechar no X
closeConfig.addEventListener("click", () => {
  overlayConfig.classList.remove("active");
});

overlayConfig.addEventListener("click", (e) => {
  // Só fecha se clicar no fundo (overlay)
  if (e.target === overlayConfig) {
    overlayConfig.classList.remove("active");
  }
});


// Lógica para dar zoom e tirar zoom no menu
function moveCloseX() {
  const baseRight = 12;

  // Deslocamento proporcional ao zoom
  const move = (scale - 1) * 150;

  // Largura VISUAL (já escalada)
  const visualWidth = calculator.getBoundingClientRect().width;

  // Largura do X
  const xWidth = closeConfig.offsetWidth;

  // Limites seguros
  const minRight = 12;
  const maxRight = visualWidth - xWidth - 12;

  // Posição final clampada
  let finalRight = baseRight + move;
  finalRight = Math.max(minRight, Math.min(finalRight, maxRight));

  closeConfig.style.right = finalRight + "px";
}

// Zoom é aplicado na calculadora com limites
zoomIn.addEventListener("click", function () {
  if (scale < 1.4) {
    scale += 0.1;
    fontSize += 2;

    calculator.style.transform = "scale(" + scale + ")";
    calculator.style.fontSize = fontSize + "px";
    calculator.style.transformOrigin = "top center";

    moveCloseX();
  }
});


// Zoom é retirado da calculadora com limites
zoomOut.addEventListener("click", function () {
  if (scale > 0.8) {
    scale -= 0.1;
    fontSize -= 2;

    calculator.style.transform = "scale(" + scale + ")";
    calculator.style.fontSize = fontSize + "px";
    calculator.style.transformOrigin = "top center";

    moveCloseX(); 
  }
});

// Função menu de dúvidas
const toggleAnswer = (question) => {
  if (question.classList.contains('active')) {
    // Se já estava aberta, volta ao menu normal
    allQuestions.forEach(q => {
      q.style.display = "block";
      q.classList.remove('active');
    });
  } else {
    // Mostra apenas a pergunta selecionada
    allQuestions.forEach(q => {
      q.style.display = "none";
      q.classList.remove('active');
    });
    question.style.display = "block";
    question.classList.add('active');
  }
};

// Evento de clique em cada pergunta
allQuestions.forEach(question => {
  question.addEventListener('click', () => toggleAnswer(question));
});

// Abrir overlay de dúvidas
btnDuvidas.addEventListener('click', () => {
  overlayDuvidas.classList.add('active');
  allQuestions.forEach(q => {
    q.style.display = "block"; // Todas visíveis ao abrir
    q.classList.remove('active');
  });
});

// Fechar overlay com X
closeDuvidas.addEventListener('click', () => {
  overlayDuvidas.classList.remove('active');
  allQuestions.forEach(q => {
    q.style.display = "block"; // Todas visíveis ao voltar ao menu
    q.classList.remove('active');
  });
});

// Fechar overlay clicando no fundo
overlayDuvidas.addEventListener('click', (e) => {
  if (e.target === overlayDuvidas) {
    overlayDuvidas.classList.remove('active');
    allQuestions.forEach(q => {
      q.style.display = "block"; // Todas visíveis ao voltar ao menu
      q.classList.remove('active');
    });
  }
});

// Função para mover o botão "X" do overlay de dúvidas
function moveCloseDuvidas() {
  const baseRight = 12;

  // Deslocamento proporcional ao zoom
  const move = (scale - 1) * 70;

  // Largura VISUAL (já escalada)
  const visualWidth = calculator.getBoundingClientRect().width;

  // Largura do X
  const xWidth = closeDuvidas.offsetWidth;

  // Limites seguros
  const minRight = 12;
  const maxRight = visualWidth - xWidth - 12;

  // Posição final clampada
  let finalRight = baseRight + move;
  finalRight = Math.max(minRight, Math.min(finalRight, maxRight));

  closeDuvidas.style.right = finalRight + "px";
}

// Zoom é aplicado na calculadora com limites
zoomIn.addEventListener("click", function () {
  if (scale < 1.4) {
    scale += 0.1;
    fontSize += 2;

    calculator.style.transform = "scale(" + scale + ")";
    calculator.style.fontSize = fontSize + "px";
    calculator.style.transformOrigin = "top center";

    moveCloseX();  // Mover o "X" do botão de configuração
    moveCloseDuvidas();  // Mover o "X" do botão de dúvidas
  }
});

// Zoom é retirado da calculadora com limites
zoomOut.addEventListener("click", function () {
  if (scale > 0.8) {
    scale -= 0.1;
    fontSize -= 2;

    calculator.style.transform = "scale(" + scale + ")";
    calculator.style.fontSize = fontSize + "px";
    calculator.style.transformOrigin = "top center";

    moveCloseX(); // Mover o "X" do botão de configuração
    moveCloseDuvidas(); // Mover o "X" do botão de dúvidas
  }
});


// Função para ajustar o padding-left dos inputs conforme o zoom
function adjustInputPaddingLeft() {
  const inputs = document.querySelectorAll("input, textarea"); 
  
  // Calcula o novo padding-left proporcional ao zoom
  const newPaddingLeft = 30 * scale;  

  // Aplica o novo padding-left a todos os inputs
  inputs.forEach(input => {
    input.style.paddingLeft = `${newPaddingLeft}px`; 
  });
}

// Função para aplicar o zoom e ajustar o padding-left
zoomIn.addEventListener("click", function () {
  if (scale < 1.4) {
    scale += 0.1;
    fontSize += 2;

    calculator.style.transform = "scale(" + scale + ")";
    calculator.style.fontSize = fontSize + "px";
    calculator.style.transformOrigin = "top center";

    moveCloseX();
    adjustInputPaddingLeft();  
  }
});

zoomOut.addEventListener("click", function () {
  if (scale > 0.8) {
    scale -= 0.1;
    fontSize -= 2;

    calculator.style.transform = "scale(" + scale + ")";
    calculator.style.fontSize = fontSize + "px";
    calculator.style.transformOrigin = "top center";

    moveCloseX();
    adjustInputPaddingLeft(); 
  }
});