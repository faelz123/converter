'use strict';

const swapButton = document.querySelector('.swapButton');
const binaryInput = document.querySelector('.binaryContainer input');
const decimalInput = document.querySelector('.decimalContainer input');
const binaryContainer = document.querySelector('.binaryContainer');
const decimalContainer = document.querySelector('.decimalContainer');
const converterButton = document.querySelector('.converterButton');
const mainContainer = document.querySelector('.container')
// const step1 = document.querySelector('.step1');
// const step2 = document.querySelector('.step2');


swapButton.addEventListener('click', function () {
    let numericType = swapButton.getAttribute('active');
    swapButtonAttribute(numericType);
    swapInputPositions(numericType);
    disableInactiveInput(numericType);
    eraseInactiveInput(numericType);
});

function swapButtonAttribute (type) {
   return (type === 'decimal') 
   ? swapButton.setAttribute('active', 'binary') 
   : swapButton.setAttribute('active', 'decimal');
};

function swapInputPositions(type) {
    if(type === 'decimal') {
        decimalContainer.style.order = 2;
        binaryContainer.style.order = 0;
    } else {
        decimalContainer.style.order = 0;
        binaryContainer.style.order = 2;
    }
};

function disableInactiveInput(type) {
    if(type === 'decimal') {
        decimalInput.setAttribute('readonly', '');
        binaryInput.removeAttribute('readonly');
    } else {
        binaryInput.setAttribute('readonly', '');
        decimalInput.removeAttribute('readonly');
    }
};

function eraseInactiveInput(type) {
    if(type === 'decimal') {
        decimalInput.value = '';
    } else {
        binaryInput.value = '';
    }
};

converterButton.addEventListener('click', function() {
    let numericType = swapButton.getAttribute('active');
    let numericTypeValue;
    if(numericType === 'decimal'){
        numericTypeValue = Number(decimalInput.value);
        const result = decimalToBinary(numericTypeValue);
        return binaryInput.value = result;
    } else {
        numericTypeValue = binaryInput.value;
        const result = binaryToDecimal(numericTypeValue);
        return decimalInput.value = result;
    }
});

//Cálculo Decimal para Binário
function decimalToBinary(value){ //recebe o valor
    let result = []; // cria um vetor para armazenar o resto da divisão
    let difference; // armazena o resto da divisão
    while(value >= 1) { // loop enquanto o valor for maior ou igual a 1, repete as operações abaixo
        difference = value%2; // retorna o resto da divisão do valor por 2
        value = Math.floor(value/2); // divide o valor por 2, arredondando para baixo
        result.unshift(difference); // adiciona o resto da divisão sempre na primeira posição do vetor
    }
    return result.join(''); // retorna os valores do vetor result concatenados
}

//Cálculo Binário para Decimal
function binaryToDecimal(value){ // recebe o valor
    let binaryArray = value.split('').reverse(); // transforma o valor em um vetor e inverte a ordem
    let result = 0; //armazena o resultado da somatatória
    const x = []; //armazena o resultado da exponenciação
    const resultsArray = [];
    const explanation = document.querySelector('.explanationContainer');
    const explanationDiv = createExplanationContainer(explanation);
    for(let i=0; i < binaryArray.length ; i++) { // loop em um contador 'i' que incrementa enquanto for menor que a quantidade de casas do vetor 
        x[i] = 2**i; // eleva o número 2 a posição do vetor 
        result += x[i]*binaryArray[i]; // multiplica o resultado armazenado em x pelo valor armazenado na posição i do vetor e soma com o resultado anterior
        resultsArray[i] = result;
    }
    binaryExplanation(explanationDiv, binaryArray, x, resultsArray);
    return result; //retorna o resultado final
}

// function binaryToDecimal(value){
//     let binaryArray = value.split('');
//     let result;
//     for(i=0; i < binaryArray.length ; i++) {
//         (binaryArray[i+1] !== undefined ) && (result += Number(binaryArray[i]*2)+Number(binaryArray[i+1]));
//         console.log(result);
//     }
//     return console.log(result);
// }

function binaryExplanation(explanation, binaryArray, exponentResults, results) {
    const step1 = binaryStepOne(binaryArray, exponentResults);
    const step2 = binaryStepTwo(binaryArray, exponentResults);
    const step3 = binaryStepThree(results);
    explanation.appendChild(step1);
    explanation.appendChild(step2);
    explanation.appendChild(step3);
}

function binaryStepOne(binaryArray, exponentResults) {
    const stepOneContainer = document.createElement('div');
    stepOneContainer.className = 'step1';
    const stepOneTitle = document.createElement('h2');
    stepOneTitle.className = 'stepOneTitle';
    stepOneTitle.textContent = 'Passo 1:'
    stepOneContainer.appendChild(stepOneTitle);
    const stepOneContent = document.createElement('p');
    stepOneTitle.appendChild(stepOneContent);
    binaryArray.forEach((binaryElement, i) => {
        const span = document.createElement('span');
        const brArrow = document.createElement('br');
        const arrowDown = '\u2193';
        const brResult = document.createElement('br');
        const exponentElement = document.createElement('sup');
        exponentElement.textContent = i;
        span.append(
            `${binaryElement}`,
            exponentElement,
            brArrow,
            arrowDown,
            brResult,
            `${exponentResults[i]}`
        );
        stepOneContent.appendChild(span);
    });
    return stepOneContainer;
}

function binaryStepTwo(binaryArray, exponentResults) {
    const stepTwoContainer = document.createElement('div');
    stepTwoContainer.className = 'step2';
    const stepTwoTitle = document.createElement('h2');
    stepTwoTitle.className = 'stepTwoTitle';
    stepTwoTitle.textContent = 'Passo 2:'
    stepTwoContainer.appendChild(stepTwoTitle);
    const stepTwoContent = document.createElement('p');
    stepTwoTitle.appendChild(stepTwoContent);
    let multiplicationResult = 0;
    binaryArray.forEach((binaryElement, i) => {
        multiplicationResult = binaryElement*exponentResults[i];
        const span = document.createElement('span');
        const brArrow = document.createElement('br');
        const arrowDown = '\u2193';
        const brResult = document.createElement('br');
        const exponentElement = document.createElement('sup');
        exponentElement.textContent = i;
        span.append(
            `${binaryElement}x`,
            `${exponentResults[i]}`,
            brArrow,
            arrowDown,
            brResult,
            `${multiplicationResult}`
        );
        stepTwoContent.appendChild(span);
    });
    return stepTwoContainer;
}

function binaryStepThree(results) {
    console.log(results);
    const stepThreeContainer = document.createElement('div');
    stepThreeContainer.className = 'step3';
    const stepThreeTitle = document.createElement('h2');
    stepThreeTitle.className = 'stepThreeTitle';
    stepThreeTitle.textContent = 'Passo 3:'
    stepThreeContainer.appendChild(stepThreeTitle);
    const stepThreeContent = document.createElement('p');
    stepThreeTitle.appendChild(stepThreeContent);
    let addNumber = 0;
    results.forEach((result, i) => {
        addNumber = results[i+1] - results[i];
        const span = document.createElement('span');
        const arrowDown = '\u2193';
        const partialContent = `${result}+${addNumber}<br>${arrowDown}<br>`;
        let finalResults = results[i+1];
        if(results.length-1 === i) {
            return; 
        } else if(results.length-2 === i) {
            span.insertAdjacentHTML('afterbegin',`${partialContent}<strong>${finalResults}</strong>`);
        } else {
            span.insertAdjacentHTML('afterbegin',`${partialContent}${finalResults}`);
        }
        stepThreeContent.appendChild(span);
    });
    return stepThreeContainer;
}

function cleanExplanation(explanationDiv) {
    return explanationDiv.remove();
}


function createExplanationContainer(explanationDiv) {
    (explanationDiv) && cleanExplanation(explanationDiv);
    const div = document.createElement('div');
    div.className = 'explanationContainer';
    mainContainer.appendChild(div);
    return div;
}

function createArrowIcon() {
    const arrowIcon = document.createElement('i');
    arrowIcon.className = 'fi fi-br-arrow-alt-down';
    return arrowIcon;
}

