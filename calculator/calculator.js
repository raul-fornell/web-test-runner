export function mathOperationCalculationFromString(operation) {
  const parts = operation.split(' ');
  const before = Number(parts[0]);
  const operand = parts[1];
  const after = Number(parts[2]);
  let result = 0;
  switch (operand) {
    case '+':
      result = before + after;
      break;
    case '-':
      result = before - after;
      break;
    case 'x':
      result = before * after;
      break;
    case '÷':
      result = before / after;
      break;
    default:
      result = 0;
  }
  return result;
}

export function randomNumber(length) {
  return Math.round(Math.random() * length);
}

export function generateRandomOperation() {
  const before = randomNumber(10);
  const operand = '+-x÷'.split('')[randomNumber(3)];
  const after = randomNumber(10);
  return `${before} ${operand} ${after}`;
}

export default {
  mathOperationCalculationFromString,
  randomNumber,
  generateRandomOperation,
};
