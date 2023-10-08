let runningTotal = 0;
let buffer = '0';
let previousOperator;
let isError = false; // Variável para rastrear se ocorreu um erro

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isError && value === 'C') {
        clearCalculator();
        isError = false; // Limpa o erro com um único clique em "C"
        return;
    }

    if (isError) {
        return; // Impede a interação após um erro
    }

    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            clearCalculator();
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            if (previousOperator === '÷' && buffer === '0') {
                // Verificar divisão por zero
                isError = true;
                buffer = 'Error';
                break;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString(); // Converte o resultado em string
            runningTotal = 0;
            break;
        case '←':
            handleBackspace();
            break;
        default:
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '−':
            runningTotal -= intBuffer;
            break;
        case '×':
            runningTotal *= intBuffer;
            break;
        case '÷':
            runningTotal /= intBuffer;
            break;
    }
}

function handleNumber(numberString) {
    if (isError) {
        return; // Impede a entrada de números após um erro
    }

    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function clearCalculator() {
    buffer = '0';
    runningTotal = 0;
    previousOperator = null;
    isError = false; // Limpa a flag de erro
}

function handleBackspace() {
    if (buffer.length === 1) {
        buffer = '0';
    } else {
        buffer = buffer.substring(0, buffer.length - 1);
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    });
}

init();