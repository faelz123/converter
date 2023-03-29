'use strict';

const swapButton = document.querySelector('.swapButton');
const binaryInput = document.querySelector('.binaryContainer input');
const decimalInput = document.querySelector('.decimalContainer input');
const binaryContainer = document.querySelector('.binaryContainer');
const decimalContainer = document.querySelector('.decimalContainer');
const converterButton = document.querySelector('.converterButton');



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
    let x; //armazena o resultado da exponenciação
    let result = 0; //armazena o resultado da somatatória
    for(let i=0; i < binaryArray.length ; i++) { // loop em um contador 'i' que incrementa enquanto for menor que a quantidade de casas do vetor 
        x = 2**i; // eleva o número 2 a posição do vetor 
        result += x*binaryArray[i]; // multiplica o resultado armazenado em x pelo valor armazenado na posição i do vetor e soma com o resultado anterior
    }
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