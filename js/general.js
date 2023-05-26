"use strict";

const converterButton = document.querySelector(".converterButton");
// const bitsSelect = document.getElementById("bits");
// const customInput = document.getElementById("other");
const resultOutput = document.querySelector(".result");
const hexadecimalInput = document.getElementById("hexToDecimal");

// let selectedValue;

// function showCustomInput() {
//   selectedValue = bitsSelect.value;
//   selectedValue === "other"
//     ? customInput.classList.remove("hidden")
//     : customInput.classList.add("hidden");
// }

converterButton.addEventListener("click", function (event) {
  //   const isDecimaltoHex = decimalContainer.getAttribute("numeric-type");
  //   const isHexToDecimal = hexContainer.classList.contains("hidden");
  const explanation = document.querySelector(".explanationContainer");
  let isDecimal = decimalContainer.classList.contains("hidden");
  let isBinary = binaryContainer.classList.contains("hidden");
  const decimalTo = decimalContainer.getAttribute("numeric-type");
  let numericTypeValue;
  let result;
  if (!isDecimal && decimalTo === "binary") {
    numericTypeValue = Number(decimalInput.value);
    result = decimalToBinary(numericTypeValue, explanation);
  } else if (!isBinary) {
    numericTypeValue = binaryInput.value;
    result = binaryToDecimal(numericTypeValue, explanation);
  } else if (decimalTo === "hex" && !isDecimal) {
    const decimal = Number(decimalInput.value);
    result = decimalToHexadecimal(decimal, explanation);
  } else {
    const hex = hexadecimalInput.value.toUpperCase();
    result = hexToDecimal(hex, explanation);
  }

  return printResult(result);
});

function printResult(result) {
  let finalResult =
    (resultOutput.innerHTML = `Resultado: <span>${result}</span>`);
  return finalResult;
}

function validateBinaryInput() {
  let inputValue = binaryInput.value;
  const binaryPattern = /^[01]+$/;
  if (!binaryPattern.test(inputValue)) {
    inputValue = inputValue.replace(/[^01]/g, "");
    binaryInput.value = inputValue;
  }
}

function validateHexadecimalInput() {
  let inputValue = hexadecimalInput.value;
  const hexadecimalPattern = /^[0-9a-fA-F]+$/;
  if (!hexadecimalPattern.test(inputValue)) {
    inputValue = inputValue.replace(/[^0-9a-fA-F]/g, "");
    hexadecimalInput.value = inputValue;
  }
}

function validateDecimalInput() {
  let inputValue = decimalInput.value;
  const decimalPattern = /^[0-9]+$/;
  if (!decimalPattern.test(inputValue)) {
    inputValue = inputValue.replace(/[^0-9]/gi, "");
    decimalInput.value = inputValue;
  }
}
