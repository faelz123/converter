("use strict");
const navTabItens = document.querySelectorAll(".nav-tab li");
const navTabHome = document.querySelector(".nav-tab");
const pageTitle = document.querySelector(".mainTitle");
const numericItens = document.querySelectorAll(".numeric");

navTabHome.addEventListener("click", function () {
  pageTitle.innerHTML = `Conversor de sistemas numéricos <br /> Decimal, Binário e Hexadecimal`;
});

navTabItens.forEach(function (item) {
  item.addEventListener("click", function () {
    const bitsContainer = document.querySelector(".bitsContainer");
    const inputContainerClasses =
      document.querySelector(".inputContainer").classList;
    let conversion = item.getAttribute("data-conversion");
    inputContainerClasses.contains("hidden") &&
      inputContainerClasses.remove("hidden");
    hideItems(numericItens, bitsContainer);
    displayItem(numericItens, conversion, bitsContainer);
    changePageTitle(item);
  });
});

function changePageTitle(item) {
  const parentText = item.closest(".nav-tab").firstChild.textContent;
  const itemText = item.textContent;
  pageTitle.textContent = `Conversor de ${parentText} para ${itemText}`;
}

function displayItem(itens, conversion, bitsContainer) {
  itens.forEach((item) => {
    let itemAttribute = item.dataset.numericConversion;
    if (itemAttribute.includes(conversion)) {
      item.classList.remove("hidden");
      if (conversion.includes("Hex")) {
        item.setAttribute("numeric-type", "hex");
      } else if (conversion.includes("Binary")) {
        item.setAttribute("numeric-type", "binary");
        bitsContainer.classList.remove("hidden");
      }
    }
  });
}

function hideItems(itens, bitsContainer) {
  itens.forEach((item) => {
    item.classList.add("hidden");
  });
  bitsContainer.classList.add("hidden");
}
