console.log('index.js')

let todos = [];
renderElement()

const btnAdd = document.getElementById('btn-add-task')
btnAdd.addEventListener('click', (event) => {

    event.preventDefault()

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value

    const warning = document.getElementById('warning')
    if (title.length < 4 || description.length < 10) {
        warning.style.visibility = 'visible'
    } else {

        warning.style.visibility = 'collapse'
        const dateTime = new Date()

        // date and time
        const dateAndTime = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()} - ${dateTime.getHours()}:${dateTime.getMinutes()}`

        const data = { title, description, dateAndTime }

        todos.unshift(data)

        window.localStorage.setItem('todos', JSON.stringify(todos))

        renderElement()

        document.getElementById('title').value = ''
        document.getElementById('description').value = ''

    }
})

document.getElementById('todos').addEventListener('click', (event) => {

    if (event.target.classList.contains('delete-btn')) {

        const index = event.target.getAttribute('data-index')

        todos.splice(index, 1)

        window.localStorage.setItem('todos', todos)

        const todoContainer = document.getElementById('todos')
        todoContainer.innerHTML = ''

        renderElement()
    }
})

function createCardElement(element, index) {
    const card = document.createElement('div')
    card.classList.add('card')

    card.innerHTML = `
        <div>
            <h3>${element.title}</h3>
        </div>
        <div class="mt-10">
            <p>${element.description}.</p>
        </div>
        <div class="btn-container">

        <div>
           <p>${element.dateAndTime}</p>
        </div>
        <div>
           <button class="btn delete-btn" data-index="${index}">Delete</button>
         </div>
         </div>
    `

    return card
}

function renderElement() {

    const todoContainer = document.getElementById('todos')
    todoContainer.innerHTML = ''

    const storedTodo = window.localStorage.getItem('todos')
    if (!storedTodo) {

        document.getElementById('todos').innerHTML = `
        <div> 
            <h2>Try to Add some task</h2>
        </div>`
    }

    todos.forEach((element, index) => {

        const card = createCardElement(element, index)

        todoContainer.appendChild(card)

    })

}