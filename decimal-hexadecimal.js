"use strict";

const toDecimalInput = document.getElementById("hexToDecimal");
const hexContainer = document.querySelector(".hexadecimalContainer");

const hexValues = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

function decimalToHexadecimal(decimal) {
  let result = [];
  if (decimal >= 16) {
    while (decimal >= 16) {
      let diff = decimal % 16;
      decimal = parseInt(decimal / 16);
      result.unshift(diff);
    }
    result.unshift(decimal);
    return assignHex(result, hexValues).join("");
  } else {
    result.push(decimal);
    return assignHex(result, hexValues).join("");
  }
}

function assignHex(valoresHEX, hexValues) {
  for (let i = 0; i < valoresHEX.length; i++) {
    for (const [key, value] of Object.entries(hexValues)) {
      if (value === valoresHEX[i]) {
        valoresHEX[i] = key;
      }
    }
  }
  return valoresHEX;
}

function hexToDecimal(hex) {
  const hexArray = Array.from(hex);
  const decimalArray = charHEXtoDECIMAL(hexArray, hexValues);
  console.log(decimalArray);
  return calcHEXtoDecimal(decimalArray, hexArray);
}

function arrayHEX(hex) {
  let hexArray = [];
  for (let i = 0; i < hex.length; i++) {
    hexArray.push(hex[i]);
  }
  return hexArray;
}

function charHEXtoDECIMAL(hexArray, hexValues) {
  let arrayHex = [];
  for (let i = 0; i < hexArray.length; i++) {
    for (const [key, value] of Object.entries(hexValues)) {
      if (key === hexArray[i]) {
        arrayHex[i] = value;
      }
    }
    arrayHex.length === i && (arrayHex[i] = hexArray[i]);
  }
  return arrayHex;
}

function calcHEXtoDecimal(decimalArray, hexArray) {
  console.log(decimalArray);
  const resultArray = [];
  const sumResultArray = [];
  let result = 0;
  const explanation = document.querySelector(".explanationContainer");
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

function hexTable() {
  //criar table com valores hex e decimal
}

function hexToDecimalExplanation(
  explanation,
  hexArray,
  decimalArray,
  resultArray,
  sumResultArray
) {
  const step1 = hexToDecimalStepOne(hexArray, decimalArray); // step1 analizar valores e substituir os caracteres por seus respectivos números
  const step2 = hexToDecimalStepTwo(decimalArray, resultArray); // step2 multiplica o resultado pela posição * 16
  const step3 = hexToDecimalStepThree(sumResultArray); // step3 soma-se os resultados para obter o decimal
  explanation.appendChild(step1);
  explanation.appendChild(step2);
  explanation.appendChild(step3);
}

function hexToDecimalStepOne(hexArray, decimalArray) {
  const stepOneContainer = document.createElement("div");
  stepOneContainer.className = "step1";
  const stepOneTitle = document.createElement("h2");
  stepOneTitle.className = "stepOneTitle";
  stepOneTitle.textContent = "Passo 1:";
  stepOneContainer.appendChild(stepOneTitle);
  const stepOneContent = document.createElement("p");
  stepOneContainer.appendChild(stepOneContent);
  hexArray.forEach((value, i) => {
    const span = document.createElement("span");
    const arrowDown = "\u2193";
    span.insertAdjacentHTML(
      "afterbegin",
      `${value} <br> ${arrowDown} <br> ${decimalArray[i]}`
    );
    stepOneContent.appendChild(span);
  });
  return stepOneContainer;
}

function hexToDecimalStepTwo(decimalArray, resultArray) {
  const stepTwoContainer = document.createElement("div");
  stepTwoContainer.className = "step2";
  const stepTwoTitle = document.createElement("h2");
  stepTwoTitle.className = "stepTwoTitle";
  stepTwoTitle.textContent = "Passo 2:";
  stepTwoContainer.appendChild(stepTwoTitle);
  const stepTwoContent = document.createElement("p");
  stepTwoContainer.appendChild(stepTwoContent);
  // decimalArray = decimalArray.reverse();
  // resultArray = resultArray.reverse();
  decimalArray.forEach((value, i) => {
    console.log(i, value.length);
    const span = document.createElement("span");
    const arrowDown = "\u2193";
    const count = resultArray.length - i - 1;
    span.insertAdjacentHTML(
      "afterbegin",
      `${value} x 16<sup>${count}</sup> <br> ${arrowDown} <br> ${resultArray[i]}`
    );
    stepTwoContent.appendChild(span);
  });
  return stepTwoContainer;
}

function hexToDecimalStepThree(sumResultArray) {
  const stepThreeContainer = document.createElement("div");
  stepThreeContainer.className = "step3";
  const stepThreeTitle = document.createElement("h2");
  stepThreeTitle.className = "stepThreeTitle";
  stepThreeTitle.textContent = "Passo 3:";
  stepThreeContainer.appendChild(stepThreeTitle);
  const stepThreeContent = document.createElement("p");
  stepThreeContainer.appendChild(stepThreeContent);
  sumResultArray.reverse();
  sumResultArray.forEach((value, i) => {
    const span = document.createElement("span");
    const arrowDown = "\u2193";
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

converterButton.addEventListener("click", function (event) {
  const isDecimaltoHex = decimalContainer.getAttribute("numeric-type");
  const isHexToDecimal = hexContainer.classList.contains("hidden");
  if (isDecimaltoHex === "hex") {
    const decimal = Number(decimalInput.value);
    return printResult(decimalToHexadecimal(decimal));
  } else if (!isHexToDecimal) {
    const hex = toDecimalInput.value.toUpperCase();
    return printResult(hexToDecimal(hex));
  }
});
