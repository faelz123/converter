("use strict");
const navTabItens = document.querySelectorAll(".nav-tab li");
const navTabHome = document.querySelectorAll(".nav-tab");
const pageTitle = document.querySelector(".mainTitle");
const numericItens = document.querySelectorAll(".numeric");
const navTabItensMobile = document.querySelectorAll(".dropdownMobile li");

navTabHome.forEach(function (item) {
  item.addEventListener("click", function () {
    if (item.textContent === "Ínicio") {
      pageTitle.innerHTML = `Conversor de sistemas numéricos: <br /> Decimal, Binário e Hexadecimal`;
      hideItems(numericItens);
      removeResultAndExplanation();
      closeMenuAndClearAttribute(item);
      preventScrolling();
    } else {
      navTabHome.forEach(function (otherItem) {
        otherItem === item
          ? otherItem.nextElementSibling.classList.add("active")
          : otherItem.nextElementSibling.classList.remove("active");
      });
    }
  });
});

navTabItensMobile.forEach(function (item) {
  item.addEventListener("click", function () {
    const inputContainerClasses =
      document.querySelector(".inputContainer").classList;
    let conversion = item.getAttribute("data-conversion");
    inputContainerClasses.contains("hidden") &&
      inputContainerClasses.remove("hidden");
    hideItems(numericItens);
    displayItem(numericItens, conversion);
    changePageTitle(item);
    removeResultAndExplanation();
    closeMenuAndClearAttribute(item);
    preventScrolling();
  });
});

navTabItens.forEach(function (item) {
  item.addEventListener("click", function () {
    // const bitsContainer = document.querySelector(".bitsContainer");
    const inputContainerClasses =
      document.querySelector(".inputContainer").classList;
    let conversion = item.getAttribute("data-conversion");
    inputContainerClasses.contains("hidden") &&
      inputContainerClasses.remove("hidden");
    hideItems(numericItens);
    displayItem(numericItens, conversion);
    changePageTitle(item);
    removeResultAndExplanation();
    preventScrolling();
  });
});

function changePageTitle(item) {
  const parentText = item.closest(".nav-tab")
    ? item.closest(".nav-tab").firstChild.textContent
    : item.closest("ul").previousElementSibling.firstChild.textContent;
  const itemText = item.textContent;
  pageTitle.textContent = `Conversor de ${parentText} para ${itemText}`;
}

function displayItem(itens, conversion) {
  converterButton.classList.remove("hidden");
  itens.forEach((item) => {
    let itemAttribute = item.dataset.numericConversion;
    if (itemAttribute.includes(conversion)) {
      item.classList.remove("hidden");
      if (conversion.includes("Hex")) {
        item.setAttribute("numeric-type", "hex");
      } else if (conversion.includes("Binary")) {
        item.setAttribute("numeric-type", "binary");
        // bitsContainer.classList.remove("hidden");
      }
    }
  });
}

function hideItems(itens) {
  itens.forEach((item) => {
    item.classList.add("hidden");
  });
  converterButton.classList.add("hidden");
  // bitsContainer.classList.add("hidden");
}

function resetInputs() {
  const inputElements = document.querySelectorAll("input");
  inputElements.forEach((input) => {
    input.value = "";
  });
}

function removeResultAndExplanation() {
  resetInputs();
  const explanation = document.querySelector(".explanationContainer");
  resultOutput.textContent = "";
  explanation && explanation.remove();
}

function closeMenuAndClearAttribute(item) {
  const menuHamburguer = item.closest(".primary-navigation").firstElementChild;
  const activeAttribute = item.parentElement;
  setTimeout(function () {
    menuHamburguer.checked = false;
    activeAttribute.classList.remove("active");
  }, 30);
}
