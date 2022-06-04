import { $ } from './helpers.js'

const formElement = $('#form')
const enterElement = $('#enter')
const addElement = $('#add_task')
const deleteAllElement = $('#delete_all')
const tasksElement = $('.tasks')

export { formElement, enterElement, tasksElement, deleteAllElement }


enterElement.onkeyup = () => {
    const enteredValue = enterElement.value

    if (enteredValue.trim() !== '') {
        addElement.classList.add('active')
    } else{
        addElement.classList.remove('active')
    }
}

