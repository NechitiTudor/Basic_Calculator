let firstOperand = ''
let secondOperand = ''
let currentOperation = ''
let resetScreen = false

const nrsButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-operator]')
const deleteButton = document.getElementById('deleteButton')
const clearButton = document.getElementById('clearButton')
const pointButton = document.getElementById('pointButton')
const equalsButton = document.getElementById('equalsButton')
const previousOpScreen = document.getElementById('previousOperationScreen')
const currentOpScreen = document.getElementById('currentOperationScreen')

//window.addEventListener('keydown', handleKeyBoardInput)
deleteButton.addEventListener('click', deleteNumber)
clearButton.addEventListener('click', clearScreen)
equalsButton.addEventListener('click', displayResult)
//pointButton.addEventListener('click', addPoint)

nrsButtons.forEach((btn) =>
    btn.addEventListener('click', () => appendNumber(btn.textContent))
)

opButtons.forEach((btn) =>
    btn.addEventListener('click', () => setOperation(btn.textContent))
)

function appendNumber(nr) {
    if (currentOpScreen.textContent === '0' || resetScreen) {
        currentOpScreen.textContent = ''
        resetScreen = false
    }

    currentOpScreen.textContent += nr
}

function setOperation(op) {
    if (currentOperation !== '') {
        displayResult()
    }

    firstOperand = currentOpScreen.textContent
    currentOperation = op
    previousOpScreen.textContent = `${firstOperand} ${currentOperation}`
    resetScreen = true
}

function displayResult() {
    if (currentOperation === '' || resetScreen) return

    if (currentOperation === '÷' && currentOpScreen.textContent === '0') {
        alert('You cannot divide by 0!')
        return
    }

    secondOperand = currentOpScreen.textContent
    currentOpScreen.textContent = roundResult(calculate(firstOperand, secondOperand, currentOperation))
    previousOpScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = ''
}

function roundResult(nr) {
    return Math.round(nr * 100) / 100
}

function clearScreen() {
    currentOpScreen.textContent = '0'
    previousOpScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = ''
}

function deleteNumber(){
    currentOpScreen.textContent = currentOpScreen.textContent.toString().slice(0, -1)
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function calculate(a, b, op) {
    a = Number(a)
    b = Number(b)

    switch (op) {
        case '+':
            return add(a, b)
        case '-':
            return substract(a, b)
        case 'x':
            return multiply(a, b)
        case '÷':
            if (b === 0) return null
            else return divide(a, b)
        default:
            return null
    }
}

