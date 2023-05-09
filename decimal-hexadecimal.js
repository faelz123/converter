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
  const decimalArray = charHEXtoDECIMAL(arrayHEX(hex), hexValues);
  console.log(calcHEXtoDecimal(decimalArray));
  return calcHEXtoDecimal(decimalArray);
}

function arrayHEX(hex) {
  let hexArray = [];
  for (let i = 0; i < hex.length; i++) {
    hexArray.push(hex[i]);
  }
  return hexArray;
}

function charHEXtoDECIMAL(hexArray, hexValues) {
  for (let i = 0; i < hexArray.length; i++) {
    for (const [key, value] of Object.entries(hexValues)) {
      if (key == hexArray[i]) {
        hexArray[i] = value;
      }
    }
  }
  return hexArray;
}

function calcHEXtoDecimal(decimalArray) {
  const resultArray = [];
  let result = 0;
  for (let i = 0; i < decimalArray.length; i++) {
    let decimal = decimalArray[decimalArray.length - 1 - i] * 16 ** i;
    result += decimal;
    resultArray.unshift(decimal);
  }
  return result;
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
