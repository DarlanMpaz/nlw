//INICIO MOSTRA ESTADOS
function populateUfs() {
    const ufSelect = document.querySelector('select[name=uf')
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUfs()
//FIM MOSTRA ESTADOS

//INICIO MOSTRA CIDADES
function getCities(event) {
    const citiesSelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')

    const ufValue = event.target.value

    const indexofSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexofSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citiesSelect.innerHTML = "<option value>Selecione a cidade</option>";
    citiesSelect.disabled = true;
    
    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for(const city of cities) {
            citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citiesSelect.disabled = false

    } )

}

document
    .querySelector('select[name=uf')
    .addEventListener('change', getCities)
//FIM MOSTRA CIDADES

//INICIO ITENS COLETA
const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
    
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    itemLi.classList.toggle('selected')

    const itemId = event.target.id

    const alreadySelected = selectedItems.findIndex( item => {
        return item == itemId
    })

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}
//FIM ITENS COLETA