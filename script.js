const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false; 

const calculate = {
    '+': (firstNumber, secondNumber) => firstNumber+secondNumber, 
    '-': (firstNumber, secondNumber) => firstNumber-secondNumber,
    '×': (firstNumber, secondNumber) => firstNumber*secondNumber,
    '÷': (firstNumber, secondNumber) => firstNumber/secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber
}

function sendNumberValue(number){ // When function sendNumberValue is used, receive number at the same time and put it on the below
    if(awaitingNextValue === true) {
        calculatorDisplay.textContent = number; // Display shows number
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        if(displayValue === '0') {
            calculatorDisplay.textContent = number;
        } else {
            calculatorDisplay.textContent = displayValue + number; // 0じゃなかったら、右に数字を追加
        }
    }
}

function addDecimal() {
    if(awaitingNextValue=== true) return;
    const checkDecimal = calculatorDisplay.textContent;
    if(!checkDecimal.includes('.')) {
         calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator) { //useOperator が押された時、operatorを引数として取って、下記に入れる
    let currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operator
    if(awaitingNextValue === true && operatorValue) { //waitingNextValueがtrue、operatorValueの中身がある時、
        operatorValue = operator; //operatorValueは、引数operatorに
        return; //処理終了
    }
    // Assign firstValue if no value
    if(!firstValue) {
        firstValue = currentValue;
    } else if(firstValue) {
        const calculation = (calculate[operatorValue](firstValue, currentValue));
        firstValue = calculation;
        calculatorDisplay.textContent = calculation;
    }
    awaitingNextValue = true;  
    operatorValue = operator;
}

// Add eventlister for all
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', ()=> sendNumberValue(inputBtn.value))
    } else if(inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', ()=> useOperator(inputBtn.value))
    } else if(inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', ()=>addDecimal());
    }
});

// Reset display
function resetAll (num) {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false; 
    calculatorDisplay.textContent = num;
}

clearBtn.addEventListener('click', ()=> resetAll(0))