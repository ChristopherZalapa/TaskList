// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All Event Listeners
loadEventListeners();

// Load All Event Listeners
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);    
    // Add Task Event
    form.addEventListener('submit', addTask);
    // Remove Task Event
    taskList.addEventListener('click', removeTask);
    // Clear Task Event
    clearBtn.addEventListener('click', clearTasks);
    // Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks From Ls
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
    // Create li Element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create Text Node & Append
    li.appendChild(document.createTextNode(task));
    // Create New Link Element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append The Link To li
    li.appendChild(link);
    // Append li To the ul
    taskList.appendChild(li);
    })
}


// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add Task')
    }

    // Create li Element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create Text Node & Append
    li.appendChild(document.createTextNode(taskInput.value));
    // Create New Link Element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append The Link To li
    li.appendChild(link);
    // Append li To the ul
    taskList.appendChild(li);

    // Store In Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove From Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove From Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task
function clearTasks() {
    // taskList.innerHTML = '';

    // Faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear From Local Storage
    clearFromLocalStorage();
};

// Clear Tasks From Local Storage
function clearFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}