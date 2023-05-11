"use strict";

// const swapButton = document.querySelector(".swapButton");
const binaryInput = document.querySelector(".binaryContainer input");
const decimalInput = document.querySelector(".decimalContainer input");
const binaryContainer = document.querySelector(".binaryContainer");
const decimalContainer = document.querySelector(".decimalContainer");
const converterButton = document.querySelector(".converterButton");
const mainContainer = document.querySelector(".container");
const bitsSelect = document.getElementById("bits");
const customInput = document.getElementById("other");
const resultOutput = document.querySelector(".result");
let selectedValue;

function printResult(result) {
  let finalResult =
    (resultOutput.innerHTML = `Resultado: <span>${result}</span>`);
  return finalResult;
  // return resultOutput.insertAdjacentHTML(
  //   "afterbegin",
  //   `Resultado: <span>${result}</span>`
  // );
}

// const step1 = document.querySelector('.step1');
// const step2 = document.querySelector('.step2');

// swapButton.addEventListener("click", function () {
//   let numericType = swapButton.getAttribute("active");
//   swapButtonAttribute(numericType);
//   // swapInputPositions(numericType);
//   // disableInactiveInput(numericType);
//   // eraseInactiveInput(numericType);
// });

// function swapButtonAttribute(type) {
//   return type === "decimal"
//     ? swapButton.setAttribute("active", "binary")
//     : swapButton.setAttribute("active", "decimal");
// }

// function swapInputPositions(type) {
//   const bitsContainer = document.querySelector(".bitsContainer");
//   if (type === "decimal") {
//     decimalContainer.style.order = 2;
//     binaryContainer.style.order = 0;
//     return bitsContainer.classList.add("hidden");
//   } else {
//     decimalContainer.style.order = 0;
//     binaryContainer.style.order = 2;
//     return bitsContainer.classList.remove("hidden");
//   }
// }

function showCustomInput() {
  selectedValue = bitsSelect.value;
  selectedValue === "other"
    ? customInput.classList.remove("hidden")
    : customInput.classList.add("hidden");
}

// function disableInactiveInput(type) {
//   if (type === "decimal") {
//     decimalInput.setAttribute("readonly", "");
//     binaryInput.removeAttribute("readonly");
//   } else {
//     binaryInput.setAttribute("readonly", "");
//     decimalInput.removeAttribute("readonly");
//   }
// }

// function eraseInactiveInput(type) {
//   if (type === "decimal") {
//     decimalInput.value = "";
//   } else {
//     binaryInput.value = "";
//   }
// }

converterButton.addEventListener("click", function (event) {
  // let numericType = swapButton.getAttribute("active");
  let isDecimal = decimalContainer.classList.contains("hidden");
  let isBinary = binaryContainer.classList.contains("hidden");
  const decimalTo = decimalContainer.getAttribute("numeric-type");
  let numericTypeValue;
  if (!isDecimal) {
    if (decimalTo === "binary") {
      numericTypeValue = Number(decimalInput.value);
      const result = decimalToBinary(numericTypeValue);
      return printResult(result);
    }
  } else if (!isBinary) {
    numericTypeValue = binaryInput.value;
    const result = binaryToDecimal(numericTypeValue);
    return printResult(result);
  }
});

//Cálculo Decimal para Binário
function decimalToBinary(value) {
  //recebe o valor decimal
  const initialValue = value;
  const valueDivision = [value];
  //recebe tamanho de bits
  const customValue = customInput.value;
  const bitsSize = selectedValue === "other" ? customValue : selectedValue;
  console.log(bitsSize);
  let result = []; // cria um vetor para armazenar o resto da divisão
  let difference; // armazena o resto da divisão
  const explanation = document.querySelector(".explanationContainer");
  const explanationDiv = createExplanationContainer(explanation);
  while (value >= 1) {
    // loop enquanto o valor for maior ou igual a 1, repete as operações abaixo
    difference = value % 2; // retorna o resto da divisão do valor por 2
    value = Math.floor(value / 2); // divide o valor por 2, arredondando para baixo
    valueDivision.push(value);
    result.unshift(difference); // adiciona o resto da divisão sempre na primeira posição do vetor
  }
  decimalExplanation(explanationDiv, result, valueDivision, initialValue);
  return result.join("").padStart(bitsSize, 0); // retorna os valores do vetor result concatenados, adicionando ao ínicio o número de bits determinado.
}

//Cálculo Binário para Decimal
function binaryToDecimal(value) {
  // recebe o valor
  let binaryArray = value.split("").reverse(); // transforma o valor em um vetor e inverte a ordem
  let result = 0; //armazena o resultado da somatatória
  const x = []; //armazena o resultado da exponenciação
  const resultsArray = [];
  const explanation = document.querySelector(".explanationContainer");
  const explanationDiv = createExplanationContainer(explanation);
  for (let i = 0; i < binaryArray.length; i++) {
    // loop em um contador 'i' que incrementa enquanto for menor que a quantidade de casas do vetor
    x[i] = 2 ** i; // eleva o número 2 a posição do vetor
    result += x[i] * binaryArray[i]; // multiplica o resultado armazenado em x pelo valor armazenado na posição i do vetor e soma com o resultado anterior
    resultsArray[i] = result;
  }
  binaryExplanation(explanationDiv, binaryArray, x, resultsArray);
  return result; //retorna o resultado final
}

function binaryExplanation(explanation, binaryArray, exponentResults, results) {
  const step1 = binaryStepOne(binaryArray, exponentResults);
  const step2 = binaryStepTwo(binaryArray, exponentResults);
  const step3 = binaryStepThree(results);
  explanation.appendChild(step1);
  explanation.appendChild(step2);
  explanation.appendChild(step3);
}

function createStepsContent(stepTitleClass, stepTitleContent, stepContainer) {
  const stepOneTitle = document.createElement("h2");
  stepOneTitle.className = stepTitleClass;
  stepOneTitle.textContent = stepTitleContent;
  stepContainer.appendChild(stepOneTitle);
  const stepOneContent = document.createElement("p");
  stepContainer.appendChild(stepOneContent);
  return stepOneContent;
}

function createStepsContainer(step) {
  const stepContainer = document.createElement("div");
  stepContainer.className = step;
  return stepContainer;
}

function binaryStepOne(binaryArray, exponentResults) {
  const stepOneContainer = createStepsContainer("step1");
  // stepOneContainer.className = "step1";
  // const stepOneTitle = document.createElement("h2");
  // stepOneTitle.className = "stepOneTitle";
  // stepOneTitle.textContent = "Passo 1:";
  // stepOneContainer.appendChild(stepOneTitle);
  const stepOneContent = createStepsContent(
    "stepOneTitle",
    "Passo 1:",
    stepOneContainer
  );
  // stepOneContainer.appendChild(stepOneContent);
  binaryArray.forEach((binaryElement, i) => {
    const span = document.createElement("span");
    const brArrow = document.createElement("br");
    const arrowDown = "\u2193";
    const brResult = document.createElement("br");
    const exponentElement = document.createElement("sup");
    exponentElement.textContent = i;
    span.append(
      `2`,
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
  const stepTwoContainer = document.createElement("div");
  stepTwoContainer.className = "step2";
  const stepTwoTitle = document.createElement("h2");
  stepTwoTitle.className = "stepTwoTitle";
  stepTwoTitle.textContent = "Passo 2:";
  stepTwoContainer.appendChild(stepTwoTitle);
  const stepTwoContent = document.createElement("p");
  stepTwoContainer.appendChild(stepTwoContent);
  let multiplicationResult = 0;
  binaryArray.forEach((binaryElement, i) => {
    multiplicationResult = binaryElement * exponentResults[i];
    const span = document.createElement("span");
    const brArrow = document.createElement("br");
    const arrowDown = "\u2193";
    const brResult = document.createElement("br");
    const exponentElement = document.createElement("sup");
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
  const stepThreeContainer = document.createElement("div");
  stepThreeContainer.className = "step3";
  const stepThreeTitle = document.createElement("h2");
  stepThreeTitle.className = "stepThreeTitle";
  stepThreeTitle.textContent = "Passo 3:";
  stepThreeContainer.appendChild(stepThreeTitle);
  const stepThreeContent = document.createElement("p");
  stepThreeContainer.appendChild(stepThreeContent);
  let addNumber = 0;
  results.forEach((result, i) => {
    addNumber = results[i + 1] - results[i];
    console.log(addNumber);
    const span = document.createElement("span");
    const arrowDown = "\u2193";
    const partialContent = `${result}+${addNumber}<br>${arrowDown}<br>`;
    let finalResults = results[i + 1];
    console.log(finalResults);
    console.log(i, results.length - 1);
    if (results.length - 1 === i) {
      return;
    } else if (results.length - 2 === i) {
      span.insertAdjacentHTML(
        "afterbegin",
        `${partialContent}<strong>${finalResults}</strong>`
      );
    } else {
      span.insertAdjacentHTML("afterbegin", `${partialContent}${finalResults}`);
    }
    stepThreeContent.appendChild(span);
  });
  return stepThreeContainer;
}

function cleanExplanation(explanationDiv) {
  return explanationDiv.remove();
}

function createExplanationContainer(explanationDiv) {
  explanationDiv && cleanExplanation(explanationDiv);
  const div = document.createElement("div");
  div.className = "explanationContainer";
  mainContainer.appendChild(div);
  return div;
}

function decimalExplanation(explanation, result, valueDivision, initialValue) {
  console.log(valueDivision, result, initialValue);
  const step1 = decimalStepOne(valueDivision, result);
  const step2 = decimalStepTwo(valueDivision, result);
  explanation.appendChild(step1);
  explanation.appendChild(step2);
  return;
}

function decimalStepOne(valuesDivision, results) {
  const stepOneContainer = document.createElement("div");
  stepOneContainer.className = "step1";
  const stepOneTitle = document.createElement("h2");
  stepOneTitle.className = "stepOneTitle";
  stepOneTitle.textContent = "Passo 1:";
  stepOneContainer.appendChild(stepOneTitle);
  const stepOneContent = document.createElement("p");
  stepOneContainer.appendChild(stepOneContent);
  let difference;
  valuesDivision.forEach((value, i) => {
    difference = results[results.length - 1 - i];
    console.log(results.length - i, "dif");
    const span = document.createElement("span");
    const arrowDown = "\u2193";
    const divisionSign = "\u00f7";
    if (i !== valuesDivision.length - 1) {
      span.insertAdjacentHTML(
        "afterbegin",
        `${value} ${divisionSign} 2 <br> ${arrowDown} <br> ${
          valuesDivision[i + 1]
        } <br> ${arrowDown} <br> ${difference}`
      );
    } else {
      return;
    }
    stepOneContent.appendChild(span);
  });
  return stepOneContainer;
}

function decimalStepTwo(valuesDivision, results) {
  const stepTwoContainer = document.createElement("div");
  stepTwoContainer.className = "step2";
  const stepTwoTitle = document.createElement("h2");
  stepTwoTitle.className = "stepTwoTitle";
  stepTwoTitle.textContent = "Passo 2:";
  stepTwoContainer.appendChild(stepTwoTitle);
  const stepTwoContent = document.createElement("p");
  stepTwoContainer.appendChild(stepTwoContent);
  let difference;
  valuesDivision.forEach((value, i) => {
    difference = results[results.length - 1 - i];
    console.log(results.length - i, "dif");
    const span = document.createElement("span");
    const arrowDown = "\u2193";
    if (i !== valuesDivision.length - 1) {
      span.insertAdjacentHTML(
        "afterbegin",
        `${difference} <br> ${arrowDown} <br> <strong>${results[i]}</strong>`
      );
    } else {
      return;
    }
    stepTwoContent.appendChild(span);
  });
  return stepTwoContainer;
}
