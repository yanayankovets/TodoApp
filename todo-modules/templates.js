import { addToLocalStorage } from './storage.js'
import { enterElement } from './main.js'
import { todoList } from './todoItem.js'

const getDate = (date = new Date()) => {

    let hour = date.getHours()
    if (date.getHours() < 10) {
        hour = '0' + (date.getHours())
    }

    let minute = date.getMinutes()
    if (date.getMinutes() < 10) {
        minute = '0' + (date.getMinutes())
    }

    let day = date.getDate()
    if (date.getDate() < 10) {
        day = '0' + (date.getDate())
    }

    let month = date.getMonth()
    if (date.getMonth() < 10) {
        month = '0' + (date.getMonth() + 1)
    }

    return `${hour}:${minute} ${day}.${month}.${date.getFullYear()}`
}

const addTask = (item) => {
    if (item !== '') {
        const todoObject = {
            id: Date.now(),
            date: new Date(),
            text: item,
            isChecked: false
        }

        todoList.push(todoObject)
        addToLocalStorage(todoList)
        enterElement.value = ''
    }
}

export { getDate, addTask }