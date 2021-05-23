const inputField = document.querySelector('#todo-input');
const submitBtn = document.querySelector('#submit-btn');
const ul = document.querySelector('.todos');
const select = document.querySelector('.selectOpts');

submitBtn.addEventListener('click', addTodo);
select.addEventListener('click', filterTodos);

function addTodo(e) {
    e.preventDefault();
    const li = document.createElement('li');
    li.classList.add('todo');
    const liP = document.createElement('p');
    liP.innerText = inputField.value;
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('check-btn');
    checkBtn.innerHTML = `<i class='fas fa-check'></i>`;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('trash-btn');
    deleteBtn.innerHTML = `<i class='fas fa-trash'></i>`;

    li.appendChild(liP);
    li.appendChild(checkBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
    inputField.value = "";

    let todoSave = li.childNodes[0].innerText;
    saveTodos(todoSave);

    deleteBtn.addEventListener('click', deleteTodo);
    checkBtn.addEventListener('click', checkTodo);
}


function deleteTodo(e) {
    e.preventDefault();
    const item = e.target.parentElement;
    item.classList.add("fall");
    const animated = document.querySelector('.fall');
    animated.addEventListener('transitionend', () => {
        item.remove();
    });
    console.log(item);
    let delTodo = item.childNodes[0].innerText;
    deleteTodos(delTodo);
}

function checkTodo(e) {
    const item = e.target.parentElement;
    item.classList.toggle('completed')

}

function saveTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodos(todo) {
    let todos;
    todos = JSON.parse(localStorage.getItem('todos'));
    let idx = todos.indexOf(todo);
    console.log(idx);
    todos.splice(idx, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function filterTodos(e) {
    let optVal = e.target.value;
    switch (optVal) {
        case "all":

            break;
        case "completed":
            // getCompletedTodos();
            break;
        case "uncompleted":
            // getUncompletedTodos();
            break;
        default:
            getAllTodos();

    }
}

function getAllTodos() {

    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(t => {
        const li = document.createElement('li');
        li.classList.add('todo');
        const liP = document.createElement('p');
        liP.innerText = t;
        const checkBtn = document.createElement('button');
        checkBtn.classList.add('check-btn');
        checkBtn.innerHTML = `<i class='fas fa-check'></i>`;
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('trash-btn');
        deleteBtn.innerHTML = `<i class='fas fa-trash'></i>`;

        li.appendChild(liP);
        li.appendChild(checkBtn);
        li.appendChild(deleteBtn);
        ul.appendChild(li);

        deleteBtn.addEventListener('click', deleteTodo);
        checkBtn.addEventListener('click', checkTodo);
    });

}