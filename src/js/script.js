let tasks = [];

// function card(task) {}
const card = (task) => {
    const cardContainer = document.createElement('div')
    cardContainer.classList.add('cardContainer', 'card')

    const checkDiv = document.createElement('div')
    checkDiv.classList.add('checkDiv')
    
    const btnCheck = document.createElement('button')
    btnCheck.classList.add('btnCheck')
    btnCheck.innerHTML = task.icon // '<i class="fas fa-check-circle"></i>'

    btnCheck.addEventListener("click", function() {
        if(btnCheck.innerHTML === '<i class="far fa-circle" aria-hidden="true"></i>') {
            btnCheck.innerHTML = '<i class="fas fa-check-circle"></i>'
            task.icon = '<i class="fas fa-check-circle"></i>'
        } else {
            btnCheck.innerHTML = '<i class="far fa-circle" ></i>'
            task.icon = '<i class="far fa-circle" ></i>'
        }
    })

    const h4 = document.createElement('h4')
    h4.innerText = task.name

    const btnDelete = document.createElement('button')
    btnDelete.innerText = 'x'
    btnDelete.classList.add('btnDelete', `btnDelete_${task.category}`)
    btnDelete.addEventListener("click", function() {
        console.log(tasks)
        const indice = tasks.indexOf(task)
        tasks.splice(indice, 1)
        renderTask(tasks)
        console.log(tasks)
    })

    checkDiv.append(btnCheck, h4)
    cardContainer.append(checkDiv, btnDelete)

    return cardContainer
}

//function createTaskObj() {}
const createTaskObj = () => {
    const button = document.querySelector('#add_task')
    button.addEventListener("click", function(evt) {
        evt.preventDefault()

        const nameTask = document.querySelector('input').value
        const category = document.querySelector('select').value

        if (nameTask != '' && category != 'Choose a category') {
            const task = {
                icon: '<i class="far fa-circle"></i>',
                name: nameTask,
                category: category,
            }

            tasks.push(task)
            renderTask(tasks)
            
        }
    })
}
createTaskObj()

//function renderTask(arr) {}
const renderTask = (arr) => {
    const tasksContainer = document.querySelectorAll(".task")
    tasksContainer.forEach(function(container) {
        container.innerHTML = ''
        arr.forEach(function(tarefa) {
            if(tarefa.category === container.id) {
                const cardTarefa = card(tarefa)
                container.appendChild(cardTarefa)
            }
        })
    })
    
}
