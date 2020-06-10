function populateUfs() {
  const ufSelect = document.querySelector("select[name=UF]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUfs();

function getCities() {
  const citiesSelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.value;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citiesSelect.innerHTML = "<option value>Selecione o Estado </option>";
  citiesSelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      citiesSelect.innerHTML = "";
      for (const city of cities) {
        citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citiesSelect.disabled = false;
    });
}

document.querySelector("select[name=UF]").addEventListener("change", getCities);

// itens de coleta

const itemsToColect = document.querySelectorAll(".items-grid li");

for (const item of itemsToColect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  itemLi.classList.toggle("select");

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId;
    return itemFound;
  });

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDiferent = item != itemId;
      return itemIsDiferent;
    });

    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }
  collectedItems.value = selectedItems
}
