import { tasksElement, deleteAllElement } from './script.js'
import { getDate } from './templates.js'
import { addToLocalStorage, getFromLocalStorage } from './storage.js'

let todoList = []

const renderTodoList = (todoList) => {
    tasksElement.innerHTML = ''

    todoList.forEach(function(item) {
        const checked = item.isChecked ? 'checked': null

        const li = document.createElement('li')
        li.setAttribute('class', 'item')
        li.setAttribute('data-key', item.id)

        if (item.isChecked) {
            li.classList.add('checked')
        }

        const checkbox = `
        <label>
            <input type="checkbox" class="checkbox check" ${checked}>
            <span></span>
        </label>
        `

        const lineThroughClassName = item.isChecked ? 'lineThrough' : ''

        li.innerHTML = `
            ${checkbox}
            <p class="todo ${lineThroughClassName}">${item.text}</p>
            <div class="delete_block">
                <button type="button" class="btn btn-primary">x</button>
                <time class="ms-auto text-muted me-3 text-nowrap">${getDate(new Date(item.date))}</time>
            </div>
        `
        tasksElement.append(li)
    })

    document.querySelector('#delete_all').disabled = true

    const activateButton = () => {
        if (todoList.length > 0) {
            deleteAllElement.disabled = false
        }
    }
    activateButton()

    deleteAllElement.removeEventListener('click', activateButton)
}
renderTodoList(getFromLocalStorage(todoList))

const deleteTask = (id) => {
    todoList = todoList.filter(function(item) {
        return item.id != id
    })
    addToLocalStorage(todoList)
}

export { todoList, renderTodoList, deleteTask }