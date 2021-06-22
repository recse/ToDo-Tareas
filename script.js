const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        añadirTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    añadirTodo();
});

function añadirTodo(todo) {
    let todoTexto = input.value;

    if (todo) {
        todoTexto = todo.text;
    }

    if (todoTexto) {
        const todoEl = document.createElement("li");
        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todoTexto;

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");

            actualizar();
        });

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();

            actualizar();
        });

        todosUL.appendChild(todoEl);

        input.value = "";

        actualizar();
    }
}

function actualizar() {
    const todosEl = document.querySelectorAll("li");

    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}