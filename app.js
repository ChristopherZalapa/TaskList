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
    // Remove Task Event
    taskList.addEventListener('click', removeTask);
    // Clear Task Event
    clearBtn.addEventListener('click', clearTasks);
    // Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);
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

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear Task
function clearTasks() {
    // taskList.innerHTML = '';

    // Faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
};

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