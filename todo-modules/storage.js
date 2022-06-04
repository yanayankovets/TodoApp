import { todoList, renderTodoList } from './todoItem.js'

const addToLocalStorage = (todoList) => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
    renderTodoList(todoList)
}

const getFromLocalStorage = () => {
    const reference = localStorage.getItem('todoList')
    if (reference) {
        todoList = JSON.parse(reference)
        renderTodoList(todoList)
    }
}

const toggle = (id) => {
    todoList.forEach(function(item) {
        if (item.id == id) {
            item.isChecked = !item.isChecked
        }
    })
    addToLocalStorage(todoList)
}

const deleteTask = (id) => {
    todoList = todoList.filter(function(item) {
        return item.id != id
    })
    addToLocalStorage(todoList)
}
getFromLocalStorage()

export { addToLocalStorage, getFromLocalStorage, toggle, deleteTask }