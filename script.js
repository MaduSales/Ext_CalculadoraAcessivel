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

// ABRIR MENU
configButton.addEventListener("click", () => {
  overlayConfig.classList.add("active");
});

// FECHAR NO X
closeConfig.addEventListener("click", () => {
  overlayConfig.classList.remove("active");
});