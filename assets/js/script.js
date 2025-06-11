 const calculator = document.querySelector('.calculator');
    const keys = calculator.querySelector('.keys');
    const display = calculator.querySelector('.display span');

    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let resultDisplayed = false;

    keys.addEventListener('click', (event) => {
      const key = event.target;
      const action = key.dataset.action;
      const keyContent = key.textContent;

      if (!key.classList.contains('key')) return;

      // Handle clear
      if (action === 'clear') {
        currentInput = '';
        previousInput = '';
        operator = '';
        display.textContent = '0';
        return;
      }

      // Handle delete
      if (action === 'delete') {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || '0';
        return;
      }

      // Handle decimal
      if (action === 'decimal') {
        if (!currentInput.includes('.')) {
          currentInput += '.';
          display.textContent = currentInput;
        }
        return;
      }

      // Handle calculate
      if (action === 'calculate') {
        if (currentInput && previousInput && operator) {
          const result = calculate(previousInput, currentInput, operator);
          display.textContent = result;
          previousInput = result;
          currentInput = '';
          resultDisplayed = true;
        }
        return;
      }

      // Handle operator
      if (action === 'operator') {
        if (currentInput) {
          if (previousInput && operator) {
            previousInput = calculate(previousInput, currentInput, operator);
          } else {
            previousInput = currentInput;
          }
          currentInput = '';
        }
        operator = keyContent;
        return;
      }

      // Handle numbers
      if (resultDisplayed) {
        currentInput = keyContent;
        resultDisplayed = false;
      } else {
        currentInput += keyContent;
      }
      display.textContent = currentInput;
    });

    function calculate(prev, curr, op) {
      const a = parseFloat(prev);
      const b = parseFloat(curr);
      if (isNaN(a) || isNaN(b)) return 'Error';
      switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : '∞';
        default: return 'Error';
      }
    }