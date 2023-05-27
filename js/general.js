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
  const decimalTo = decimalContainer.getAttribute("numeric-type");
  let isDecimal = decimalContainer.classList.contains("hidden");
  let isBinary = binaryContainer.classList.contains("hidden");
  let numericTypeValue;
  let result;
  if (!decimalInput.value && !binaryInput.value && !hexadecimalInput.value)
    return createTemporaryMessage(`Insira algum valor`);
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
  preventScrolling();
  return printResult(result);
});

function printResult(result) {
  let finalResult =
    (resultOutput.innerHTML = `Resultado: <span>${result}</span>`);
  return finalResult;
}

function validateBinaryInput(event) {
  let inputValue = event.target.value;
  console.log(inputValue);
  const binaryPattern = /^[01]+$/;
  if (!event.data) {
    return;
  } else if (!binaryPattern.test(inputValue)) {
    inputValue = inputValue.replace(/[^01]/g, "");
    event.target.value = inputValue;
    createTemporaryMessage(`Somente dígitos 0 e 1`);
  }
}

function validateHexadecimalInput(event) {
  let inputValue = event.target.value;
  const hexadecimalPattern = /^[0-9a-fA-F]+$/;
  if (!event.data) {
    return;
  } else if (!hexadecimalPattern.test(inputValue)) {
    inputValue = inputValue.replace(/[^0-9a-fA-F]/g, "");
    event.target.value = inputValue;
    createTemporaryMessage(`Somente algarismos (0-9) e letras (A-F)`);
  }
}

function validateDecimalInput(event) {
  let inputValue = event.target.value;
  const decimalPattern = /^[0-9]+$/;
  if (!event.data) {
    return;
  } else if (!decimalPattern.test(inputValue)) {
    inputValue = inputValue.replace(/[^0-9]/gi, "");
    event.target.value = inputValue;
    createTemporaryMessage(`Somente algarismos de 0 a 9`);
  }
}

function createTemporaryMessage(message) {
  const hasMessage = document.querySelector(".errorMessage");
  hasMessage && hasMessage.remove();
  const containerMessage = document.querySelector(".converterButtonContainer");
  const p = document.createElement("p");
  p.className = "errorMessage";
  p.textContent = `${message}`;
  containerMessage.append(p);
  fadeAwayMessage(p).then(() => removeMessage(p));
}

function fadeAwayMessage(p) {
  return new Promise((resolve) => {
    setTimeout(function () {
      p.classList.add("fadeAway");
    }, 500);
    resolve();
  });
}

function removeMessage(p) {
  return setTimeout(() => {
    p.remove();
  }, 2500);
}

function preventScrolling() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (documentHeight <= windowHeight) {
    document.body.classList.add("noScroll");
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  } else {
    document.body.classList.remove("noScroll");
    window.onbeforeunload = null;
  }
}

window.addEventListener("load", preventScrolling);

window.addEventListener("resize", preventScrolling);
