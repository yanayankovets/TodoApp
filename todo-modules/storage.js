import { todoList, renderTodoList } from './todoItem.js'

const addToLocalStorage = (todoList) => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
    renderTodoList(todoList)
}

const getFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('todoList'))
}
getFromLocalStorage()

const toggle = (id) => {
    todoList.forEach(function(item) {
        if (item.id == id) {
            item.isChecked = !item.isChecked
        }
    })
    addToLocalStorage(todoList)
}

export { addToLocalStorage, getFromLocalStorage, toggle }