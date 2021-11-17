export function isEmpty(operation) {
  return String(operation).trim() === '';
}

export function hasLetters(operation) {
  const cleanOperation = operation.replaceAll(' ', '');
  const onlyNumbers = /^[0-9\+\-\x\÷]+$/gm;
  const matches = cleanOperation.match(onlyNumbers);
  return matches === null || matches.length === 0;
}
export function hasExactlyTwoOperands(operation) {
  return operation.split(' ').length === 3;
}

export default {
  isEmpty,
  hasLetters,
  hasExactlyTwoOperands,
};
