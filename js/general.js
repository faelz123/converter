"use strict";

const converterButton = document.querySelector(".converterButton");
const bitsSelect = document.getElementById("bits");
const resultOutput = document.querySelector(".result");
const toDecimalInput = document.getElementById("hexToDecimal");

let selectedValue;

function showCustomInput() {
  selectedValue = bitsSelect.value;
  selectedValue === "other"
    ? customInput.classList.remove("hidden")
    : customInput.classList.add("hidden");
}

converterButton.addEventListener("click", function (event) {
  //   const isDecimaltoHex = decimalContainer.getAttribute("numeric-type");
  //   const isHexToDecimal = hexContainer.classList.contains("hidden");
  let isDecimal = decimalContainer.classList.contains("hidden");
  let isBinary = binaryContainer.classList.contains("hidden");
  const decimalTo = decimalContainer.getAttribute("numeric-type");
  let numericTypeValue;
  let result;
  if (!isDecimal && decimalTo === "binary") {
    // if () {
    numericTypeValue = Number(decimalInput.value);
    result = decimalToBinary(numericTypeValue);
    // return printResult(result);
    // }
  } else if (!isBinary) {
    numericTypeValue = binaryInput.value;
    result = binaryToDecimal(numericTypeValue);
    // return printResult(result);
  } else if (decimalTo === "hex" && !isDecimal) {
    const decimal = Number(decimalInput.value);
    result = decimalToHexadecimal(decimal);
    // return printResult(decimalToHexadecimal(decimal));
  } else {
    const hex = toDecimalInput.value.toUpperCase();
    result = hexToDecimal(hex);
    // return printResult(hexToDecimal(hex));
  }
  return printResult(result);
});

function printResult(result) {
  let finalResult =
    (resultOutput.innerHTML = `Resultado: <span>${result}</span>`);
  return finalResult;
}
