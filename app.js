// Получаем элементы
// Получаем корневой ul
const toDoList = document.querySelector('.todo-list')
// Получаем кнопку добавить Todo
const addToDoBtn = document.querySelector('.add-todo-button')
// Получаем скрытую форму создания Todo
const addForm = document.querySelector('.add-todo-form')
// Получаем кнопку создания ToDo
const addButtonForm = document.querySelector('.add-todo-form-button')
// Получаем кнопки фильтрации
const allTodo = document.getElementById('all')
const workTodo = document.getElementById('work')
const completeTodo = document.getElementById('complete')
workTodo.addEventListener('click', () => {
    workTodo.classList.add('btn-active')
    completeTodo.classList.remove('btn-active')
    allTodo.classList.remove('btn-active')
    console.log('workTodo');
    showWorkToDo()
})
completeTodo.addEventListener('click', () => {
    completeTodo.classList.add('btn-active')
    workTodo.classList.remove('btn-active')
    allTodo.classList.remove('btn-active')
    console.log('completeTodo');
    showCompleteToDo()
})
allTodo.addEventListener('click', () => {
    completeTodo.classList.remove('btn-active')
    workTodo.classList.remove('btn-active')
    allTodo.classList.add('btn-active')
    console.log('completeTodo');
    showAllTodo()
})

let totalToDo = 0
// addEventListener
// Показываем форму создания по клику на +
addToDoBtn.addEventListener('click', () => {
    addForm.classList.toggle("hidden")
    const closeBtn = document.querySelector('.close-button')
    // console.log(closeBtn);
    closeBtn.onclick = () => {
        addForm.classList.toggle("hidden")
    }
})
// Слушатель на создание Todo по клику в форме
addButtonForm.addEventListener('click', addTask)

// Функции
function addTask(e) {
    e.preventDefault()
    const inputTitle = document.querySelector('.inputName')
    const inputDescr = document.querySelector('.inputDescr')
    createToDoItem(inputTitle.value, inputDescr.value)
    // Очищаем форму создания и скрываем
    inputTitle.value = '';
    inputDescr.value = '';
    addForm.classList.toggle("hidden")
}
// создание ToDo
function createToDoItem(inputTitle, inputDescr) {
    // console.log(inputTitle, inputDescr);
    if (!inputTitle) return;

    const li = document.createElement('li')
    li.classList.add('todo-item')
    li.innerHTML = `<div class="todo-item-text">
        <h2 class="todo-item-title">${inputTitle}</h2>
        <h3 class="todo-item-descr">${inputDescr}</h3>
    </div>
    <div class="todo-item-remove">
        <span>X</span>
    </div>`
    toDoList.appendChild(li)

    // Увеличиваем и выводим количество
    totalToDo++
    total();
    // Добавляем слушатели на созданную ToDo
    // выполнено\невыполнено
    const toDoItems = document.querySelectorAll('.todo-item')
    toDoItems.forEach(el => el.onclick = (e) => {
        e.target.parentElement.parentElement.classList.toggle("todo-item-complete")
        total()
    })
    // удаление Todo
    const removeBtn = document.querySelectorAll('.todo-item-remove')
    removeBtn.forEach(el => el.addEventListener('click', (event) => {
        toDoList.removeChild(event.target.parentElement.parentElement)
        totalToDo--
        total();
    }))
}
function showWorkToDo() {
    document.querySelectorAll('.todo-item').forEach(el => el.classList.remove('hidden'))
    document.querySelectorAll('.todo-item-complete').forEach(el => el.classList.add('hidden'))
}
function showCompleteToDo() {
    document.querySelectorAll('.todo-item').forEach(el => el.classList.remove('hidden'))
    document.querySelectorAll('li:not(.todo-item-complete)').forEach(el => el.classList.add('hidden'))
}
function showAllTodo() {
    document.querySelectorAll('.todo-item').forEach(el => el.classList.remove('hidden'))
}
function total() {
    // футер с информацией о количестве
    const footer = document.querySelector('.app-footer')
    let toDoComplete = document.querySelectorAll('.todo-item-complete').length
    let toDoWork = totalToDo - toDoComplete
    footer.innerHTML = `Все задачи: ${totalToDo}<br>
        Активные: ${toDoWork}<br>
            Выполненные: ${toDoComplete}`
    // 2 в работе, 1 выполнено
}
