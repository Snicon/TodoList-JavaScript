const taskListEl = document.querySelector("#task-list");
const addTaskInputEl = document.querySelector("#input-task");

const addTask = (name, completed) => {
    if(name !== "") {
        const newState = [...JSON.parse(localStorage.getItem("tasks")) || [], {name, completed}];
        localStorage.setItem("tasks", JSON.stringify(newState));
        addTaskInputEl.value = "";
    }
    loadTasks();
}

const removeTask = (name) => {
    JSON.parse(localStorage.getItem("tasks")).forEach((task, index) => {
        if (task.name === name) {
            const newState = [...JSON.parse(localStorage.getItem("tasks")) || []];
            newState.splice(index, 1);
            console.log(newState)
            localStorage.setItem("tasks", JSON.stringify(newState));
        }
    });
    loadTasks();
}

const updateTaskStatus = (name, isCompleted) => {
    console.log("SIGH")
    JSON.parse(localStorage.getItem("tasks")).forEach((task, index) => {
        if (task.name === name) {
            const newState = [...JSON.parse(localStorage.getItem("tasks")) || []];
            newState[index].completed = isCompleted;
            console.log(newState[index])
            localStorage.setItem("tasks", JSON.stringify(newState));
        }
    });
    loadTasks();
}

const loadTasks = () => {
    const state = JSON.parse(localStorage.getItem("tasks")) || [];
    while (taskListEl.childElementCount > 0)
        taskListEl.removeChild(taskListEl.lastElementChild);
    if(state.length > 0)
        state.forEach(task => {
            const taskLiEl = document.createElement("li");
            taskLiEl.innerHTML = `<div class="task-group">
                                ${task.completed ? '<input class="checkbox" type="checkbox" checked>' : '<input class="checkbox" type="checkbox">'}
                                <span class="task">${task.name}</span>
                            </div><button class="delete-btn" onclick="removeTask('${task.name}')">x</button>`;
            taskListEl.appendChild(taskLiEl);
            taskLiEl.firstElementChild.firstElementChild.addEventListener("change", event => {
                event.currentTarget.checked ? updateTaskStatus(taskLiEl.firstElementChild.lastElementChild.textContent, true) : updateTaskStatus(taskLiEl.firstElementChild.lastElementChild.textContent, false) ;
            })
        });
}

loadTasks();
