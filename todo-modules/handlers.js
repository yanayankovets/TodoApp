import { addToLocalStorage, toggle, deleteTask } from './storage.js'
import { renderTodoList, todoList } from './todoItem.js'
import { formElement, deleteAllElement, enterElement, tasksElement } from './main.js'
import { addTask } from './templates.js'

formElement.addEventListener('submit', (event) => {
    event.preventDefault()
    addTask(enterElement.value)
})

tasksElement.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.parentElement.getAttribute('data-key'))
    }

    if (event.target.classList.contains('btn-primary')) {
        deleteTask(event.target.parentElement.parentElement.getAttribute('data-key'))
    }
})

const deleteAll = () => {
    if (todoList.length > 0) {
        todoList = []
        addToLocalStorage([])
        renderTodoList(todoList)
    }
}
deleteAllElement.addEventListener('click', deleteAll)