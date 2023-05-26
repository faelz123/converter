"use strict";

// const swapButton = document.querySelector(".swapButton");
const binaryInput = document.querySelector(".binaryContainer input");
const decimalInput = document.querySelector(".decimalContainer input");
const binaryContainer = document.querySelector(".binaryContainer");
const decimalContainer = document.querySelector(".decimalContainer");
const mainContainer = document.querySelector(".container");
const arrowDown = "\u2193";
const divisionSign = "\u00f7";

//Cálculo Decimal para Binário
function decimalToBinary(value, explanation) {
  //recebe o valor decimal
  const initialValue = value;
  const valueDivision = [value];
  // //recebe tamanho de bits
  // const customValue = customInput.value;
  // const bitsSize = selectedValue === "other" ? customValue : selectedValue;
  let result = []; // cria um vetor para armazenar os restos da divisões
  let difference; // armazena o resto da divisão
  const explanationDiv = createExplanationContainer(explanation);
  while (value > 0) {
    // loop enquanto o valor for maior que 0, repete as operações abaixo
    difference = value % 2; // retorna o resto da divisão do valor por 2
    value = Math.floor(value / 2); // divide o valor por 2, arredondando para baixo
    valueDivision.push(value);
    result.unshift(difference); // adiciona o resto da divisão sempre na primeira posição do vetor
  }
  decimalExplanation(explanationDiv, result, valueDivision, initialValue);
  return result.join(""); //.padStart(bitsSize, 0); // retorna os valores do vetor result concatenados, adicionando ao ínicio o número de bits determinado.
}

//Cálculo Binário para Decimal
function binaryToDecimal(value, explanation) {
  // recebe o valor
  let binaryArray = value.split("").reverse(); // transforma o valor em um vetor e inverte a ordem
  let result = 0; //armazena o resultado da somatatória
  const x = []; //armazena o resultado da exponenciação
  const resultsArray = [];
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

function createStepsContent(
  stepTitleClass,
  stepTitleContent,
  stepExplanation,
  stepContainer
) {
  const stepTitle = document.createElement("h2");
  stepTitle.className = stepTitleClass;
  stepTitle.textContent = stepTitleContent;
  stepContainer.appendChild(stepTitle);
  stepContainer.appendChild(stepExplanation);
  const stepContent = document.createElement("p");
  stepContainer.appendChild(stepContent);
  return stepContent;
}

function createStepExplanation(text) {
  const headingTwo = document.createElement("p");
  headingTwo.className = "stepExplanation";
  headingTwo.textContent = text;
  return headingTwo;
}

function createStepsContainer(step) {
  const stepContainer = document.createElement("div");
  stepContainer.className = step;
  return stepContainer;
}

function binaryStepOne(binaryArray, exponentResults) {
  const stepOneContainer = createStepsContainer("step1");
  const stepOneExplanation = createStepExplanation(
    `Neste passo a base binária (2) é elevada à respectiva posição de cada bit (digíto binário).`
  );
  const stepOneContent = createStepsContent(
    "stepOneTitle",
    "Passo 1:",
    stepOneExplanation,
    stepOneContainer
  );
  binaryArray.forEach((binaryElement, i) => {
    const span = document.createElement("span");
    span.insertAdjacentHTML(
      "afterbegin",
      `2<sup>${i}</sup> <br> ${arrowDown} <br> ${exponentResults[i]}`
    );
    stepOneContent.appendChild(span);
  });
  return stepOneContainer;
}

function binaryStepTwo(binaryArray, exponentResults) {
  const stepTwoContainer = createStepsContainer("step2");
  const stepTwoExplanation = createStepExplanation(
    `Então multiplicamos cada bit pelo resultado da exponenciação da base binária em sua respectiva posição.`
  );
  const stepTwoContent = createStepsContent(
    "stepTwoTitle",
    "Passo 2:",
    stepTwoExplanation,
    stepTwoContainer
  );
  let multiplicationResult = 0;
  binaryArray.forEach((binaryElement, i) => {
    multiplicationResult = binaryElement * exponentResults[i];
    const span = document.createElement("span");
    span.insertAdjacentHTML(
      "afterbegin",
      `${binaryElement}x${exponentResults[i]} <br> ${arrowDown} <br> ${multiplicationResult}`
    );
    stepTwoContent.appendChild(span);
  });
  return stepTwoContainer;
}

function binaryStepThree(results) {
  const stepThreeContainer = createStepsContainer("step3");
  const stepThreeExplanation = createStepExplanation(
    `Por fim somamos os resultados obtidos na multiplicação (Passo 2) e obtemos o valor decimal ${
      results[results.length - 1]
    }.`
  );
  const stepThreeContent = createStepsContent(
    "stepThreeTitle",
    "Passo 3:",
    stepThreeExplanation,
    stepThreeContainer
  );
  let addNumber;
  results.forEach((result, i) => {
    addNumber = results[i + 1] - results[i];
    const span = document.createElement("span");
    const partialContent = `${result}+${addNumber}<br>${arrowDown}<br>`;
    const final = results[results.length - 1];
    let finalResults = results[i + 1];
    if (results.length - 1 === i) {
      return;
    } else if (finalResults === final && addNumber !== 0) {
      span.insertAdjacentHTML(
        "afterbegin",
        `${partialContent}<strong>${finalResults}</strong>`
      );
    } else if (addNumber !== 0) {
      span.insertAdjacentHTML("afterbegin", `${partialContent}${finalResults}`);
    }
    span.textContent !== "" && stepThreeContent.appendChild(span);
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
  const step1 = decimalStepOne(valueDivision, result);
  const step2 = decimalStepTwo(valueDivision, result);
  explanation.appendChild(step1);
  explanation.appendChild(step2);
  return;
}

function decimalStepOne(valuesDivision, results) {
  const stepOneContainer = createStepsContainer("step1");
  const stepOneExplanation = createStepExplanation(
    `Dividimos o decimal: ${
      valuesDivision[0]
    } por 2, com isso teremos um quociente inteiro: ${
      valuesDivision[1]
    } e resto: ${
      results[results.length - 1]
    }. Continuamos dividindo o quociente caso ele seja maior que 0, se o quociente for igual a 0, finalizamos a operação.`
  );
  const stepOneContent = createStepsContent(
    "stepOneTitle",
    "Passo 1:",
    stepOneExplanation,
    stepOneContainer
  );
  let difference;
  valuesDivision.forEach((value, i) => {
    difference = results[results.length - 1 - i];
    const span = document.createElement("span");
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
  const resultsReverse = results.slice(0).reverse();
  const stepTwoContainer = createStepsContainer("step2");
  const stepTwoExplanation = createStepExplanation(
    `Com isso pegamos o(s) resto(s) da operação resultando em: ${resultsReverse}. Invertemos a posição dos decimais e obtemos o equivalente binário ${results.join(
      ""
    )}.`
  );
  const stepTwoContent = createStepsContent(
    "stepTwoTitle",
    "Passo 2:",
    stepTwoExplanation,
    stepTwoContainer
  );
  let difference;
  valuesDivision.forEach((value, i) => {
    difference = results[results.length - 1 - i];
    const span = document.createElement("span");
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
