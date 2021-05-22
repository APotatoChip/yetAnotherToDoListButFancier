const inputField = document.querySelector('#todo-input');
const submitBtn = document.querySelector('#submit-btn');
const ul = document.querySelector('.todos');

submitBtn.addEventListener('click', addTodo);

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

    deleteBtn.addEventListener('click', deleteTodo);
    checkBtn.addEventListener('click', toggleCheckTodo);
}


function deleteTodo(e) {
    e.preventDefault();
    const item = e.target.parentElement;
    item.classList.add("fall");
    const animated = document.querySelector('.fall');

    animated.addEventListener('transitionend', () => {
        item.remove();
    });


}

function toggleCheckTodo(e) {

    const item = e.target.parentElement;
    item.classList.toggle('completed')


}