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
    // Add Task Event
    form.addEventListener('submit', addTask);
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

    // Clear Input
    taskInput.value = '';

    e.preventDefault();
}