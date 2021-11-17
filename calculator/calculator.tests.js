import { mathOperationCalculationFromString, randomNumber, generateRandomOperation } from './calculator.js';
import TT from '../test-runner.js';

TT.spec('Math operations', (tt) => {
  tt.it('Should add up 1 + 1 and return 2', () => {
    const result = mathOperationCalculationFromString('1 + 1');
    TT.expect(result).toBe(2);
  });

  tt.it('Should subtract 3 - 1 and return 2', () => {
    const result = mathOperationCalculationFromString('3 - 1');
    TT.expect(result).toBe(2);
  });

  tt.it('Should add up 5.5 + 3.3 and return 8.8', () => {
    const result = mathOperationCalculationFromString('5.5 + 3.3');
    TT.expect(result).toBe(8.8);
  });

  tt.it('Should multiply 3 x 3 and return 9', () => {
    const result = mathOperationCalculationFromString('3 x 3');
    TT.expect(result).toBe(9);
  });

  tt.it('Should divide 6 / 2 and return 3', () => {
    const result = mathOperationCalculationFromString('6 ÷ 2');
    TT.expect(result).toBe(3);
  });
});

TT.it('Should return a random number between 0 and 5', () => {
  const values = new Set();
  for (let i = 0; i < 100; i += 1) {
    const result = randomNumber(5);
    TT.expect(result).greaterThan(-1);
    TT.expect(result).lowerThan(6);
    values.add(result);
  }
  const sortedValues = Array.from(values).sort().toString();
  TT.expect(sortedValues).toBe('0,1,2,3,4,5');
});

TT.it('Should generate a valid random operation like 4 x 5', () => {
  const operation = generateRandomOperation();
  TT.expect(operation).isString();
});
