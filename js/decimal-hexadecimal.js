"use strict";

const hexContainer = document.querySelector(".hexadecimalContainer");

const hexValues = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

//Ínicio da conversão de decimal para hexadecimal

//cálculo da conversão
function decimalToHexadecimal(decimal, explanation) {
  const result = [];
  const decimalsArray = [];
  const explanationDiv = createExplanationContainer(explanation);
  while (decimal > 0) {
    decimalsArray.push(decimal);
    let diff = decimal % 16;
    decimal = parseInt(decimal / 16);
    result.unshift(diff);
  }
  decimalsArray.push(decimal);
  const finalResult = assignHex(result, hexValues);
  decimalToHexExplanation(explanationDiv, decimalsArray, result, finalResult);
  return finalResult.join("");
}

//substitui decimais por hexadecimais
function assignHex(valoresHEX, hexValues) {
  let decimalsArray = [...valoresHEX];
  for (let i = 0; i < decimalsArray.length; i++) {
    for (const [key, value] of Object.entries(hexValues)) {
      if (value === decimalsArray[i]) {
        decimalsArray[i] = key;
      }
    }
  }
  return decimalsArray;
}

//cria explicação
function decimalToHexExplanation(
  explanation,
  decimalsArray,
  result,
  finalResult
) {
  const hexTable = createHexTable();
  const step1 = decimalToHexStepOne(decimalsArray, result);
  const step2 = decimalToHexStepTwo(result, finalResult);
  explanation.appendChild(hexTable);
  explanation.appendChild(step1);
  explanation.appendChild(step2);
}

////cria o passo 1 da explicação
function decimalToHexStepOne(decimalsArray, result) {
  const stepOneContainer = createStepsContainer("step1");
  const stepOneExplanation = createStepExplanation(
    `Dividimos o decimal: ${
      decimalsArray[0]
    } por 16, com isso teremos um quociente inteiro: ${
      decimalsArray[1]
    } e resto: ${
      result[result.length - 1]
    }. Continuamos dividindo o quociente caso ele seja maior que 0, se o quociente for igual a 0, finalizamos a operação.`
  );
  const stepOneContent = createStepsContent(
    "stepOneTitle",
    "Passo 1:",
    stepOneExplanation,
    stepOneContainer
  );
  decimalsArray.forEach((value, i) => {
    const span = document.createElement("span");
    if (decimalsArray.length - 1 === i) return;
    span.insertAdjacentHTML(
      "afterbegin",
      `${value}${divisionSign}16 <br> ${arrowDown} <br>  ${
        decimalsArray[i + 1]
      } <br> ${arrowDown} <br> ${result[result.length - 1 - i]}`
    );
    stepOneContent.appendChild(span);
  });
  return stepOneContainer;
}

////cria o passo 2 da explicação
function decimalToHexStepTwo(result, finalResult) {
  const resultsReverse = [...result].reverse();
  const stepTwoContainer = createStepsContainer("step2");
  const stepTwoExplanation = createStepExplanation(
    `Com isso pegamos o(s) resto(s) da operação resultando em: ${resultsReverse}. Invertemos a posição dos decimais: ${result} e substituimos os decimais maiores ou iguais a 10 por letras de (A-F) obtendo o valor hexadecimal ${finalResult.join(
      ""
    )}. (TABELA DE SUBSTITUIÇÃO ACIMA).`
  );
  const stepTwoContent = createStepsContent(
    "stepTwoTitle",
    "Passo 2:",
    stepTwoExplanation,
    stepTwoContainer
  );
  result.forEach((value, i) => {
    const span = document.createElement("span");
    span.insertAdjacentHTML(
      "afterbegin",
      `${resultsReverse[i]} <br> ${arrowDown} <br> ${value} <br> ${arrowDown} <br> <strong>${finalResult[i]}</strong>`
    );
    stepTwoContent.appendChild(span);
  });
  return stepTwoContainer;
}

////// Ínicio da conversão de hexadecimal para decimal /////////
function hexToDecimal(hex, explanation) {
  const hexArray = Array.from(hex);
  const decimalArray = charHEXtoDECIMAL(hexArray, hexValues);
  return calcHEXtoDecimal(decimalArray, hexArray, explanation);
}

//substitui hexadecimais por decimais
function charHEXtoDECIMAL(hexArray, hexValues) {
  let arrayHex = [...hexArray];
  for (let i = 0; i < arrayHex.length; i++) {
    for (const [key, value] of Object.entries(hexValues)) {
      if (key === arrayHex[i]) {
        arrayHex[i] = value;
      }
    }
  }
  return arrayHex;
}

//cálculo da conversão
function calcHEXtoDecimal(decimalArray, hexArray, explanation) {
  const resultArray = [];
  const sumResultArray = [];
  let result = 0;
  const explanationDiv = createExplanationContainer(explanation);
  for (let i = 0; i < decimalArray.length; i++) {
    let decimal = decimalArray[decimalArray.length - 1 - i] * 16 ** i;
    result += decimal;
    resultArray.unshift(decimal);
    sumResultArray.unshift(result);
  }
  hexToDecimalExplanation(
    explanationDiv,
    hexArray,
    decimalArray,
    resultArray,
    sumResultArray
  );
  return result;
}

//////// Ínicio da explicação da conversão //////////////

////cria tabela com os hexadecimais
function createHexTable() {
  const hexTable = document.createElement("table");
  hexTable.className = "hexTable";
  const hexTableBody = document.createElement("tbody");
  const hexTableHead = document.createElement("thead");
  const hexTableRow = document.createElement("tr");
  for (const [key, value] of Object.entries(hexValues)) {
    const th = document.createElement("th");
    const td = document.createElement("td");
    th.textContent = key;
    td.textContent = value;
    hexTableHead.appendChild(th);
    hexTableRow.appendChild(td);
  }
  hexTable.appendChild(hexTableHead);
  hexTableBody.appendChild(hexTableRow);
  hexTable.appendChild(hexTableBody);
  return hexTable;
}

////cria explicação
function hexToDecimalExplanation(
  explanation,
  hexArray,
  decimalArray,
  resultArray,
  sumResultArray
) {
  const hexTable = createHexTable();
  const step1 = hexToDecimalStepOne(hexArray, decimalArray); // step1 analizar valores e substituir os caracteres por seus respectivos números
  const step2 = hexToDecimalStepTwo(decimalArray, resultArray); // step2 multiplica o resultado pela posição * 16
  const step3 = hexToDecimalStepThree(sumResultArray); // step3 soma-se os resultados para obter o decimal
  explanation.appendChild(hexTable);
  explanation.appendChild(step1);
  explanation.appendChild(step2);
  explanation.appendChild(step3);
}

////cria o passo 1 da explicação
function hexToDecimalStepOne(hexArray, decimalArray) {
  const stepOneContainer = createStepsContainer("step1");
  const stepOneExplanation = createStepExplanation(
    `Começamos por substituir os algorismos hexadecimais (A-F), caso existam no valor hexadecimal, pelos seus respectivos valores decimais.`
  );
  const stepOneContent = createStepsContent(
    "stepOneTitle",
    "Passo 1:",
    stepOneExplanation,
    stepOneContainer
  );
  hexArray.forEach((value, i) => {
    const span = document.createElement("span");
    span.insertAdjacentHTML(
      "afterbegin",
      `${value} <br> ${arrowDown} <br> ${decimalArray[i]}`
    );
    stepOneContent.appendChild(span);
  });
  return stepOneContainer;
}

////cria o passo 2 da explicação
function hexToDecimalStepTwo(decimalArray, resultArray) {
  const stepTwoContainer = createStepsContainer("step2");
  const stepTwoExplanation = createStepExplanation(
    `Então multiplicamos cada decimal obtido (Passo 1) pelo resultado da multiplicação da exponenciação da base hexadecimal (16) em sua respectiva posição.`
  );
  const stepTwoContent = createStepsContent(
    "stepTwoTitle",
    "Passo 2:",
    stepTwoExplanation,
    stepTwoContainer
  );
  decimalArray.forEach((value, i) => {
    const span = document.createElement("span");
    const count = resultArray.length - i - 1;
    span.insertAdjacentHTML(
      "afterbegin",
      `${value} x 16<sup>${count}</sup> <br> ${arrowDown} <br> ${resultArray[i]}`
    );
    stepTwoContent.appendChild(span);
  });
  return stepTwoContainer;
}

////cria o passo 3 da explicação
function hexToDecimalStepThree(sumResultArray) {
  const stepThreeContainer = createStepsContainer("step3");
  const stepThreeExplanation = createStepExplanation(
    `Por fim, somamos os resultado das multiplicações (Passo 2), obtendo o valor decimal ${sumResultArray[0]}.`
  );
  const stepThreeContent = createStepsContent(
    "stepThreeTitle",
    "Passo 3:",
    stepThreeExplanation,
    stepThreeContainer
  );
  sumResultArray.reverse();
  sumResultArray.forEach((value, i) => {
    const span = document.createElement("span");
    let subNumber = sumResultArray[i + 1] - sumResultArray[i];
    let finalResult = sumResultArray[i + 1];
    let partialContent = `${value} + ${subNumber} <br> ${arrowDown} <br>`;
    if (sumResultArray.length - 1 === i) {
      return;
    } else if (sumResultArray.length - 2 === i) {
      span.insertAdjacentHTML(
        "afterbegin",
        `${partialContent}<strong>${finalResult}</strong>`
      );
    } else {
      span.insertAdjacentHTML("afterbegin", `${partialContent}${finalResult}`);
    }
    stepThreeContent.appendChild(span);
  });
  return stepThreeContainer;
}
