const display = document.getElementById('result');
const buttons = document.querySelectorAll('button');

// Variables para almacenar los valores y el estado
let currentNumber = '';
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

// Agregamos event listeners a todos los botones
buttons.forEach(button => {
    button.addEventListener('click', () => handleButton(button.value));
});

// Función principal para manejar los clicks de los botones
function handleButton(value) {
    if (isNumber(value) || value === '.') {
        handleNumber(value);
    } else if (isOperator(value)) {
        handleOperator(value);
    } else if (value === '=') {
        handleEquals();
    } else if (value === 'clear') {
        clearCalculator();
    } else if (value === 'delete') {
        handleDelete();
    }
}

// Función para manejar números
function handleNumber(value) {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    // Evita múltiples puntos decimales
    if (value === '.' && display.value.includes('.')) return;
    display.value += value;
}

// Función para manejar operadores
function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.value);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        display.value = result;
        firstOperand = result;
    }

    shouldResetDisplay = true;
    operator = nextOperator;
}

// Función para realizar el cálculo
function calculate(first, second, op) {
    switch (op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second !== 0 ? first / second : 'Error';
        case '%':
            return (first * second) / 100;
        default:
            return second;
    }
}

// Función para manejar el botón igual
function handleEquals() {
    const inputValue = parseFloat(display.value);
    if (operator && firstOperand !== null) {
        display.value = calculate(firstOperand, inputValue, operator);
        firstOperand = null;
        operator = null;
        shouldResetDisplay = true;
    }
}

// Función para limpiar la calculadora
function clearCalculator() {
    display.value = '';
    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;
}

// Función para borrar el último dígito
function handleDelete() {
    display.value = display.value.slice(0, -1);
}

// Funciones auxiliares
function isNumber(value) {
    return !isNaN(value) && value !== ' ';
}

function isOperator(value) {
    return ['+', '-', '*', '/', '%'].includes(value);
}