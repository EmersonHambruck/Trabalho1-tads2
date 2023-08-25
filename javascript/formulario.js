function open() {
    let bd_contacts = []
    try {
        getLocalStorage('chave_contato')
        updateTable()
    } catch {
        localStorage.setItem('chave_contato', JSON.stringify(bd_contacts))
    }


}

function getLocalStorage(bd){
    return JSON.parse(localStorage.getItem(bd))
}

function inserirContato() {
    const contact = {
        name: document.getElementById('name').value,
        fone: document.getElementById('fone').value
    }

    cadastraContato(contact, 'chave_contato')
    updateTable()


}
function cadastraContato(contato, bd) {
    let bd_contacts = getLocalStorage(bd)
    bd_contacts.push(contato)
    localStorage.setItem(bd, JSON.stringify(bd_contacts))
}

function updateTable() {
    let bd_contacts = getLocalStorage('chave_contato')
    cleanTable()
    bd_contacts.forEach(newRow)
}

function cleanTable(){
    document.querySelector("#lista-contatos").innerHTML = ''
}

function newRow(contact, index) {
    let linha_nova = document.createElement('tr')
    linha_nova.innerHTML = `
    <td>${index}</td>
    <td>${contact.name}</td>
    <td>${contact.fone}</td>
    <td><button type='button' onclick='deleteContact(${index})'>Deletar</button></td>
    `
    document.querySelector("#lista-contatos").appendChild(linha_nova)
}


function deleteContact(index) {
    let bd_contacts = getLocalStorage('chave_contato')
    bd_contacts[index] = ''
    bd_contacts = bd_contacts.filter(function (vetor) {
        if (vetor != '') return vetor
    })
    console.log(`Contato ${index} apagado`)
    localStorage.setItem('chave_contato', JSON.stringify(bd_contacts))
    updateTable()
}