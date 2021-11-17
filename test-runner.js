let tempExpected = 0;
let tempPassed = 0;
const onlyTests = [];
const onlySpecs = [];
const runners = {};
const results = { passed: 0, failed: 0, skipped: 0 };
function compareAndPrint(comparison, failMessage, value, result) {
  if (comparison) {
    console.log(`%c ✘ Assertion fails, value ${value} ${failMessage} ${result}`, 'color:red');
    return 0;
  }
  console.log('%c ✔ pass', 'color:GreenYellow');
  return 1;
}

function updateResults(allExpectsPass) {
  if (allExpectsPass) {
    results.passed += 1;
  } else {
    results.failed += 1;
  }
}

function runFunc(func) {
  func();
}

function specCanRun(specTitle) {
  return onlySpecs.length === 0 || onlySpecs.includes(specTitle) === true;
}

function testCanRun(title) {
  return onlyTests.length === 0 || onlyTests.includes(title) === true;
}

const TT = {
  skip: {
    it() {
      results.skipped += 1;
    },
    spec(title, func) {
      func({
        it() {
          results.skipped += 1;
        },
      });
    },
  },
  only: {
    it(title, testFunc) {
      onlyTests.push(title);
      const parentRunner = getRunnerById(this.parent);
      parentRunner.tests.push(parentRunner.createTest(title, testFunc));
    },
    spec(title, func) {
      onlySpecs.push(title);
      const parentRunner = getRunnerById(this.parent);
      parentRunner.specs.push(parentRunner.createSpec(title, func));
    },
  },
  it(title, testFunc) {
    this.tests.push(this.createTest(title, testFunc));
  },
  createTest(title, testFunc) {
    return () => {
      if (testCanRun(title)) {
        console.log(`%c ${title}`, 'color:yellow');
        tempExpected = 0;
        tempPassed = 0;
        testFunc();
        updateResults(tempExpected === tempPassed);
        tempExpected = 0;
        tempPassed = 0;
      } else {
        results.skipped += 1;
      }
    };
  },
  spec(title, func) {
    this.specs.push(this.createSpec(title, func));
  },
  createSpec(specTitle, setupTestsFunc) {
    return () => {
      if (specCanRun(specTitle)) {
        const tt = newRunner({ specTitle });
        setupTestsFunc(tt);
        tt.runAllTests();
      }
    };
  },
  expect(result) {
    return {
      toBe(value) {
        tempExpected += 1;
        const c = result !== value;
        tempPassed += compareAndPrint(c, 'is not', value, result);
      },
      greaterThan(value) {
        tempExpected += 1;
        const c = value > result;
        tempPassed += compareAndPrint(c, 'is not greater than', value, result);
      },
      lowerThan(value) {
        tempExpected += 1;
        const c = value < result;
        tempPassed += compareAndPrint(c, 'is not lower than', value, result);
      },
      isString(value) {
        tempExpected += 1;
        const c = typeof value === 'string' || value instanceof String;
        tempPassed += compareAndPrint(c, 'is not a string', value, result);
      },
    };
  },
  runAllTests() {
    if (!this.specTitle) {
      console.log('%cStart test runner', 'color:yellow');
    } else {
      console.log(`%cStart spec ${this.specTitle}`, 'color:yellow');
    }
    if (specCanRun(this.specTitle)) {
      this.tests.forEach(runFunc);
    } else {
      results.skipped += this.tests.length;
    }
    this.specs.forEach(runFunc);
    if (!this.specTitle) {
      console.log(`%c ${results.passed} passed`, 'color:GreenYellow;');
      console.log(`%c ${results.failed} failed`, 'color:red;');
      console.log(`%c ${results.skipped} skipped`, 'color:grey;');
      console.log(`%c from ${results.passed + results.failed} total tests`, 'color:yellow;');
      if (results.passed > 0 && results.failed === 0 && results.skipped === 0) {
        console.log('%c All tests pass!!!', 'color:GreenYellow;');
      }
    }
  },
};

function newRunner(extra) {
  const id = Math.random();
  const runner = {
    ...TT,
    only: {
      parent: id,
      it: TT.only.it,
      spec: TT.only.spec,
    },
    ...{ specs: [], tests: [] },
    ...extra,
  };
  runners[`r${id}`] = runner;
  return runner;
}

function getRunnerById(id) {
  return runners[`r${id}`];
}

export default newRunner();
