import { isEmpty, hasLetters, hasExactlyTwoOperands } from './validations.js';
import TT from '../test-runner.js';

TT.spec('Operation validations', (tt) => {
  tt.it('Should check if a trimmed operation is empty', () => {
    let result = isEmpty(' ');
    TT.expect(result).toBe(true);
    result = isEmpty('123');
    TT.expect(result).toBe(false);
  });

  tt.it('Should check if an operation has letters', () => {
    let result = hasLetters('abc');
    TT.expect(result).toBe(true);
    result = hasLetters('abc 123');
    TT.expect(result).toBe(true);
    result = hasLetters('123');
    TT.expect(result).toBe(false);
    result = hasLetters('6 ÷ 8');
    TT.expect(result).toBe(false);
    result = hasLetters('A ÷ B');
    TT.expect(result).toBe(true);
  });

  tt.it('Should check if an operation has more than two operands', () => {
    let result = hasExactlyTwoOperands('1 + 2');
    TT.expect(result).toBe(true);
    result = hasExactlyTwoOperands('213');
    TT.expect(result).toBe(false);
    result = hasExactlyTwoOperands('2 + 1 + 3');
    TT.expect(result).toBe(false);
  });
});
