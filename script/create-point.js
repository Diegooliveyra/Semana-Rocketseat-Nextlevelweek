function populateUfs() {
  const ufSelect = document.querySelector("select[name=UF]");
  

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUfs();

function getCities() {
  const citiesSelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.value
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (const city of cities) {
        citiesSelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
      }
      citiesSelect.disabled = false
    })

}

document.querySelector("select[name=UF]")
  .addEventListener("change", getCities)