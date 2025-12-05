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
    // Calcula usando eval
    const resultado = eval(inputText.value);
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
