import { mathOperationCalculationFromString, generateRandomOperation } from './calculator.js';
import { isEmpty, hasLetters, hasExactlyTwoOperands } from './validations.js';

const operationField = document.querySelector('#operation');
const calculateButton = document.querySelector('#calcButton');
const messageText = document.querySelector('#result');

function setOperation(value) {
  operationField.value = value;
}

function displayMessage(message) {
  messageText.innerText = message;
}

function onCalculateButtonClick() {
  const operation = operationField.value;
  if (isEmpty(operation)) {
    displayMessage('Write an operation first');
    return;
  }
  if (hasLetters(operation)) {
    displayMessage('Only numbers and basic operators are allowed');
    return;
  }
  if (hasExactlyTwoOperands(operation) === false) {
    displayMessage('Sorry, only 2 operands separated with spaces are allowed');
    return;
  }
  const result = mathOperationCalculationFromString(operation);
  displayMessage(`The result is ${result}`);
}

function setupEventListeners() {
  calculateButton.addEventListener('click', onCalculateButtonClick);
}

function main() {
  const randomOperation = generateRandomOperation();
  setOperation(randomOperation);
  setupEventListeners();
}

main();
