import {Data} from './Data'
import {modalWindow} from './modal'
import './styles/styles.css';

window.addEventListener('load', getAll)
const addModal = modalWindow("add")
const updateModal = modalWindow("update")
const addForm = document.getElementById("form-add")
const updForm = document.getElementById("form-update")

document.getElementById('add-new').addEventListener('click', addModal.open)

const table = document.getElementById("table")
addForm.addEventListener('submit', createFormHanlder)
updForm.addEventListener('submit', updateUserHandler)
table.addEventListener('click', event => {
    event.preventDefault()
    if (event.target.closest('.control_update')) {
        console.log('Update ', event.target.dataset.id);
        updateUser(event)
    }
    if (event.target.closest('.control_delete')) {
        deleteUser(event.target.dataset.id)
    }
    if (event.target.closest('.thead_sort')) {
        console.log(event.target.dataset.type);
        sortUsers(event.target.dataset.type)
    }
})

const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
searchButton.addEventListener('click', searchByName)


// ======= Sort Functions

function searchByName(event) {
    event.preventDefault()
    if(!searchInput.value) {
        return
    }
    const name = searchInput.value.toLowerCase()
    Data.getItemsFromApi()
        .then(response => response.filter(item => item.Name.toLowerCase().includes(name)))
        .then(renderList)

}

function sortUsers(tag) {
    if (tag === 'desc') {
        Data.getItemsFromApi()
            .then(response => response.sort((a,b) => a.Description < b.Description ? -1 : 1))
            .then(renderList)
    }
    if (tag === 'name') {
        Data.getItemsFromApi()
            .then(response => response.sort((a,b) => a.Name < b.Name ? -1 : 1))
            .then(renderList)
    }
    if (tag === 'date') {
        Data.getItemsFromApi()
            .then(response => response.sort((a,b) => a.Date > b.Date ? -1 : 1))
            .then(renderList)
    }
        
}

// ====== CRUD functions 

function updateUser(event) {
    event.preventDefault()
    const id = event.target.dataset.id
    console.log(id);
    Data.getItemById(+id)
        .then(response => {
            const item = response[0]
            console.log(item);
            updForm.name.value = item.Name
            updForm.desc.value = item.Description
            updForm.date.value = item.Date
            updForm.dataset.id = id
            updateModal.open()
        })
}

function updateUserHandler(event){
    event.preventDefault()
    const obj = {
        Name: updForm.name.value,
        Description: updForm.desc.value,
        Date: updForm.date.value
    }
    
    Data.updateItem(event.target.dataset.id, obj).then(response => {
        console.log(response)
        updateModal.close()
        getAll()
    })
}

function createFormHanlder(event) {
    event.preventDefault()
    const obj = {
        Name: addForm.name.value,
        Description: addForm.desc.value,
        Date: addForm.date.value
    }
    if (!addForm.name.value || !addForm.desc.value || !addForm.date.value) {
        return
    } 
    Data.createNewItem(obj)
        .then(response => {
            console.log(response)
            addModal.close()
            getAll()
        })
}

function deleteUser(id) {
    Data.deleteItem(id)
        .then(response => {
            console.log(response)
            getAll()
        })
}

function getAll() {
    Data.getItemsFromApi()
        .then(renderList)
}


// ====== Rendering

function renderList(data) {
    const html = data.length ?
        data.map(card => (
            `<tr>
                <td>${card.Name}</td>
                <td>${card.Description}</td>
                <td>${card.Date}</td>
                <td class="td_controlls">
                    <span class="control_update" data-id=${card.id}>&#9998;</span>
                    <span class="control_delete" data-id=${card.id}>&#10006;</span>
                </td>
            </tr>`
        ))
        .join('') :
        `<tr>
            <td>Nothing</td>
        </tr>`
    const table = document.getElementById('table-body')
    table.innerHTML = html
}


