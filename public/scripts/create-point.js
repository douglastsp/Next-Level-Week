 function populateUfs() {
     const ufSelect = document.querySelector("select[name=uf]")
     fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
     .then( function(res) { return res.json() } )
     .then( function(states) {
         for ( const state of states ) {
             ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUfs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
     .then( function(res) { return res.json() } )
     .then( function(cities) {
         for ( const city of cities ) {
             citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
     })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coletas
//pegar todos os Li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover  uma classe utilizando o toggle

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existe intens selecionados, se sim
    //pegar os  itens selecionados

    const alreadySelected = selectedItems.findIndex( (item) => {
        const itemFound = item == itemId //isso será true or false
        return itemFound
    })

    //se  já estiver selecionado
    if ( alreadySelected >=0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter((item) => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //se não estiver selecionado
        //adicionar à seleção
        selectedItems.push(itemId)
    }

    //atualizar o campo escondido com os intens selecionados
    collectedItems.value = selectedItems
   
}