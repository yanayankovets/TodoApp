const formElement = document.querySelector('#form')
const enterElement = document.querySelector('#enter')
const addElement = document.querySelector('#add_task')
const deleteAllElement = document.querySelector('#delete_all')
const tasksElement = document.querySelector('.tasks')

let todoList = []

formElement.addEventListener('submit', function(event) {
    event.preventDefault()
    addTask(enterElement.value)
})

enterElement.onkeyup = () => {
    let enteredValue = enterElement.value

    if (enteredValue.trim() !== '') {
        addElement.classList.add('active')
    } else{
        addElement.classList.remove('active')
    }
}

function getDate (date = new Date()) {

    let hour = date.getHours()
    if (date.getHours() < 10) {
        hour = '0' + (date.getHours() + 1)
    }

    let minute = date.getMinutes()
    if (date.getMinutes() < 10) {
        minute = '0' + (date.getMinutes() + 1)
    }

    let day = date.getDate()
    if (date.getDate() < 10) {
        day = '0' + (date.getDate() + 1)
    }

    let month = date.getMonth()
    if (date.getMonth() < 10) {
        month = '0' + (date.getMonth() + 1)
    }

    return `${hour}:${minute} ${day}.${month}.${date.getFullYear()}`
}

function addTask(item) {
    if (item !== '') {
        const todoObject = {
            id: Date.now(),
            date: getDate(),
            text: item,
            isChecked: false
        };

        todoList.push(todoObject)
        addToLocalStorage(todoList)
        enterElement.value = ''
    }
}

function renderTodoList(todoList) {
    tasksElement.innerHTML = ''

    todoList.forEach(function(item) {
        const checked = item.isChecked ? 'checked': null

        const li = document.createElement('li')
        li.setAttribute('class', 'item')
        li.setAttribute('data-key', item.id)

        if (item.isChecked === true) {
            li.classList.add('checked')
        }

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            <p class="todo">${item.text}</p>
            <div class="delete_block">
                <button type="button" class="btn btn-primary">x</button>
                <time class="ms-auto text-muted me-3 text-nowrap">${getDate()}</time>
            </div>
    `
        tasksElement.append(li)
    })
}

function addToLocalStorage(todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList))
    renderTodoList(todoList)
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todoList')
    if (reference) {
        todoList = JSON.parse(reference)
        renderTodoList(todoList)
    }
}

function toggle(id) {
    todoList.forEach(function(item) {
        if (item.id == id) {
            item.isChecked = !item.isChecked
        }
    })
    addToLocalStorage(todoList)
}

function deleteTask(id) {
    todoList = todoList.filter(function(item) {
        return item.id != id
    })
    addToLocalStorage(todoList)
}

getFromLocalStorage()


tasksElement.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'))
    }

    if (event.target.classList.contains('btn-primary')) {
        deleteTask(event.target.parentElement.parentElement.getAttribute('data-key'))
    }
})