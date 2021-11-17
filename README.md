# Test Runner

Jest like test runner for JavaScript code that runs in the browser. No installation needed.

## Usage

Create a test file, import the TT test runner from test-runner.js.

Add tests with

```javascript
TT.it('Test description', () => { ... });
```

Add specs with

```javascript
TT.spec('Spec tests', (tt) => { ... }
```

Add tests to the specs function with

```javascript
TT.spec('Spec tests', (tt) => {
  tt.it('Test description', () => { ... });
});
```

Check test results with

```javascript
TT.expect(result).toBe("exact value");
TT.expect(result).greaterThan(0);
TT.expect(result).lowerThan(9999);
TT.expect(result).isString();
```

More comparisons can be added to the test-runner expect function if needed.

Skip specs and tests with

```javascript
TT.skip.it( ...
TT.skip.spec( ...
```

Execute only these tests with

```javascript
TT.only.it( ...
TT.only.spec( ...
```

Run the tests in the main html file, loading the helper file with

```html
<script type="module" src="../test-runner-init.js"></script>
```

And finally open the console to see the tests running there.

## Example Calculator web app

An example web with two tests suites can be found in the calculator folder.

Run with:

```bash
npx http-server
```

Or any http-server.
