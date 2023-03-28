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
        binaryInput.value = '';
    } else {
        decimalInput.value = '';
    }
};

converterButton.addEventListener('click', function() {
    let numericType = swapButton.getAttribute('active');
    let numericTypeValue;
    if(numericType === 'decimal'){
        numericTypeValue = decimalInput.value;
        const result = decimalToBinary(numericTypeValue);
        return binaryInput.value = result;
    } else {
        return numericTypeValue = binaryInput.value;
    }
});

//Cálculo Decimal para Binário
function decimalToBinary(value){ //recebe o valor
    let result = []; // cria um vetor para armazenar o resto da divisão
    let difference; // armazena o resto da divisão
    while(value >= 1) { // enquanto o valor for maior ou igual a 1, repete as operações abaixo
        difference = value%2; // retorna o resto da divisão do valor por 2
        value = Math.floor(value/2); // divide o valor por 2, arredondando para baixo
        result.unshift(difference); // adiciona o resto da divisão sempre na primeira posição do vetor
        console.log(value, difference, result);
    }
    return result.join(''); // concatena os valores do vetor result
}

// function reverseString(string){
//     let reversed = string.split('').reverse().join('');
//     return Number(reversed);
// }