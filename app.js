const inputField = document.querySelector('#todo-input');
const submitBtn = document.querySelector('#submit-btn');
const ul = document.querySelector('.todos');
const select = document.querySelector('.selectOpts');

submitBtn.addEventListener('click', addTodo);
select.addEventListener('click', filterTodos);

window.addEventListener('load', getAllTodos);

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
    saveAllTodos(todoSave);

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

    let delTodo = item.childNodes[0].innerText;
    deleteTodos(delTodo);
}

function checkTodo(e) {
    const item = e.target.parentElement;
    item.classList.toggle('completed');
    allTodos = JSON.parse(localStorage.getItem('todos'));
    let todo = item.childNodes[0].innerText;

    if (item.classList.contains('completed') && !allTodos.completed.includes(todo)) {
        allTodos.completed.push(todo);
        if (allTodos.uncompleted.includes(todo)) {
            let idx = allTodos.uncompleted.indexOf(todo);
            allTodos.uncompleted.splice(idx, 1);
        }


    } else if (!allTodos.uncompleted.includes(todo)) {
        allTodos.uncompleted.push(todo);
        if (allTodos.completed.includes(todo)) {
            let idx = allTodos.completed.indexOf(todo);
            allTodos.completed.splice(idx, 1);
        }

    }
    localStorage.setItem('todos', JSON.stringify(allTodos));

}

function saveAllTodos(todo) {
    var allTodos;
    if (localStorage.getItem('todos') === null) {
        allTodos = {
            completed: [],
            uncompleted: []
        }

    } else {
        allTodos = JSON.parse(localStorage.getItem('todos'));
    }

    allTodos.uncompleted.push(todo);
    localStorage.setItem("todos", JSON.stringify(allTodos));
}



function deleteTodos(todo) {
    let todos;
    todos = JSON.parse(localStorage.getItem('todos'));
    if (todos.completed.includes(todo)) {
        let idx = todos.completed.indexOf(todo);
        todos.completed.splice(idx, 1);
    } else {
        let idx = todos.uncompleted.indexOf(todo);
        todos.uncompleted.splice(idx, 1);
    }

    localStorage.setItem('todos', JSON.stringify(todos));
}

function filterTodos(e) {
    let optVal = e.target.value;
    const arrLi = ul.childNodes;
    switch (optVal) {

        case "all":
            arrLi.forEach(el => {
                if (el.style.display === "none") {
                    el.style.display = "flex";
                }
            });
            break;
        case "completed":
            arrLi.forEach((el) => {
                if (el.classList.contains("completed")) {
                    el.style.display = "flex";
                } else {
                    el.style.display = "none";
                }
            });
            break;
        case "uncompleted":
            arrLi.forEach((el) => {
                if (!el.classList.contains("completed")) {
                    el.style.display = "flex";
                } else {
                    el.style.display = "none";
                }
            });
            break;
    }
}

function getAllTodos() {

    let todos = JSON.parse(localStorage.getItem('todos'));

    todos.completed.forEach(t => {
        const li = document.createElement('li');
        li.classList.add('todo');
        li.classList.add('completed');
        li.style.display = "flex";
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
    todos.uncompleted.forEach(t => {
        const li = document.createElement('li');
        li.classList.add('todo');
        li.style.display = "flex";
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