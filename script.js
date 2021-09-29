const numberButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operations");
const allClear = document.querySelector(".all-clear");
const deleteNumber = document.querySelector(".delete");
const equalsTo = document.querySelector(".equals");
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");

let current = "";
let previous = "";
let operation = "";

numberButtons.forEach((button) => {
  button.addEventListener("click", buttonClick);
});

function buttonClick() {
  if(this.innerText === "." && current.includes(".")) return;
  if(this.innerText === "0" && current.length == 1 && current[0] === "0") return;
  current = current + this.innerText;
  updateDisplay();
}

allClear.addEventListener("click", () => {
  current = "";
  previous = "";
  operation = "";
  updateDisplay();
});

deleteNumber.addEventListener("click", () => {
  current = current.toString().slice(0, -1);
  updateDisplay();
});

operationButtons.forEach((button) => {
  button.addEventListener("click", operationClick);
});

function operationClick() {
  if(previous !== "") {
    calculation();
  }
  operation = this.innerText;
  previous = current;
  current = "";
  updateDisplay();
}

function numberFormat(number) {
  let stringNumber = number.toString();
  let integerPart = parseFloat(stringNumber.split(".")[0]);
  let decimalPart = stringNumber.split(".")[1];
  let integerDisplay;
  if(isNaN(integerPart)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerPart.toLocaleString("en-in");
  }
  if(decimalPart != null) {
    return `${integerDisplay}.${decimalPart}`
  } else {
    return integerDisplay
  }
}

function updateDisplay() {
  currentOperandTextElement.innerText = numberFormat(current);
  previousOperandTextElement.innerText = 
  `${numberFormat(previous)} ${operation}`;
}

equalsTo.addEventListener("click", () => {
  calculation();
  updateDisplay();
});

function calculation() {
  let result;
  if (current === "" || previous === "") return;
  switch (operation) {
    case "+":
      result = parseFloat(previous) + parseFloat(current);
      break;
    case "-":
      result = parseFloat(previous) - parseFloat(current);
      break;
    case "÷":
      result = parseFloat(previous) / parseFloat(current);
      break;
    case "×":
      result = parseFloat(previous) * parseFloat(current);
      break;
    default: 
      return
  }
  current = result;
  previous = "";
  operation = "";
}
