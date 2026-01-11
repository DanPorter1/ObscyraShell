function renderTodo() {
    setContent(`
        <section class="panel">
            <h1>To-Do List</h1>
            <p class="text-soft">Track tasks, mark progress, and stay organised.</p>

            <form id="to-do-form">
                <input id="to-do-input" type="text" placeholder="Add a task…">
                <button class="btn-small">Add</button>
            </form>

            <div class="filter-row">
                <label><input type="checkbox" id="filter-todo"> Hide completed</label>
                <label><input type="checkbox" id="filter-complete"> Show only completed</label>
                <label><input type="checkbox" id="filter-today"> Today only</label>
                <button id="btn-clear" class="btn-small">Clear filters</button>
            </div>

            <ul id="to-do-list"></ul>
        </section>
    `);

    initTodo();
}

let todoList = [];

function loadTodos() {
    const saved = localStorage.getItem("todos");
    todoList = saved ? JSON.parse(saved) : [];
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todoList));
}

function renderTodos() {
    const list = document.getElementById("to-do-list");
    list.innerHTML = "";

    const hideCompleted = document.getElementById("filter-todo").checked;
    const showCompleted = document.getElementById("filter-complete").checked;
    const todayOnly = document.getElementById("filter-today").checked;

    const today = new Date().toDateString();

    todoList.forEach((task, index) => {
        if (hideCompleted && task.completed) return;
        if (showCompleted && !task.completed) return;

        if (todayOnly) {
            const taskDate = task.timestamp.split(" ")[0]; 
            const todayDate = new Date().toLocaleDateString("en-GB");

            if (taskDate !== todayDate) return;
        }

        const li = document.createElement("li");
        li.className = "to-do" + (task.completed ? " completed" : "");

        // TODO Change Bin icon for del to-do
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
            <div class="to-do-text">
                <span class="task-title">${task.text}</span>
                <span class="task-time">${task.timestamp}</span>
            </div>
            <button class="to-do-delete-btn" data-delete="${index}">
                <svg viewBox="0 0 24 24">
                    <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12h-11L5 9zm5-5h4v2h-4V4z"/>
                </svg>
            </button>
        `;

        list.appendChild(li);
    });
}

function initTodo() {
    loadTodos();
    renderTodos();

    on("#to-do-form", "submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("to-do-input");
        const text = input.value.trim();
        if (!text) return;

        todoList.push({
            text,
            completed: false,
            timestamp: formatDateTime()
        });

        input.value = "";
        saveTodos();
        renderTodos();
    });

    document.getElementById("to-do-list").addEventListener("change", (e) => {
        if (e.target.type === "checkbox") {
            const index = e.target.dataset.index;
            todoList[index].completed = e.target.checked;
            saveTodos();
            renderTodos();
        }
    });

    document.getElementById("to-do-list").addEventListener("click", (e) => {
        if (e.target.closest("[data-delete]")) {
            const index = e.target.closest("[data-delete]").dataset.delete;
            todoList.splice(index, 1);
            saveTodos();
            renderTodos();
        }
    });

    on("#filter-todo", "change", renderTodos);
    on("#filter-complete", "change", renderTodos);
    on("#filter-today", "change", renderTodos);
    
    on("#btn-clear", "click", () => {
        document.getElementById("filter-todo").checked = false;
        document.getElementById("filter-complete").checked = false;
        document.getElementById("filter-today").checked = false;
        renderTodos();
    });
}